const query = require('../queries/authQueries');

module.exports={
    login:(req,res)=>{
        query.login(req,res);
    },
    register:(req,res)=>{
        query.register(res,res);
    }
}