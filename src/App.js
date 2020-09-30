import React from 'react';
import Header from './components/shared/Header';
import Routes from './Routes';
import Provider from './store/Provider';
import {initStore} from './store';
import{
  BrowserRouter as Router
} from 'react-router-dom';

const store=initStore();
const App=()=>{
  return (
    <Provider store={store}>
      <Router>
        <Header/>
        <Routes/>
      </Router>
    </Provider>
  );
}

export default App;