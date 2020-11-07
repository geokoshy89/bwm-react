const Rental=require('../models/rental');

exports.getRentals=(req,res)=>{
  Rental.find({},(error,foundRentals)=>{
    if(error){
      return res.mongoError(error);
    }
    return res.json(foundRentals);
  });
};

exports.getRentalById=(req,res)=>{
  debugger;
  const {rentalId}=req.params;
  Rental.findById(rentalId,(error,foundRental)=>{
    if(error){
      return res.mongoError(error);
    }
    return res.json(foundRental);
  });

};
exports.createRental=(req,res)=>{
  const rentalData=req.body;

  Rental.create(rentalData,(error,createdRental)=>{
    if(error){
      return res.mongoError(error);
    }
    return res.json({message:`Rental with id ${createdRental._id} was added!`});
  });
};

// exports.deleteRental=(req,res)=>{
//   const {rentalId}=req.params
//   const rentalIndex=rentals.findIndex(r=>r._id==rentalId);
//   rentals.splice(rentalIndex,1);
//   return res.json({message:`Rental with id ${rentalId} was deleted!`});

// };

// exports.updateRental=(req,res)=>{
//   const {rentalId}=req.params
//   const rentalBody=req.body;
//   const rentalIndex=rentals.findIndex(r=>r._id==rentalId);
//   rentals[rentalIndex].city=rentalBody.city;
//   rentals[rentalIndex].title=rentalBody.title;
//   return res.json({message:`Rental with id ${rentalId} was updated!`});
// };