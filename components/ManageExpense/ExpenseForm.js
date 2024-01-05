import { View,StyleSheet,Text,Alert} from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({onCancel,onSubmit,submitButtonLabel,defaultValues}){


    const [inputs,setInputs]= useState({
        amount : {value:defaultValues?defaultValues.amount.toString():'',
                    isValid:true},
        date : {value:defaultValues?getFormattedDate(defaultValues.date):'',
                    isValid:true},
        description : {value:defaultValues?defaultValues.description:'',
                        isValid:true}
    });

    function inputChangedHandler(inputIdentifier,enteredValue){

        setInputs((prev)=>{
            return {
                ...prev,
                [inputIdentifier]:{value:enteredValue,isValid:true}
            }
        })
    }

    function submitHandler(){



        const expenseData = {
            amount:+inputs.amount.value,
            date:new Date(inputs.date.value),
            description:inputs.description.value
        };

        const amountisValid= !isNaN(expenseData.amount) && expenseData.amount>0
        const dateIsValid = expenseData.date.toString()!=='Invalid Date';
        const descriptionIsValid =expenseData.description.trim().length>0;
        
        if(!amountisValid || !dateIsValid || !descriptionIsValid){
            setInputs((prev)=>{
                return {
                    amount:{value:prev.amount.value,isValid:amountisValid},
                    date:{value:prev.date.value,isValid:dateIsValid},
                    description:{value:prev.description.value,isValid:descriptionIsValid},

                    
                }
            })
            return;
        }
        onSubmit(expenseData);
        
    }

    const formIsValid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid




    return <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputRow}>
        <Input label="Amount" invalid={!inputs.amount.isValid}  style={styles.rowInput} textInputConfig={{
            keyboardType:'decimal-pad',
            onChangeText:inputChangedHandler.bind(this,'amount'),
            value:inputs.amount.value

        }}/>
        <Input label="Date" invalid={!inputs.date.isValid}  style={styles.rowInput} textInputConfig={{
            placeholder:'YYYY-MM-DD',
            maxLength:10,
            onChangeText:inputChangedHandler.bind(this,'date'),
            value:inputs.date.value
        }} />
        </View>
        <Input label="Description" invalid={!inputs.description.isValid}  textInputConfig={{
            multiLine:true,
            onChangeText:inputChangedHandler.bind(this,'description'),
            value:inputs.description.value
        }} />

    {formIsValid  && <Text style={styles.errorText}>Invalid values-please check your entered data</Text>}
    <View style={styles.buttonsContainer}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
        <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>

    </View>

    </View>

}


export default ExpenseForm;


const styles =StyleSheet.create({
    form:{
        margin:2
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
        color:'white',
        marginVertical:24,
        textAlign:'center'
    },
    inputRow:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    rowInput:{
        flex:1
    },
    buttonsContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        minWidth:120,
        marginHorizontal:8
    },
    errorText:{
        textAlign:'center',
        color:GlobalStyles.colors.error500,
        margin:8
    }
})