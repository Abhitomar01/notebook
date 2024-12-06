import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [
  ]



  const [notes, setnotes] = useState(notesInitial)
  //Add a note
  const getNote = async () => {
    //To do api call
    //api call

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'content-Type': "application/json",
        "auth-token": localStorage.getItem('token')
      },

    })
    const json = await response.json()
    //console.log(json)
    setnotes(json)
  }



  //Add a note
  const addNote = async (title, description, tag) => {
    //To do api call
    //api call

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'content-Type': "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    })
    const note = await response.json();
    setnotes(notes.concat(note))

  }

  //Delete a note
  const deleteNote = async(id) => {
    //to do api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'content-Type': "application/json",
        "auth-token": localStorage.getItem('token')
      },
    })
    const json = await response.json();
    console.log(json)

    console.log("deleting the node with id " + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setnotes(newNotes)
  }


  //Edit a note
  const editNote = async (id, title, description, tag) => {

    //Api calll
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'content-Type': "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    })
    const json = await response.json();
    console.log(json)
    let newNotes = JSON.parse(JSON.stringify(notes))
    //logic to edit note
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
    }
    setnotes(newNotes)
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>
      {props.children}
    </NoteContext.Provider>
  )

}

export default NoteState