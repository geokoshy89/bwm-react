const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const rentalSchema=new Schema({
  title: {type:String,required:true,maxlength:[128,'Invalid length! Maximum is 128 character']},
  city: {type:String,required:true,lowercase:true},
  street:{type:String,required:true,lowercase:true,minlength:[4,'Invalid length! Minimum is 4 character']},
  category: {type:String,required:true,lowercase:true},
  image:{type:String,required:true},
  numOfRooms: {type:Number,required:true},
  shared: Boolean,
  owner:{type:Schema.Types.ObjectId,ref:'User'},
  description: {type:String,required:true},
  dailyPrice: {type:Number,required:true},
  CreatedAt:{type:Date,default:Date.now},
});

rentalSchema.statics.sendError=function (res,config){
  const{status,detail}=config;
  return res
  .status(status)
  .send({errors:[{title:'Rental Error!',detail}]});
}
module.exports=mongoose.model('Rental',rentalSchema);