import React from "react";
import Item from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

const ExpenseList = ({ expenses }) => {
    console.log(expenses);
    return (
    <>
       
        <ul className = "list">
        {expenses && expenses.map(expense => {

            return <Item key={expense.id} expense = {expense} />;    
        })}

        </ul>
        {expenses && expenses.length > 0 && <button className = "btn" >
            clear expenses
            <MdDelete className = "btn-icon" />
        </button> }
    </>
    );
};

export default  ExpenseList;