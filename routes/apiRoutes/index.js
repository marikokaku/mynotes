const router = require('express').Router();
const fs = require('fs');
const { v4: uuid4 } = require('uuid');

router.get('/api/notes', (req, res) => {
    fs.readFile('../../db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            res.json(JSON.parse(data));
        }
    })
});

router.post('/api/notes', (req, res) => {
    console.log(`${req.method} request received to add a note`);
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid4(),
        };

        fs.readFile('../../db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const notes = JSON.parse(data);

                notes.push(newNote);

                fs.writeFile(
                    '../../db/db.json',
                    JSON.stringify(notes, null, 4),
                    (writeErr) =>
                        writeErr
                            ? console.error(writeErr)
                            : console.info('Successfully updated notes!')
                );
            }
        })

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.json(response);
    } else {
        res.json('Error in posting note');
    }
});

module.exports = router;

