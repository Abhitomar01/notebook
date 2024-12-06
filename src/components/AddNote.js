import React, { useContext, useState } from 'react'
import notecontext from "../context/notes/noteContext"
const AddNote = (props) => {

    const context = useContext(notecontext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handelClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
props.showAlert("Your note added succcessfully","success")
    }

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className="container my-3">
                <h1>Add a Note</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onchange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description"  rows="4" value={note.description} onChange={onchange} minLength={5} required />
                    </div>
                    <div className='mb-3'>
                    <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onchange} />
                    </div>
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handelClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote