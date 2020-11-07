const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const bcrypt=require('bcryptjs');

const userSchema=new Schema({
  username: {type:String,required:true,
                minlength:[4,'Invalid length! Minimum is 4 characters'],
                maxlength:[32,'Invalid length! Maximum is 32 character']},
  email: {type:String,
    minlength:[4,'Invalid length! Minimum is 4 characters'],
    maxlength:[32,'Invalid length! Maximum is 32 character'],
    unique:true,
    lowercase:true,
    required:true,
    match:[/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/]
  },
  password:{type:String,
    required:'Password is required',
    minlength:[4,'Invalid length! Minimum is 4 characters'],
    maxlength:[32,'Invalid length! Maximum is 32 character']}
});

userSchema.statics.sendError=function (res,config){
  const{status,detail}=config;
  return res
  .status(status)
  .send({errors:[{title:'Rental Error!',detail}]});
}
userSchema.methods.hasSamePassword=function(password){
  return bcrypt.compareSync(password,this.password);
};
userSchema.pre('save',function(next){
  const user=this;
  bcrypt.genSalt(10,(error,salt)=>{
    bcrypt.hash(user.password,salt,(err,hash)=>{
      user.password=hash;
      next();
    });
  });
});
module.exports=mongoose.model('User',userSchema);