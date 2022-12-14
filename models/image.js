const mongoose=require('mongoose');
const RecipeImage=mongoose.model('recipeimage',
{
    imagename:{type:String}
})
module.exports=RecipeImage