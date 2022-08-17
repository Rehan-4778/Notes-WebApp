import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertContext from '../Context/Alert/AlertContext';
import NoteContext from '../Context/Notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

function Note() {

    const navigate = useNavigate();

    const contextAlert = useContext(AlertContext);
    const {ShowAlert} = contextAlert;

    const context = useContext(NoteContext);
    // Destructure notes context
    const { state, getNotes, editNote } = context;


    // Create state for editing note
    const [note, setNote] = useState({ id: "", eTitle: "", eDescription: "", eTag: "" });
    // Create reference that 'll trigger modal
    const refModal = useRef(null);
    // Create reference that 'll close modal
    const refClose = useRef(null);


    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        
        }else{
            navigate('/login');
        }
        
    //eslint-disable-next-line
    },[]);

    const updateNote = (currentNote) => {
        refModal.current.click();

        setNote({
            eTitle: currentNote.title,
            eDescription: currentNote.description,
            eTag: currentNote.tag,
            id: currentNote._id
        });
    }

    const handleChange = (e) => {
        // ""...note" means that previous properties remains same and overwrite in chase of change
        setNote({...note, [e.target.name]: e.target.value});
    }
    
    const handleClick = () => {
        // Closing model
        refClose.current.click();

        // Show Alert
        ShowAlert("success","Note Updated successfully");

        editNote(note);
    }

    return (
        <>
            <AddNote />

            {/* Modal for Edit note */}

            {/* <!-- Button trigger modal --> */}
            <button style={{ display: 'none' }} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={refModal}>
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update a note</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {/* Modal Body starts */}

                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="eTitle" className="form-label"><strong>Title</strong> (min : 3 characters)</label>
                                    <input type="text" className="form-control" id="eTitle" name='eTitle' value={note.eTitle} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="eDescription" className="form-label"><strong>Description</strong> (min : 5 characters)</label>
                                    <input type="text" className="form-control" id="eDescription" name='eDescription' value={note.eDescription} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="eTag" className="form-label"><strong>Tag</strong></label>
                                    <input type="text" className="form-control" id="eTag" name='eTag' value={note.eTag} onChange={handleChange} />
                                </div>
                            </form>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                            <button disabled={note.eTitle.length<3 || note.eDescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Iterate the state array*/}
            <div className='container'>
                <h5 style={{display:'inline-block',padding:'2px 5px', backgroundColor:'black',color:'white'}}>Your Notes</h5>
                {state.length===0 && 'No note to display'}
                <div className='row'>
                    {state.map((note) => {
                        return <NoteItem key={note._id} note={note} updateNote={updateNote} />
                    })}
                </div>
            </div>
        </>


    )
}

export default Note
