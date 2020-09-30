//PURE FUNCTION
//Don't mutate arguments
//No API calls,no route transitions
//no Math.random() call
const rentals=(state=[],action)=>{
  if(action.type==='FETCH_RENTALS'){
    debugger
     return action.rentals
   }else{
     debugger
     return state;
   }
 }

 export default rentals;
