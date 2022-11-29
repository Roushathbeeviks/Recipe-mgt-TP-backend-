

const express=require('express');
const { isValidObjectId, model } = require('mongoose');
const router=express.Router(); 
const Addrecipe=require('../models/addrecipe')
const ObjectId = require('mongoose').Types.ObjectId;
const multer  = require('multer')
var fileExtension = require('file-extension')



var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        console.log(file)
        callBack(null, "../website/src/assets/adminimages/")
    },
    filename: (req, file, callBack) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        callBack(null, file.originalname.split('.')[0] + '-' + uniqueSuffix + `.${file.originalname.split('.')[1]}`)
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
            // console.log(doc)
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
router.post('/upload', upload.single('pic'), function (req, res, next) {
    res.status(200).json({ message: 'File uploaded successfully' });
})



router.post('/addrecipe',async(req,res)=>
{

    let addrecipe= new Addrecipe(
        {
            recipename: req.body.recipename,
            count:req.body.count,
            ingredients:req.body.ingredients,
            steps:req.body.steps,
            // image:res.file.image
            // image:res.file
        }
     
       
       
    );
 
    try {
        doc = await addrecipe.save();
        console.log("Added a recipe");
        return res.status(201).json(doc);
    }
    catch (err) {
        return res.status(501).json(err);
    }
})

module.exports = router


