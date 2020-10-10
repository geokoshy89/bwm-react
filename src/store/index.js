import {createStore,combineReducers} from 'redux';
import rentals from './reducers/rentals';
import rental from './reducers/rental';

const addPromiseToDispatch=(store)=>{
  const {dispatch}=store;
  return function(action){
    if(action.then && typeof action.then==='function'){
      debugger
      return action.then((action)=>{
        debugger
        dispatch(action);
      })
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
  store.dispatch=addPromiseToDispatch(store);
  return store;
}
