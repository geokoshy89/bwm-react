import {rentalData} from './data';
import {createStore,combineReducers} from 'redux';
export function initStore(){
  const reducers=combineReducers({
    rentals:()=>{
      return rentalData;
    }
  });
  const store=createStore(reducers);
  return store;
}
