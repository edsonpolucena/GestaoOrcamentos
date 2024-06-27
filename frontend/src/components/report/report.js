import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/layouts';
import { useGlobalContext } from '../../context/globalContext';
import IncomeItem from '../IncomeItem/IncomeItem';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';
import moment from 'moment';
import QRCode from 'qrcode';

// Utility function to generate keys
const generateKeyPair = async () => {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: 'RSASSA-PKCS1-v1_5',
      modulusLength: 2048,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      hash: 'SHA-256',
    },
    true,
    ['sign', 'verify']
  );
  return keyPair;
};

// Utility function to sign data
const signData = async (data, privateKey) => {
  const encoder = new TextEncoder();
  const dataArray = encoder.encode(data);
  const signature = await window.crypto.subtle.sign(
    {
      name: 'RSASSA-PKCS1-v1_5',
    },
    privateKey,
    dataArray
  );
  return signature;
};

// Utility function to export key
const exportKey = async (key) => {
  const exported = await window.crypto.subtle.exportKey(
    'spki', 
    key
  );
  const exportedAsString = String.fromCharCode.apply(null, new Uint8Array(exported));
  return btoa(exportedAsString);
};

function Report() {
  const { incomes, expenses, getIncomes, getExpense, totalIncome, totalExpense } = useGlobalContext();
  const reportRef = useRef();
  const [ip, setIp] = useState('');
  const [location, setLocation] = useState({});
  const [timestamp, setTimestamp] = useState('');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [keyPair, setKeyPair] = useState(null);
  const [publicKey, setPublicKey] = useState('');

  useEffect(() => {
    getIncomes();
    getExpense();
    getIpAndLocation();
    setTimestamp(moment().format('YYYY-MM-DD HH:mm:ss'));
    (async () => {
      const keys = await generateKeyPair();
      setKeyPair(keys);
      const exportedPublicKey = await exportKey(keys.publicKey);
      setPublicKey(exportedPublicKey);
    })();
  }, []);

  const getIpAndLocation = async () => {
    try {
      const response = await axios.get('https://ipapi.co/json/');
      setIp(response.data.ip);
      setLocation(response.data);
    } catch (error) {
      console.error('Error fetching IP and location:', error);
    }
  };

  const handleGeneratePDF = (e) => {
    if (!name || !cpf) {
      setShowForm(true);
    } else {
      generatePDF();
    }
  };

  const generatePDF = async () => {
    const input = reportRef.current;
    html2canvas(input).then(async (canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Add text details
      const yOffset = pdfHeight + 10;
      pdf.text(`Assinado digitalmente por: ${name}`, 10, yOffset);
      pdf.text(`CPF: ${cpf}`, 10, yOffset + 10);
      pdf.text(`Local: ${location.city}, ${location.region}, ${location.country_name}`, 10, yOffset + 20);
      pdf.text(`Horário: ${timestamp}`, 10, yOffset + 30);
      pdf.text(`IP: ${ip}`, 10, yOffset + 40);

      // Shorten and add the public key
      pdf.text(`Chave Pública:`, 10, yOffset + 50);
      pdf.text(`${publicKey.substring(0, 30)}...`, 10, yOffset + 55);

      // Generate QR Code and add to PDF
      const qrData = `Nome: ${name}, CPF: ${cpf}, Local: ${location.city}, ${location.region}, ${location.country_name}, Horário: ${timestamp}, IP: ${ip}`;
      QRCode.toDataURL(qrData, { errorCorrectionLevel: 'H', type: 'image/png' }, async (err, qrImageUrl) => {
        if (err) {
          console.error('Error generating QR code:', err);
        } else {
          // Sign the PDF content
          const signatureData = `${name}${cpf}${location.city}${location.region}${location.country_name}${timestamp}${ip}`;
          const signature = await signData(signatureData, keyPair.privateKey);
          pdf.text(`Assinatura: ${btoa(String.fromCharCode(...new Uint8Array(signature))).substring(0, 30)}...`, 10, yOffset + 65);
          
          // Adjust position to place the QR code to the right of the text
          pdf.addImage(qrImageUrl, 'PNG', pdfWidth - 60, yOffset, 50, 50);
          pdf.save('relatorio.pdf');
        }
      });
    });
  };

  return (
    <div>
      {showForm && (
        <FormStyled>
          <h1>Preencha suas informações</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowForm(false);
              generatePDF();
            }}
          >
            <label>
              Nome Completo:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
              CPF:
              <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
            </label>
            <button type="submit">Confirmar</button>
          </form>
        </FormStyled>
      )}
      {!showForm && (
        <ReportStyled>
          <InnerLayout ref={reportRef}>
            <h1>Transações</h1>
            <h2 className="total-income">Total Receita: <span>${`${totalIncome()}`}</span></h2>
            <h2 className="total-expense">Total Despesas: <span>${`${totalExpense()}`}</span></h2>

            <div className="content">
              <div className="incomes">
                <h3>Receitas</h3>
                {incomes.map((income) => {
                  const { _id, title, amount, date, category, description, type } = income;
                  return (
                    <IncomeItem
                      key={_id}
                      id={_id}
                      title={title}
                      description={description}
                      amount={amount}
                      date={date}
                      type={type}
                      category={category}
                      indicatorColor="var(--color-green)"
                    />
                  );
                })}
              </div>
              <div className="expenses">
                <h3>Despesas</h3>
                {expenses.map((expense) => {
                  const { _id, title, amount, date, category, description, type } = expense;
                  return (
                    <IncomeItem
                      key={_id}
                      id={_id}
                      title={title}
                      description={description}
                      amount={amount}
                      date={date}
                      type={type}
                      category={category}
                      indicatorColor="var(--color-red)"
                    />
                  );
                })}
              </div>
            </div>
            <button onClick={handleGeneratePDF}>Gerar PDF</button>
          </InnerLayout>
        </ReportStyled>
      )}
    </div>
  );
}

const FormStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    label {
      display: flex;
      flex-direction: column;
      font-size: 1.2rem;
      input {
        padding: 0.5rem;
        font-size: 1rem;
      }
    }
    button {
      padding: 1rem 2rem;
      font-size: 1.2rem;
      background-color: var(--color-primary);
      color: white;
      border: 2px solid transparent;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.3s ease;
      &:hover {
        border-color: var(--color-primary);
        background-color: white;
        color: var(--color-primary);
      }
    }
  }
`;
const ReportStyled = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;

  h2 {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: .5rem;
  }

  .total-income span {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--color-green);
  }

  .total-expense span {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--color-red);
  }

  .content {
    display: flex;
    gap: 2rem;

    .incomes,
    .expenses {
      flex: 1;
    }
  }

  button {
    margin-top: 2rem;
    padding: 1rem 2rem;
    font-size: 1.2rem;
    background-color: var(--color-primary);
    color: white;
    border: 2px solid transparent;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      border-color: var(--color-primary);
      background-color: white;
      color: var(--color-primary);
    }
  }
`;

export default Report;
