import React, { useContext, useState } from "react";
import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-renda`, income)
            .catch((err)=>{
                setError(err.response.data.message)
            })
            getIncomes()

    }
    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-renda`)
        setIncomes(response.data)
        console.log(response.data)

    }

    const deleteIncome = async (id) => {
        const res = await axios.delete(`${BASE_URL}delete-renda/${id}`)
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome += income.amount;

        })

        return totalIncome;
    }


    const addExpense = async (income) => {
        const response = await axios.post(`${BASE_URL}add-despesa`, income)
            .catch((err)=>{
                setError(err.response.data.message)
            })
            getExpense()

    }
    const getExpense = async () => {
        const response = await axios.get(`${BASE_URL}get-despesa`)
        setExpenses(response.data)
        console.log(response.data)

    }

    const deleteExpense = async (id) => {
        const res = await axios.delete(`${BASE_URL}delete-despesa/${id}`)
        getExpense()
    }

    const totalExpense = () => {
        let totalExpense = 0;
        expenses.forEach((expense) =>{
            totalExpense += expense.amount;

        })

        return totalExpense;
    }

    const totalBalance = () => {
        return totalIncome() - totalExpense()
    }
    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            totalIncome,
            expenses,
            addExpense,
            getExpense,
            deleteExpense,
            totalExpense,
            totalBalance,
            transactionHistory,
            error, 
            setError



        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}
