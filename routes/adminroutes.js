
// const express=require('express');
// const { isValidObjectId, model } = require('mongoose');
// const router=express.Router(); 
// const Register=require('../models/register')
// const ObjectId = require('mongoose').Types.ObjectId;
// const multer  = require('multer');
// const { route } = require('./userroutes');


// const PATH = './uploads';
// let storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, PATH);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// });
// let upload = multer({
//   storage: storage
// });


// //get api
// router.get('/images', function (req, res) {
//     res.send('File catcher');
//   });


//   // POST File
//   router.post('/images/upload', upload.single('image'), function (req, res) {
//     if (!req.file) {
//       console.log("No file is available!");
//       return res.send({
//         success: false
//       });
//     } else {
//       console.log('File is available!');
//       return res.send({
//         success: true
//       })
//     }
//   });

// IMAGE UPLOADING


const express=require('express');
const { isValidObjectId, model } = require('mongoose');
const router=express.Router(); 
const Addrecipe=require('../models/addrecipe')
const ObjectId = require('mongoose').Types.ObjectId;
const multer  = require('multer')
var fileExtension = require('file-extension')



var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, "C:\Users\roushath.k\Desktop\RECIPE_MGT\website\src\assets\images")
    },
    filename: (req, file, callBack) => {
        callBack(null, `${getTime()}-${file.originalname}`)
    }
})




router.get('/addrecipe',(req,res)=>
{
    // const imagePath = 'http://localhost:3000/images/' + req.file.filename; // 
    Addrecipe.find((err,doc)=>
    {
        if(err)
        {
            console.log("error occured", + err)
        }
        else
        {
            res.send(doc)
        }
    })
})


router.delete('/addrecipe/:id',(req,res)=>
{
    var id=req.params.id
    console.log(id)
    Addrecipe.deleteOne({_id:id},(err,doc)=>
    {
        if(err)
          {
            console.log("error occured", + err)
            res.status(500).json({ errmsg: err })
            }
           res.status(200).json(doc)
    })
 })















var upload = multer({ storage: storage})
router.post('/addrecipe',upload.single('file'),(req,res)=>
{
   var file = res.File
    console.log(typeof file)
    let addrecipe= new Addrecipe(
        {
            recipename: req.body.recipename,
            cookingtime: req.body.cookingtime,
            count:req.body.count,
            ingredients:req.body.ingredients,
            steps:req.body.steps,
            // image:res.file.image
            image:res.file
        }
       
    );
    try {
        doc = addrecipe.save();
        console.log("Added a recipe");
        console.log(doc)
        return res.status(201).json(doc);
    }
    catch (err) {
        return res.status(501).json(err);
    }
})



//     addrecipe.save((err,doc)=> 
//     {
//         if(err)
//         {
//             console.log("Error occured in the routing",err)
//         }
//         else
//         {
//             // console.log(res.file.image)
//             res.send(doc);
//         }
//     })
// });

module.exports=router