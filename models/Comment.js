const mongoose=require('mongoose');
const Comments=mongoose.model('comment',
{
    name:{type:String},
    comment:{type:String}
});
module.exports=Comments