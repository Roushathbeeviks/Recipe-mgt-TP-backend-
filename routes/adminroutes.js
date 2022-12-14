const express = require("express");
const { isValidObjectId, model } = require("mongoose");
const router = express.Router();
const Addrecipe = require("../models/addrecipe");
const RecipeImage = require("../models/image");
const ObjectId = require("mongoose").Types.ObjectId;
const multer = require("multer");
var fileExtension = require("file-extension");


//SETTING DESTINY FOR IMAGE UPLOADING
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    // console.log(file)
    callBack(null, "../website/src/assets/adminimages/");
  },
  filename: (req, file, callBack) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callBack(
      null,
      file.originalname.split(".")[0] +
        "-" +
        uniqueSuffix +
        `.${file.originalname.split(".")[1]}`
    );
  },
});


//GET API
router.get("/addrecipe", (req, res) => {
  Addrecipe.find((err, doc) => {
    if (err) {
      console.log("error occured", +err);
    } else {
      res.send(doc);
      // console.log(doc)
    }
  });
});




//RECIPE DELETE API
router.delete("/addrecipe/:id", (req, res) => {
  var id = req.params.id;
  // console.log(id);
  Addrecipe.deleteOne({ _id: id }, (err, doc) => {
    if (err) {
      console.log("error occured", +err);
      res.status(500).json({ errmsg: err });
    }
    res.status(200).json(doc);
  });
});


//RECIPE IMAGE UPLOAD POST
var upload = multer({ storage: storage });
router.post("/upload", upload.single("pic"), function (req, res, next) {
  let imagename = new RecipeImage({
    imagename: req.file.filename,
  });
  console.log(req.file.filename);
  imagename.save((err, result) => {
    if (err) {
      return res.status(400).send({ success: false, err });
    } else {
      return res.status(200).send({
        success: true,
        grade: result,
        msg: "File uploaded successfully",
      });
    }
  });

});

//GET BY ID
router.get("/addrecipe/:id", (req, res) =>
{
  Addrecipe.findById({_id: req.params.id}, (err, doc) =>
 {
   if (err) {
     console.log("error occured", +err);
   }
   else
   {
    // console.log(req.params.id)
    res.send(doc);
   }
  })
})


//RECIPE IMAGE UPLOAD GET API
router.get("/upload", (req, res) => 
{
  RecipeImage.find((err, doc) => {
    if (err) {
      console.log("error occured", +err);
    } else {
      res.send(doc);
      console.log(doc);
    }
  });
});


//ADD RECIPE-POST API
router.post("/addrecipe", async (req, res) => {
  let addrecipe = new Addrecipe({
    recipename: req.body.recipename,
    cookingtime: req.body.cookingtime,
    count: req.body.count,
    ingredients: req.body.ingredients,
    steps: req.body.steps,
    // image:req.body.imagepath
    // image:res.file
  });

  try {
    doc = await addrecipe.save();
    console.log("Added a recipe");
    return res.status(201).json(doc);
  } catch (err) {
    return res.status(501).json(err);
    
  }
  
});

router.put("/editrecipe/:id", (req, res, next) => {
  var id = req.params.id;
  Addrecipe.updateOne( { _id:id },
    {
      recipename: req.body.recipename,
      cookingtime: req.body.cookingtime,
      count: req.body.count,
      ingredients: req.body.ingredients,
      steps: req.body.steps,
    },
    function (err, doc) {
      if (err) 
      {
        console.log(err);
        res.status(500).json({ errmsg: err });
      }
       else
        {
        console.log(req.params.id);
        res.send(doc);
      }
    }
  );
})

router.post("/commented", async (req, res) => 
{ 
  let com = new Comments
  ({
    name: req.body.name,
    comment: req.body.comment
  })

  try
  {
    doc = await com.save();
    console.log(com);
    return res.status(201).json(doc);
  }
  catch (err)
   {
    return res.status(501).json(err);
   }

})

router.get("/commented", (req, res) =>
{
  Comments.find((err, doc) => {
    if (err) {
      console.log("Error occured in the routing",+ err);
    }
    else
    {
      res.send(doc);
      // console.log(doc)
    }
})
})





module.exports = router;
  // router.get("/addrecipe/:id", (req, res) => {
  //   var id = req.params._id;
  //   console.log("id");
    // Addrecipe.find((err,doc)=>
    // {
    //     if(err)
    //     {
    //         console.log("error occured", + err)
    //     }
    //     else
    //     {
    //         res.send(doc)
    //         // console.log(doc)
    //     }
    // })
  // });


// router.get("/editrecipe/:id", (req, res) => {
//   Addrecipe.updateOne({id:req.params._id},
//     {recipename:req.query.recipename,
//       cookingtime:req.query.cookingtime,
//       count:req.query.count,
//       ingredients: req.query.ingredients,
//       steps: req.query.steps
//     },function (err, doc) 
//     {
//       if (err)
//        {
//           console.log(err)
//           res.status(500).json({ errmsg: err })
//       }
//       else 
//       {
//           console.log("edited profile");
//           console.log(doc)
//           res.status(201).json(doc);
//       }
//     }

//     )
// });

