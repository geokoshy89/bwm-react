import axios from 'axios';

export const fetchRentals=()=>{
  
  return (dispatch)=>{
    axios.get('/api/v1/rentals')
    .then(res=>{
      const rentals=res.data;
      dispatch({
        type:"FETCH_RENTALS",
        rentals
      });
    })
  }
  
}


export const fetchRentalById=(rentalId)=>{
  return (dispatch)=>{
    dispatch({type:'IS_FETCHING_RENTAL'});
  axios.get(`/api/v1/rentals/${rentalId}`)
  .then(res=>{
    const rental=res.data;
    dispatch({
      type:"FETCH_RENTAL_BY_ID",
      rental
    });
  })
 }

}

export const createRental=rental=>{
  return {
    type:'CREATE_RENTAL',
    rental
  }
}