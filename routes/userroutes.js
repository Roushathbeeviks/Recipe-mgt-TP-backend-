const express = require("express");
const { isValidObjectId, model } = require("mongoose");
const router = express.Router();
// const Recipe=require('./recipe')
const Addrecipe = require("../models/addrecipe");
const Register = require("../models/register");
const ObjectId = require("mongoose").Types.ObjectId;
const multer = require("multer"); 
const PATH = "./uploads";

//GET API-Register
router.get("/register", (req, res) => {
  let data = [];
  Register.find((err, doc) => {
    if (err) {
      console.log("error occured", +err);
    } else {
      res.json(doc);
    }
  });
});

//Post API-Register
router.post("/register", (req, res) => {
  // console.log(req.body)
  let reg = new Register({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  reg.save((err, doc) => {
    if (err) {
      console.log("Error occured in the routing", err);
    } else {
      res.send(doc);
      console.log("sended")
    }
  });
});



//POST API LOGIN
router.post("/login", (req, res, next) => {
  //    console.log(req.body)
  Register.findOne({ email: req.body.email }, function (err, data) {
    if (data) {
      if (data.password == req.body.password) {
        req.session.username = data.username;
        console.log(req.session.username);
        res.send({ Success: "Success!" });
      } else {
        console.log("password is different");
        res.send({ Success: "Wrong password" });
      }
    } else {
      console.log("invalid email");
      res.send({ Success: "This email is not registered" });
    }
  
  });
});



// router.get('/addrecipe',(req,res)=>
// {
//     Addrecipe.find((err,doc)=>
//     {
//         if(err)
//         {
//             console.log("error occured", + err)
//         }
//         else
//         {
//             res.send(doc)
//         }
//     })
// })

// router.post('/addrecipe',(req,res)=>
// {
//     let addrecipe= new Addrecipe(
//         {
//             recipename: req.body.recipename,
//             cookingtime: req.body.cookingtime,
//             // image:file.filename,
//             count:req.body.count,
//             ingredients:req.body.ingredients,
//             steps:req.body.steps
//         }
//     );
//     addrecipe.save((err,doc)=>
//     {
//         if(err)
//         {
//             console.log("Error occured in the routing",err)
//         }
//         else
//         {
//             res.send(doc);
//         }
//     })
// });

module.exports = router;
