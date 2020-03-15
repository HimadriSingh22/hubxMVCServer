const query = require("../queries/eventQueries");

module.exports={
    newEvent:(req,res)=>{
        query.addNewEvent(req,res);
    },

    fetchEventList:(req,res)=>{
        query.fetchEventList(req,res);
    }
}