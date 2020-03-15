var MongoClient = require("mongodb").MongoClient;
//const server = "mongodb://127.0.0.1:27017/"; // REPLACE WITH YOUR DB SERVER
const database = "EventList"; // REPLACE WITH YOUR DB NAME
const urlAtlas = `mongodb+srv://himadri:HelloMongo@learnatlas-5iwx3.mongodb.net/test?retryWrites=true&w=majority`;

var _db;

module.exports = {
    connectToServer:(callback)=> {
        MongoClient.connect(urlAtlas, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
            _db = client.db('Event');
            console.log("connected to db:")
            return callback(err);
             //return client;
        })
    },

    getDb: function () {
        // console.log("db:", _db);
        return _db;
    }
}
