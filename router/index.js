

const auth = require('./authRoutes');
const event = require('./eventRoutes');
module.exports = (router) => {

    auth(router);
    event(router);
    return router;
};