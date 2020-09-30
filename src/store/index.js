import {createStore,combineReducers} from 'redux';
import rentals from './reducers/rentals';
export function initStore(){
  const reducers=combineReducers({
    rentals,
    data1:(state=[],action)=>{
      if(action.type==='FETCH_DATA'){
        return ['1','2','3'];
      }else{
        return state;
      }     
    }
  });
  const store=createStore(reducers);
  return store;
}
