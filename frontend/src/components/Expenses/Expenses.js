import React, { useEffect } from 'react'
import styled from 'styled-components'
import {InnerLayout} from '../../styles/layouts';
import { useGlobalContext } from '../../context/globalContext';
import ExpenseForm from './ExpenseForm';
import IncomeItem from '../IncomeItem/IncomeItem';

function Expenses() {
  const {expenses, getExpense, deleteExpense, totalExpense} = useGlobalContext()

  useEffect(() =>{
    getExpense()

  }, [getExpense])
  return (
    <ExpenseStyled>
        <InnerLayout>
        <h1>Despesas</h1>
        <h2 className="total-income">Total Despesas: <span>${`${totalExpense()}`}</span> </h2>

        <div className="income-content">
          <div className="form-container">
            <ExpenseForm/>
          </div>
          <div className="incomes">
            {expenses.map((income)=>{
              const {_id, title, amount, date, category, description, type} = income;
              return <IncomeItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount} 
                  date={date}
                  type={type}
                  category={category}
                  indicatorColor="var(--color-red)"
                  deleteItem={deleteExpense}
              
              />
            })}

          </div>
        </div>
        </InnerLayout>
    </ExpenseStyled>
  );
}

const ExpenseStyled = styled.div`
  display: flex;
  overflow: auto;
  .total-income{
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
    span{
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-red);
    }

  }
  .income-content{
    display: flex;
    gap: 1rem;
    .incomes{
      flex: 1;
    }
  }
`;



export default Expenses;