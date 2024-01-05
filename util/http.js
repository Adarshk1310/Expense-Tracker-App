import axios from "axios";

const Backend_URL='https://react-native-project1-85062-default-rtdb.firebaseio.com'


export async function storeExpense(expenseData){
    const response = await axios.post(
        Backend_URL +'/expenses.json',
        expenseData
        );

       const id =  response.data.name;
       return id;
}


export async function fetchExpenses(){
    const response = await axios.get(Backend_URL +'/expenses.json');

    const expenses = [];
 
    for(const key in response.data){
        const expenseObj={
            id:key,
            amount:response.data[key].amount,
            date:new Date(response.data[key].date),
            description:response.data[key].description
        };
        expenses.push(expenseObj);
       
    }

    return expenses;
}


export function updateExpense(id,expenseData){
    return axios.put(Backend_URL + `/expenses/${id}.json`,expenseData);
}
export function deleteExpense(id){
    return axios.delete(Backend_URL + `/expenses/${id}.json`);
}
