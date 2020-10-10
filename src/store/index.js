import {createStore,combineReducers} from 'redux';
import rentals from './reducers/rentals';
import rental from './reducers/rental';

const addThunkToDispatch=(store)=>{
  const {dispatch}=store;
  return function(action){
    if(typeof action==='function'){
      return action(dispatch);
    }
    dispatch(action);
  }
}
export function initStore(){
  const reducers=combineReducers({
    rentals,
    rental
  });
  const reduxExtension= window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
  const store=createStore(reducers,reduxExtension);
  store.dispatch=addThunkToDispatch(store);
  return store;
}
