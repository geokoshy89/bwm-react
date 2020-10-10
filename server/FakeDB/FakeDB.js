const rentals=require('./data/rentals');
const Rental=require('../models/rental');
class FakeDB{
  async clean(){
    return await Rental.deleteMany({});
  }

  async addData(){
    return await Rental.create(rentals);
  }

  async populate(){
    await this.clean();
    await this.addData();
  }
}
module.exports=FakeDB