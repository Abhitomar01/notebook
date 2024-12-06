import React, { useContext, useEffect, useRef, useState } from 'react'
import notecontext from "../context/notes/noteContext"
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import {  useNavigate } from 'react-router-dom'
const Notes = (props) => {
  const context = useContext(notecontext);
  let navigate = useNavigate()
  const { notes, getNote, editNote } = context;
  useEffect(() => {
    console.log('Token:', localStorage.getItem('token'));

    if(localStorage.getItem('token')){
      getNote()
    }else{
navigate("/login")
    }
    
    // eslint-disable-next-line 
  }, [])
  const ref = useRef(null)
  const closeref = useRef(null)

  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  }


  const handelClick = (e) => {
    console.log("updating a note", note)
    editNote(note.id, note.etitle, note.edescription, note.etag)
    closeref.current.click();
    props.showAlert("edited succesfully")
  }

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onchange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onchange} minLength={5} required />
                </div>
                <div className='mb-3'>
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" vlaue={note.etag} onChange={onchange} />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={closeref} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button  disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handelClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="  row my-3">
          <h2>Your Notes</h2>
          <div className="container">
          {notes.length===0 && ' NO notes to display'}
          </div>
          {notes.map((notes) => {
            return <Noteitem key={notes._id} updateNote={updateNote} showAlert={props.showAlert} notes={notes} />
          })}
        </div>
      </div>
    </>
  )
}

export default Notes
