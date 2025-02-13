const authmodel = require('../model/authmodel')
const dontenv=require("dotenv").config();
const jwt=require('jsonwebtoken')
const db =require ('../config/database')


const authcontroller = {
    signup: (req, res) => {
        const { name, email, password, num } = req.body;
        authmodel.finduserbyemail(email,(err,user)=>{
            if(user.length>0)
                res.send("Existing")
            else{
                authmodel.insert(name, email, password, num, (err, user) => {
                    if (err)  res.send(err);
                     res.json({
                        "status": "success",
                        "message": "signup successfull",
                        "data": {
                            "id": user.id,
                            "name": user.name,
                            "email": user.email
                        }
                    })
                }
                )
            }
        })
     
    },
    login: (req, res) => {
        const {email,password}= req.body;
        db.query(
            'SELECT * FROM users where email=? and password=?',
            [email,password],(err,result)=>{
                if (err) res.send (err);
                if(result.length>0){
                    console.log(result)
                    const accessToken=jwt.sign({email},process.env.JWT_ACCESS,{expiresIn:'1h'})
                    const refreshToken=jwt.sign({email},process.env.JWT_REFRESH,{expiresIn:'30d'})
                    authmodel.add(refreshToken,email,(err,user)=>{
                        if(err) throw err;
                    })
                    res.cookie("resfreshtoken",refreshToken,{
                        httpOnly:true,
                        secure:true,
                        sameSite:"strict",
                        maxAge:7*24*60*60*1000
                    });
                    res.json({
                        "message":"Successfull login",
                        "name":result[0].name,
                        "number":result[0].number,
                        "Access Token":accessToken,
                        "Refresh Token":refreshToken
                    })
                }
                else{
                    res.send("Error");
                }
            }
        )
    },
    upload:(req,res) =>{
        if(!req.file){
            return res.send("No file uploaded")
        }
        const body={
            email: req.body.email,
            profile_image: req.file.filename
        };
        authmodel.upload(body,(err,result)=>{
            if(err){
                res.send("Error")
            }
            if(result.affectedRows===0){
                res.json("user not found")
            }
            return res.json({
                "message":"upoaded",
                "data":{
                    "email": body.email,
                    "profile_image": body.profile_image
                }
            })
        })
    }
}
module.exports = authcontroller;