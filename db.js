const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/recipees',
err=>
{
    if(!err)
    {
        console.log("DB connected Successfully")
    }
    else
    {
        console.log("Error in connection",err)
    }
})

module.exports=mongoose;