const express = require('express');
const apiRouter = express.Router();
const minionsRouter = require('./minions.js')
const ideasRouter = require('./ideas');
const meetingsRoute = require('./meetings');

/*Router for all minions request*/
apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/meetings', meetingsRoute);







module.exports = apiRouter;
