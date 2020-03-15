

const con = require('../connection');

module.exports={
    addNewEvent:(req,res)=>{
        con.getDb().collection('userProfile').findOneAndUpdate(
            {userName:req.body.userName},
            {$push:{
                EventList: {
                    ...req.body
                }
        }
    },{upsert:true}).then(result=>{
          res.send({status:"Event Successfully Created!"})
    }).catch(err=>{
        res.send({status:err});
    })
    },

    fetchEventList:(req,res)=>{
        con.getDb().collection('userProfile').findOne(
        
            {userName:req.body.userName}).then(user=>{
                console.log("WWWWWWWWWWWWWWwwwwww");
                if(user){
                    if(user.EventList){
                        res.send({eventList:user.EventList});
                    }
                    else{
                        res.send({status:"No Events!"});
                    }
                }
                else{
                    res.send({status:"User Not Found!"});
                }
            }).catch(err=>{
                res.send({status:err});
            })
    }
}