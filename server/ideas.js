const db = require("./db");
const router = require('express').Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

router.param('id', (req, res, next, id) => {
    const idea = db.getFromDatabaseById('ideas', id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send();
    }
})

/*get an array of all ideas*/
router.get('/', (req, res) => {
    res.send(db.getAllFromDatabase('ideas'));
});


/*Endpoint to create a new idea*/
router.post('/', checkMillionDollarIdea ,(req, res) => {
    const newIdea = db.addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);

});

/*get a single idea by id*/
router.get('/:id', (req, res, next) => {
    res.send(req.idea);
});

/*update a single idea by id*/
router.put('/:id', checkMillionDollarIdea ,(req, res) => {
    const updated = db.updateInstanceInDatabase('ideas', req.body );
    res.send(updated);
});


/*delete a single idea by id*/
router.delete('/:id', (req, res) => {
    db.deleteFromDatabasebyId('ideas', req.idea.id);
    res.send(204).send();
});


module.exports = router;