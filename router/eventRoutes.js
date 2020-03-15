const eventController = require("../controller/eventController");

module.exports=(router)=>{
    router.route('/event').post(eventController.newEvent);
    router.route('/eventList').post(eventController.fetchEventList);
}