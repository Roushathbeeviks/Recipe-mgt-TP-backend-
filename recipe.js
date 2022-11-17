const mongoose=require('mongoose')


const Recipe=  mongoose.model('Recipe',
{
    username:{type:String},
    // email:{type:String},
    // password:{type:Number},
    
})

// const signup=  mongoose.model('Signup',
// {
//     username:{type:String},
//     email:{type:String},
//     password:{type:Number},
    
// });

module.exports=Recipe;