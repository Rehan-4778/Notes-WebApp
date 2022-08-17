import { React, useState } from 'react'
import NoteContext from '../Context/Notes/NoteContext'
import { useContext } from 'react'
import AlertContext from '../Context/Alert/AlertContext';

function AddNote() {
    const contextAlert = useContext(AlertContext);
    const {ShowAlert} = contextAlert;

    const context = useContext(NoteContext);
    // Destructuring 
    const { addNote } = context;

    // Uing a state to store notes data entered by user
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleChange = (e) => {
        // ""...note" means that previous properties remains same and overwrite in chase of change
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const handleClick = (e) => {
        e.preventDefault();
        // Show Alert
        ShowAlert("success","Note Added successfully");
        addNote(note.title, note.description, note.tag);
        // Reset the note after saving it...
        setNote({ title: "", description: "", tag: "" });
    }

    return (
        <div className='addBackground container my-5' style={{border: '2px solid #AFAFAF', borderRadius:'10px' , padding: '1rem 2rem'}}>
            <h3>Add a note</h3>
            <form onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' value={note.title} minLength={3} required onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' value={note.description} minLength={5} required onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
