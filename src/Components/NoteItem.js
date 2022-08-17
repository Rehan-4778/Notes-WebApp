import { React, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import NoteContext from '../Context/Notes/NoteContext';
import AlertContext from '../Context/Alert/AlertContext';


function NoteItem(props) {

    const contextAlert = useContext(AlertContext);
    const {ShowAlert} = contextAlert;

    // eslint-disable-next-line
    const { note, updateNote } = props;


    const context = useContext(NoteContext);
    // Destructuring
    const { deleteNote } = context;

    return (
        <div className='col-md-3 my-3'>
            <div className="card">
                <div className="card-body">
                    <span className='mx-2 pointer trash-color float-end'> <FontAwesomeIcon icon={faTrash} onClick={() => { deleteNote(note._id); ShowAlert("success","Note Deleted successfully"); }} /> </span>
                    <span className='mx-2 pointer edit-color float-end'> <FontAwesomeIcon icon={faEdit} onClick={() => { props.updateNote(note)  }} /> </span>
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>


                </div>
            </div>
        </div>
    )
}

export default NoteItem;
