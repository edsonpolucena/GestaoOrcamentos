import React, {useState} from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import {plus} from '../../utils/icons';

function Form() {
    const {addIncome, getIncomes, error, setError} = useGlobalContext()
    const [inputState, setInputState] = useState({
        title:'',
        amount:'',
        date:'',
        category:'',
        description:'',

    })
    const {title, amount, date, category, description} = inputState;
    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
        setError('')
    }

    const handleSubmit = e => {
        e.preventDefault()
        addIncome(inputState)
        setInputState({
            title:'',
            amount:'',
            date:'',
            category:'',
            description:'',  
        })
    }
    return (
        <FormStyled onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            <div className="input-control">
                <input type="text"
                value={title}
                name={'title'}
                placeholder="Título Renda"
                onChange={handleInput('title')}/>
            </div>
            <div className="input-control">
                <input value={amount}
                type="text"
                name={'amount'}
                placeholder="Valor Renda"
                onChange={handleInput('amount')}/>
            </div>
            <div className="input-control">
                <DatePicker
                    id='date'
                    placeholderText='Inserir Data'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date)=>{
                        setInputState({...inputState, date: date})
                    }}
                />
            </div>
            <div className="input-control">
            </div>
            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                   <option value="" disable>Selecione Tipo</option>
                   <option value="salary" disable>Salário</option> 
                   <option value="freelancing" disable>Freelance</option> 
                   <option value="investments" disable>Investimento</option> 
                   <option value="stocks" disable>Ações</option> 
                   <option value="bitcoin" disable>Bitcoin</option> 
                   <option value="bank" disable>Transf Bancária</option> 
                   <option value="youtube" disable>Youtube</option> 
                   <option value="other" disable>Outros</option> 

                </select>
            </div>
            <div className="input-control">
                <textarea name="description" value={description} placeholder='Comentário' id="description" cols="30" rows="4" onChange={handleInput('description')}></textarea>
            </div>
            <div className="submit-btn">
                <Button
                    name={'Adicione'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent)'}
                    color={'#fff'}
                    hcolor={'red'}
                />
            </div>
        </FormStyled>
)
}

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    input, textarea, select{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            rgba(34, 34, 96, 0.4);
        }
       
    }
    .input-control{
        input{
            width: 100%;
        }
    }
    .selects{
        display: flex;
        justify-content: flex-end;
        select{
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
    }
    .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-green) !important;
            }
        }
    }

`;
export default Form