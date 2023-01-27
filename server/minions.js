const router = require('express').Router({mergeParams: true});
const db = require('./db.js');
const {getFromDatabaseById} = require("./db");

/*POST or PUT requests will send their new/updated resources in the request body*/

router.param('id', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send();
    }
})

router.param('workId', (req, res, next, workId) => {

})

/*Get all minions */
router.get('/', (req, res) => {
    res.send(db.getAllFromDatabase('minions'));
});

/*Endpoint to create a new minion*/
router.post('/', (req, res) => {
    const createdMinion = db.addToDatabase('minions', req.body);
    res.status(201).send(createdMinion);
});


/*get a single minion by id*/
router.get('/:id', (req, res, next) => {
    res.send(req.minion);
});


/*update a single minion by id*/
router.put('/:id', (req, res, next) => {
    const updated = db.updateInstanceInDatabase('minions', req.body);
    res.send(updated);

});


/*delete a single minion by id*/
router.delete('/:id', (req, res) => {
    db.deleteFromDatabasebyId('minions', req.minion.id);
    res.status(204).send();
});


const getMinionWorks = (req, res, next) => {
    const id = req.minion.id;
    const allWorks = db.getAllFromDatabase('work');
    req.works = allWorks.filter((work) => work.minionId === id);
    next();
}

const getMinionWorkById = (req, res, next) => {
    const work = db.getFromDatabaseById('work', req.params.workId);
    if (work) {
        req.work = work;
        next();
    } else {
        res.sendStatus(404);
    }
}

/*Work routes*/
router.get('/:id/work', getMinionWorks, (req, res, next) => {
    res.send(req.works);

})

router.delete('/:id/work/:workId', )


module.exports = router;