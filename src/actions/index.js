import axios from 'axios';

export const extractApiErrors=(responseError)=>{
  let errors=[{title:'Error',detail:'OOops,Something went wrong!'}];
  debugger
  if(responseError && responseError.data && responseError.data.errors){
    errors=responseError.data.errors;
  }
  return errors;
};

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

//AUTH ACTIONS

export const registerUser=(registerData)=>{
  return axios
        .post(`/api/v1/users/register`,registerData)
        .catch(error=> Promise.reject(extractApiErrors(error.response||{})));
}

export const loginUser=(loginData)=>{
  return axios
        .post(`/api/v1/users/login`,loginData)
        .then(res=>res.data)
        .catch(error=> Promise.reject(extractApiErrors(error.response||{})));
}

export const userAuthenticated=(decodedToken)=>{
  return {
    type:'USER_AUTHENTICATED',
    username:decodedToken.username||''
  }
}