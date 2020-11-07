import React, { Component } from 'react';
import {Route,Redirect} from 'react-router-dom';
import {UseAuth} from 'providers/AuthProvider';

const AuthRoute=({component:Component,...rest})=>{
    const authService=UseAuth();
    return (
       <Route {...rest} render={(props)=>authService.isAuthenticated()?
       <Component {...rest} {...props}/>:<Redirect to={{pathname:'/login'}}/>}/>
    )
}

export default AuthRoute;