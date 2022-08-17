import NoteContext from "./NoteContext";

import React, { useState } from 'react'

function NoteState(props) {

  const host = "http://localhost:5000/api/notes";


  const [state, setState] = useState([]);

  const getNotes = async () => {
    // API call 
    const response = await fetch(`${host}/fetchallnotes`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });

    const jsonNote = await response.json();
    setState(jsonNote);

  }


  // Adding note in backend
  const addNote = async (title, description, tag) => {
    // API call 
    // eslint-disable-next-line
    const response = await fetch(`${host}/addnote`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
        
      },
      // in case of empty tag use default tag of  mongoose model
      body: JSON.stringify((tag !== "") ? { title, description, tag } : { title, description })
    });
    
    getNotes();
    
  }
  
  
  // Delete note
  const deleteNote = async (noteId) => {
    // API call
    // eslint-disable-next-line
    const response = await fetch(`${host}/deletenote/${noteId}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    getNotes();

  }


  // Edit note
  const editNote = async (eNote) => {
    //Destructuring
    const { eTitle, eDescription, eTag, id } = eNote;
    // API call
    // eslint-disable-next-line
    const response = await fetch(`${host}/updatenote/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')

      },
      body: JSON.stringify({ title: eTitle, description: eDescription, tag: eTag })
    });

    getNotes();

  }

  return (

    <NoteContext.Provider value={{ state, setState, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState

