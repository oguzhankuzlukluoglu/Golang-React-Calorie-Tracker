import React, {useState,useEffect} from 'react';
import axios from "axios";
import { Button,Form,Container,Modal }  from 'react-bootstrap';
import Entry from './single-entry.component';

const Entries = () => {
    const [entries,setEntries] = useState([])
    const [refreshData,setRefreshData] =useState(false)
    const [changeEntry,setChangeEntry]=useState({"change":false, "id":0})
    const [changeIngredient,setChangeIngredient]=useState({"change":false,"id":0})
    const [newIngredientName,setNewIngredientName]=useState("")
    const [AddNewEntry,setAddNewEntry]=useState(false)
    const [newEntry,setNewEntry]=useState({"dish":"","ingredients":"","calories":0,"fat":0})
    
    return(
        <div>
            <Container>
        <Button onClick = {() => setAddNewEntry(true)}>Track today's calories</Button>
            </Container>
            <Container>
            {entries !=null && entries.map((entry,i)=>(
                <Entry entryData={entry} deleteSingleEntry={deleteSingleEntry} setChangeIngredient={setChangeIngredient} setChangeEntry={setChangeEntry}/>
            ))}
            </Container>
        </div>
    );
}

function addSingleEntry(){
    setAddNewEntry(false)
    var url = "http://localhost:8000/entry/create"
    axios.post(url,{
        "ingredients": newEntry.ingredients,
        "dish":newEntry.dish,
        "calories":newEntry.calories,
        "fat":parseFloat(newEntry.fat)

    }).then(response=>{
        if(response.status==200){
            setRefreshData(true)
        }
    })
}
function deleteSingleEntry(id){
    var url = "http://localhost:8000/entry/delete" +id
    axios.delete(url,{

    }).then(response => {
        if (response.status==200){
            setRefreshData(true)
        }
    })
}