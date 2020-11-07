import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import AuhtRoute from 'components/auth/AuthRoute';
import RentalHome from './pages/RentalHome';
import RentalDetail from './pages/RentalDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import SecretPage from './pages/SecretePage';
import { Router } from 'components/Bwm-Router';
const Routes=()=>{
  
  return (
    <div className="container bwm-container">
    <Switch>
    <Route exact path="/">
      <RentalHome/>
    </Route>
    <Route exact path="/rentals/:id">
      <RentalDetail/>
    </Route>
    <Route path="/login">
      <Login/>
    </Route>
    <Route path="/register">
      <Register/>
    </Route>
    <AuhtRoute path="/secret" component={SecretPage}>
    </AuhtRoute>
  </Switch>
  </div>
  );
};

export default Routes;