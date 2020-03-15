const express = require('express');
const router = express.Router();
const con = require('../connection');
const uuid = require("uuid");
const jwt = require('jsonwebtoken');


module.exports={
    login:(req,res)=>{
       
        con.getDb().collection("userProfile")
            .findOne({userName:req.body.userName})
            .then(user => {
                // Check if user exists
                if (!user) {
                    return res.json({ status: "User not found" });
                    
                }
                
                /** If User exist then check for password is correct or not
                 * If password
                 * */
                const payload = { user: user.userName, id: user._id };
                const options = { expiresIn: '1d', issuer: 'himadri' };
                const secret = "ABCDEFGH";
                const refreshSecret = "IJKLMNOP";
                const token = jwt.sign(payload, secret, options);
           if (user.password === req.body.password) {
                    /** If Password is correct then check if user is active or not
                     * if user is active then send success login response
                     */

                   
                        let encoded =
                        {
                            user: user.userName,
                            id: user._id
                            
                        }

                        
                        const refreshToken = jwt.sign(payload, refreshSecret, options);


                        res.json({
                            success: true,
                            token: "Bearer " + token,
                            encoded,
                            new_csrf_token: refreshToken,
                            status:"Login Success"
                        });
                    
                    
                } else {
                    /**
                     * If user is Valid but password is incorrect
                     */
                    return res.json({ status: "Incorrect Password" });
                }
            }).catch(err => {
                console.log("error:", err);
                res.send({ status: "error occured", err })
            });
    },
    register:(req,res)=>{
        const newUser={
            userName:req.body.userName,
            password:req.body.password,
            auth_token: uuid.v4(),
        }
    
        
        con.getDb().collection('userProfile').findOne({userName:req.body.userName}).then(user=>{
            if(user){
                res.send({ status: "User Exists" });
            }
            else{
                con.getDb().collection('userProfile').insertOne(newUser,(err,result)=>{
                    if(err){
                       res.send({status:err});
                    }
                    else{
                     res.send({status:"Registered",token:"testt"});
                    }
                })
            }
        }).catch(err=>{
            console.log("eerrr",err);
        })
    }

   
}