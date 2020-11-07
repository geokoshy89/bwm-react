const express=require('express');
const bodyParser=require('body-parser');
const config=require('./config/dev')
const {provideErrorHandler, sendError}=require('./middleware');
//routes
const rentalRouter=require('./routes/rentals');
const usersRouter=require('./routes/users');
const {onlyAuthUser}=require('./controllers/users');
//models
require('./models/rental');
require('./models/user');

const { request } = require('express');
const app=express();
const mongoose=require('mongoose');

mongoose.connect(config.DB_URI,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useCreateIndex:true
},()=>{
  console.log('Connected to db');
});

app.use(bodyParser.json());
app.use(provideErrorHandler);
app.use(sendError);
app.get('/api/v1/secret',onlyAuthUser,(req,res)=>{
  return res.json({message:"Super secret mesages ,don't share!!!"});
});
app.use('/api/v1/rentals',rentalRouter);
app.use('/api/v1/users',usersRouter);

const PORT=process.env.PORT||3001;


app.listen(PORT,()=>{
  console.log("Server is listening on port:",PORT)
});
