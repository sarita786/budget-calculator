import React,{useState, useEffect} from "react";
import "./App.css";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import { v4 as uuidv4 } from 'uuid';

// const initialExpenses = [
//  { id: uuidv4(), charge : "rent", amount : 1600 },
//   { id: uuidv4(), charge : "car payment", amount : 600 },
//   { id: uuidv4(), charge : "credit card bill", amount : 1000 }
// ];

const initialExpenses = localStorage.getItem("expenses")
? JSON.parse(localStorage.getItem("expenses")): [];




function App() {
  //state values
  //all expenses,add expenses
  
  const [expenses,setExpenses] = useState(initialExpenses);
  //single expense
  const [charge,setCharge]= useState("");

  //single amount
  const[amount,setAmount] = useState("");

  //alert
  const [alert,setAlert] = useState({show:false})

  //edit
  const [edit,setEdit]= useState(false);

  //edit item
  const [id,setId] = useState(0);

  //use Effect

  useEffect(() => {
    console.log("we called useEffect");
    localStorage.setItem("expenses", JSON.stringify(expenses)
    );

  },[expenses]);

//functionality 

//handle charge
  const handleCharge = e => {
   // console.log(`charge : ${e.target.value}`);

    setCharge(e.target.value);
  };

  //handle amount
  const handleAmount = e => {
    //console.log(`amount : ${e.target.value}`);
    setAmount(e.target.value);
  };

  //handle alert
const handleAlert = ({type, text})=>{
  setAlert({show:true,type,text});
  setTimeout(()=>{

    setAlert({shoe:false});
  },3000);
};

  //handle submit
  const handleSubmit = e => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
  if (edit){
    let tempExpenses = expenses.map(item => {
      return item.id === id? {...item,charge,amount}: item;
    });
    setExpenses(tempExpenses);
    setEdit(false);
    handleAlert({type: "success", text: "item edited"})
  }
else{
  const singleExpense = {id : uuidv4(), charge, amount };
      setExpenses([...expenses, singleExpense]);
      handleAlert({type:'success',text: "item added"});
}
      
      setCharge("");
      setAmount("");

    } else {
      //handle alert called
      handleAlert({
        type: 'danger', 
        text:`charge can't be empty hast to be bigger than zero`});
    };
  };
//clear all item

const clearItems = () => {
  setExpenses([]);
  handleAlert({ type: "danger",text: "Item deleted"});
};
//handle delete

 const handleDelete = (id) => {
  let temExpenses = expenses.filter(item =>item.id !== id);
  setExpenses(temExpenses);
  handleAlert({ type: "danger",text: "Item deleted"});

 };

 //handle Edit

 const handleEdit = (id) => {
   let expense = expenses.find(item => item.id=== id);
   let {charge,amount} = expense;
   setCharge(charge);
   setAmount(amount);
   setEdit(true);
   setId(id);
 };
  
  return (
   <div>
      {alert.show && < Alert type={alert.type} text={alert.text} />}
     <Alert />
     <h1>budget calculator</h1>
     <main className = "App">
       <ExpenseForm 
       charge={charge} 
       amount ={amount} 
       handleAmount = {handleAmount} 
       handleCharge={handleCharge} 
       handleSubmit= {handleSubmit} 
       edit ={edit}
       />  

       <ExpenseList  
       expenses = {expenses} 
       handleDelete={handleDelete}
       handleEdit = {handleEdit}
       clearItems = {clearItems}
        /> 


     </main>
     <h1>
  total spending : {" "} 
  <span className = "total"> 
  $ 
  {expenses.reduce((acc,curr) => { 
      return (acc+= parseInt(curr.amount));
  },0)}
  
  </span>
     </h1>
     
   </div>
  );
}

export default App;
