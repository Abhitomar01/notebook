const express = require('express')
const router = express.Router();
const Notes = require('../models/Notes')
var fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');

//ROUTE1:Get All Notes using GET "/api/notes/getuser"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {


        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error);
        res.status(500).send('some error occured')
    }
})


//ROUTE2: Add a new Note using POST "/api/notes/addnote"
router.post('/addnote', fetchuser, [
    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast five charecter').isLength({ min: 5 })


], async (req, res) => {
    try {


        const { title, description, tag } = req.body;
        //if there is an error you will get this error
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })

        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savenote = await note.save()
        res.json(savenote)
    } catch (error) {
        console.error(error);
        res.status(500).send('some error occured')
    }
})
//ROUTE3: Update an Existing  Note using PUT "/api/notes/updatenote"
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {


        //create a newnote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        //Find the note to be a updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found")

        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('some error occured')
    }

})


//ROUTE4: delete an Existing  Note using DELETE "/api/notes/deletenote"
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //Find the note to be a deleted and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found")

        }
        //allow delete opration if user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "sucess": "Note has been deleted", note: note });

    } catch (error) {
        console.error(error);
        res.status(500).send('some error occured')
    }
})


module.exports = router;