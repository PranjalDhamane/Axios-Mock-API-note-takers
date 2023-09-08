import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GetNote() {
    const [userNote,setUserNote] = useState([]);

    useEffect(() =>{
        axios.get('https://64facf36cb9c00518f7a35f4.mockapi.io/notes')
        .then((response)=>{
            console.log(response)
            setUserNote(response.data)
        })
    },[])

    return ( 
        <div>
            <h1>Welcome to Note-Taker</h1>
            {userNote.map((data)=>{
                return(
                    <div>
                        {data.id}
                        {data.title}
                        {data.note}
                        {data.date}
                        <hr></hr>
                    </div>
                )
            })}
        </div>
     );
}

export default GetNote;
