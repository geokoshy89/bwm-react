//PURE FUNCTION
//Don't mutate arguments
//No API calls,no route transitions
//no Math.random() call
const rentals=(state=[],action)=>{
  debugger
  switch(action.type){
    case 'FETCH_RENTALS':
      return action.rentals;
    case 'CREATE_RENTAL':
      return [...state,action.rental];
    default:
      return state;
  }
 }

 export default rentals;
