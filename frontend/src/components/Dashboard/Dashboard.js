
import React, { useEffect } from 'react';
import styled from 'styled-components';
import {InnerLayout} from '../../styles/layouts';
import Chart from '../Chart/Chart';
import { useGlobalContext } from '../../context/globalContext';
import {dollar} from '../../utils/icons'
import History from '../../History/history';


function Dashboard() {
 const {totalExpense,incomes, expenses, totalIncome, totalBalance, getIncomes, getExpense} = useGlobalContext()
 useEffect(() =>{
  getIncomes()
  getExpense()

 }, [])
  return (
    <DashboardStyled>
      <InnerLayout>
        <h1>Todas as Transações</h1>
        <div className="stats-con">
          <div className='chart-con'>
            <Chart/>
            <div className="amount-con">
              <div className='income'>
                <h2>Total de Receitas</h2>
                <p>
                  {dollar} {totalIncome()}
                  </p>
              </div>
              <div className='expense'>
              <h2>Total de Despesas</h2>
                <p>
                  {dollar} {totalExpense()}
                </p>
              </div>
              <div className='balance'>
              <h2>Total do Balanço</h2>
                <p>
                  {dollar} {totalBalance()}
                </p>
              </div>
            </div>
          </div>
          <div className="history-con">
                <History/>
                <h2 className="salary-title">Min <span>Receita</span>Max</h2>
                <div className="salary-item">
                  <p>
                    {Math.min(...incomes.map(item =>item.amount))}
                  </p>
                  <p>
                    {Math.max(...incomes.map(item =>item.amount))}
                  </p>
                </div>
                <h2 className="salary-title">Min <span>Despesa</span>Max</h2>
                <div className="salary-item">
                  <p>
                    {Math.min(...expenses.map(item =>item.amount))}
                  </p>
                  <p>
                    {Math.max(...expenses.map(item =>item.amount))}
                  </p>
                </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
    .stats-con{
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 2rem;
      .chart-con{
        grid-column: 1 / 4;
        height: 400px;
        .amount-con{
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin-top: 2rem;
          .income, .expense . balance{
            grid-column: span2;
          }
          .income, .expense, .balance{
            background: #fcf6f9;
            border: 2px solid #ffffff;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            border-radius: 20px;
            padding: 1rem;
            p{
              font-size: 2rem;
              font-weight: 700;
            }
          }
          .balance{
            grid-column: 1 / 4;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            p{
              color: var(--color-green);
              opacity: 0.6;
              font-size: 3rem;
            }
          }
        }
      }
      .history-con{
        grid-column: 4 / -1;
        h2{
            margin: 1rem 0;
            font-size: 2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;

        }
        .salary-title{
          font-size: 1.2rem;
          span{
            font-size: 1.8rem;
          }

        }
        .salary-item{
          background: #fcf6f9;
          border: 2px solid #ffffff;
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          p{
            font-weight: 600;
            font-size: 1.6rem;
          }

        }
        

      }
    }
`;

export default Dashboard;
