const db = require("./db");
const router = require('express').Router();


/*Get an array of all meetings*/
router.get('/', (req, res) => {
    res.send(db.getAllFromDatabase('meetings'));
});

router.post('/', (req, res) => {
    const newMeeting = db.createMeeting();
    db.addToDatabase('meetings', newMeeting);
    res.status(201).send(newMeeting);
});

router.delete('/', (req, res) => {
    db.deleteAllFromDatabase('meetings');
    res.send(204);
});




module.exports = router;