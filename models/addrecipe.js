const mongoose=require('mongoose');
const Addrecipe=mongoose.model('addrecipe',
{
    recipename:{type:String},
    cookingtime:{type:Number},
    count:{type:Number},
    ingredients:{type:String},
    steps:{type:String},
    imagePath:{type:String}
})
module.exports=Addrecipe