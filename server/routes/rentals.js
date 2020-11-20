const express=require('express');
const router=express.Router();
const {
  getRentals,
  getRentalById,
  createRental,
  updateRental,
  deleteRental}=require('../controllers/rentals');
const {onlyAuthUser}=require('../controllers/users');
router.get('/',getRentals);
router.get('/:rentalId',getRentalById);
router.post('/',onlyAuthUser,createRental);
// router.delete("/:rentalId",deleteRental);
// router.patch("/:rentalId",updateRental);

module.exports=router;