const User=require('../models/user');
const jwt=require('jsonwebtoken');
const config=require('../config/dev');
exports.login=(req,res)=>{
    const {email,password}=req.body;
    if(!password||!email){
        return res.status(422).send({errors:[{title:'Missing data',
        detail:'Email or Password is missing'}]});
    }
    User.findOne({email},(error,foundUser)=>{
        if(error){
            return res.mongoError(error);
        }

        if(!foundUser){
            return res.sendApiError(
                {title:'Invalid email',
                 detail:'User with provided email does not exist'});
        }

        if(foundUser.hasSamePassword(password)){
            const token=jwt.sign({
                sub:foundUser.id,
                username:foundUser.username
            },config.JWT_SECRET,{expiresIn:'2h'});
            return res.json({token});
        }else{
            return res.sendApiError(
                {title:'Invalid password',
                 detail:'Provided passsword is incorrect'});
        }

    });
}

exports.register=(req,res)=>{
    const {username,email,password,passwordConfirmation}=req.body;
    if(!password||!email){
        return res.sendApiError(
            {title:'Missing data',
             detail:'Email or Password is missing'});
    }
    if(password!==passwordConfirmation){
        return res.sendApiError(
            {title:'Mismatch in passwords',
             detail:'Password is not matching password confirmation'});
    }

    User.findOne({email},(error,existingUser)=>{
        if(error){
            return res.mongoError(error);
        }

        if(existingUser){
            return res.sendApiError(
                {title:'Invalid email',
                 detail:'User with provided email already exist'});
        }

        const user=new User({username,email,password});
        user.save((error)=>{
            if(error){
                return res.mongoError(error);
            }
            return res.json({status:'Registered'});
        });
    });

}

exports.onlyAuthUser=(req,res,next)=>{
    const token=req.headers.authorization;

    if(token){
       const decodedeToken=parseToken(token);
       if(!decodedeToken){return notAuthorized(res);}

       User.findById(decodedeToken.sub,(error,foundUser)=>{
        if(error){
            return res.mongoError(error);
        }

        if(foundUser){
            res.locals.user=foundUser;
            next();
        }else{
            return notAuthorized(res);
        }
       })
    }else{
        return notAuthorized(res);
    }
}

function parseToken(token){
    try{
        return jwt.verify(token.split(' ')[1],config.JWT_SECRET)||null;
    }catch(error){
        return null;
    }
}

function notAuthorized(res){
    return res.sendApiError(
        {title:'Not Authorized!',
         detail:'You need to login to get an access!'});
}

