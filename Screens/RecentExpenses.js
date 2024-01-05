
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses(){

  
    const expenseCtx = useContext(ExpensesContext);
    const [loading,setLoading] =useState(true);
    const [error,setError] =useState();

    
    useEffect(()=>{
        async function getExpenses(){
            try {
                const expenses = await fetchExpenses();
                expenseCtx.setExpenses(expenses);
                
            } catch (error) {
                setError('Could not fetch expenses')
            }
            setLoading(false);
        }

        getExpenses();
    },[])



    if(error && !loading){
        return <ErrorOverlay message={error} />
    }

    if(loading){
        return <LoadingOverlay />
    }

    const recentExpenses = expenseCtx.expenses.filter((expense)=>{
        const today=new Date();
        const dateWeekAgo =getDateMinusDays(today,7);
        return (expense.date>dateWeekAgo) && (expense.date<=today);
    })









return <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" fallbackText='NO EXPENSES REGISTERED FOR THE LAST 7 DAYS' />
}

export default RecentExpenses;