import React, {useContext}from 'react'
import notecontext from "../context/notes/noteContext"
const Noteitem = (props) => {
    const context = useContext(notecontext);
   const {deleteNote} = context;
    const { notes ,updateNote } = props;
    return (
        <div className='col-md-3'>

            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title"> {notes.title}</h5>

                        <i className="fa-regular fa-trash-can mx-3" onClick={()=>{deleteNote(notes._id);props.showAlert("Deleted succesfully")}}></i>
                        <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>{updateNote(notes)}}></i>
                    </div>
                    <p className="card-text">{notes.description} </p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem