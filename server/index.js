const express=require('express');
const bodyParser=require('body-parser');
const config=require('./config/dev')
//routes
const rentalRouter=require('./routes/rentals');

//models
const Rental=require('./models/rental');
const { request } = require('express');
const app=express();
const mongoose=require('mongoose');

mongoose.connect(config.DB_URI,{
  useNewUrlParser:true,
  useUnifiedTopology:true
},()=>{
  console.log('Connected to db');
});

app.use(bodyParser.json());
app.use('/api/v1/rentals',rentalRouter);
const PORT=process.env.PORT||3001;


app.listen(PORT,()=>{
  console.log("Server is listening on port:",PORT)
});
