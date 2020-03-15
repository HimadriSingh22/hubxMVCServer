const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');
const con = require("./connection");
const port = 8080;
const app = express();
//const Signup = require("./router/signUp");
//const Login=require("./router/login");
//const Event = require("./router/newEvent");
const router = express.Router();
const routes = require("./router/index");

const passport = require("passport");
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
//const dbName="abcd";
app.use(bodyParser.json({limit:'50mb'}));
con.connectToServer(err=>{
    //console.log("err:",err);
    app.use(passport.initialize());
    require("./passport")(passport);
    // app.use('/signUp',Signup);
    // app.use('/login',Login);
    // app.use('/event',Event);

   app.use('/api',routes(router)) ;
})

//routes









//listen to server
app.listen(`${port}`, () => {
    console.log(`Server now listening at Port:${port}`);
});

module.exports = app;