// const e = require('express');
// const express=require('express');
// const { isValidObjectId, model } = require('mongoose');
// const router=express.Router(); 
// const Recipe=require('./recipe')
// const register=require('./register')
// const ObjectId = require('mongoose').Types.ObjectId;
// const multer  = require('multer')

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

// //GET API
// router.get('/register',(req,res)=>
// {
//     register.find((err,doc)=>
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

// //Post API
// router.post('/register',(req,res)=>
// {
//     console.log(req.body)
//     let rec=new register(
//         {
            
//             username:req.body.username,
//             email:req.body.email,
//             password:req.body.password
           
//         }
//     );
//     console.log(rec)
//     rec.save((err,doc)=>
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


// router.post('/images', upload.single('image'), function (req, res) {
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
  

    

// //GET SINGLE EMPLOYEE-ID
// router.get('/:id',(req,res)=>
// {
//     if(ObjectId.isValid(req.params.id))
//     {
        
//         Recipe.findById(req.params.id,(err,doc)=>
//         {
//             if(err)
//             {
//                 console.log("Error occured",+err)
//             }
//             else
//             {
//                 res.send(doc)
//             }
//         })
//     }
//     else
//     {
//         return res.status(404).send(`No record found with ID ${req.params.id}`)
//     }
// })

// //DELETE BY ID
// router.delete('/:id',(req,res)=>
// {
//     if(ObjectId.isValid(req.params.id))
//     {
//         Recipe.findByIdAndDelete(req.params.id,(err,doc)=>
//         {
//             if(err)
//             {
//                 console.log("Error occuredin deletion",+ err)
//             }
//             else
//             {
//                 res.send(doc)
//             }
//         })
//     }
//     else
//     {
//         return res.status(400).send(`No record found with ID ${req.params.id}`)
//     }
// })

// //UPDATE

// router.put('/:id',(req,res)=>
// {
//     if(ObjectId.isValid(req.params.id))
//     {
        
//     let rec=
//      {
//             Recipename:req.body.Recipename,
            
//     }
    

//         Recipe.findByIdAndUpdate(req.params.id,{$set:rec},(err,doc)=>
//         {
//             if(err)
//             {   
//                 console.log("Error occured in updating ",+ err)
//             }
//             else
//             {
//                 res.send(doc)
//            }
//         })
        
//     }
//     else
//     {
//         return res.status(400).send(`No record found with ID ${req.params.id}`)
//     }
    
        

// })

// // router.post("/experiment/resultML/downloadReport",downloadReport);

// // const downloadReport = function(req, res) {
// //   res.sendFile(req.body.filename);
// // };

// module.exports=router;