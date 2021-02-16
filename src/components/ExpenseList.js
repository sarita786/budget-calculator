import React from "react";
import Item from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

const ExpenseList = ({ expenses ,handleEdit, handleDelete,clearItems}) => {
    console.log(expenses);
    return (
    <>
       
        <ul className = "list">
        {expenses && expenses.map(expense => {

            return <Item 
            key={expense.id} 
            expense = {expense} 
            handleDelete ={handleDelete}
            handleEdit={handleEdit}
            
            />;    
        })}

        </ul>
        {expenses && expenses.length > 0 && <button className = "btn" onClick={clearItems}>
            clear expenses
            <MdDelete className = "btn-icon" />
        </button> }
    </>
    );
};

export default  ExpenseList;