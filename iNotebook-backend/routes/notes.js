const express = require('express')
const router = express.Router()
const Note = require('../models/Note')
const fetchUser = require('../Middleware/fetchuser')
const { body, validationResult } = require('express-validator');

// Router 1: Fetch all notes using 'api/notes/fetchallnotes' Login Requird.
router.get('/fetchallnotes', fetchUser, async (req, res) => {

    try {
        const notes = await Note.find({ userId: req.id });
        res.json(notes);

    } catch (error) {
        res.status(500).send({ error });
    }
});

// Route2: Add a new note using "/api/notes/addnote". Require login.
router.post('/addnote', fetchUser, [
    // validations on data of note
    body('title', "Title is shorter").isLength({ min: 3 }),
    body('description', "Description is shorter").isLength({ min: 5 })
], async (req, res) => {

    // if there are errors in validation then return bad request or errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // destrucering req
    const { title, description, tag } = req.body;
    // wraping in try catch to avoid any server error
    try {

        // Creating new note
        let note = await Note.create({
            title: title,
            description: description,
            tag: tag,
            userId: req.id
        });
        // send response to client
        res.send(note);

    } catch (err) {
        console.error(err);
        res.status(500).send({ "message": err.message });
    }
});

// Route3: Update an existing note using "/api/notes/updatenote". Require login.
router.put('/updatenote/:id', fetchUser, [
    // only validate if tile is changed/exist
    body('title', "Updating title is shorter").if(body('title').exists()).isLength({ min: 3 }),
    // only validate if description is changed/exist
    body('description', "Updating description is shorter").if(body('description').exists()).isLength({ min: 5 })
], async (req, res) => {

    // if there are errors in validation then return bad request or errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // wraping in try catch to avoid any server error
    try {

        // destrucering req.body
        const { title, description, tag } = req.body;
        // crating new object
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        
        if (tag !== "" ){
            newNote.tag = tag
        }else{
            // In case of empty tag field
            newNote.tag = "General"
        }

        // Check note exists or note using note id  
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found");
        }

        // checking user is a owner of note or not
        if (note.userId !== req.id) {
           return res.status(401).send("Not Allowed");
        }

        // find note by id and update it
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        // send response to client
        res.send(updatedNote);

    } catch (err) {
        console.error(err);
        res.status(500).send({ "message": err.message });
    }
});

// Route 4: Delete an existing note using "/api/notes/deletenote". Require login.
router.delete('/deletenote/:id', fetchUser, async (req, res) => {

    try {
        // Check note exists or note using note id  
        const note = await Note.findById(req.params.id);
        if (!note) {
           return res.status(404).send("Note not found");
        }

        // only allows if user is owner of note
        if (note.userId !== req.id) {
           return res.status(401).send("Not Allowed");
        }

        // find note by id and update it
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        // send response to client
      res.json({"Note deleted with id ": deletedNote.id});

    } catch (err) {
        console.error(err);
        res.status(500).send({ "message": err.message });
    }
});


module.exports = router;