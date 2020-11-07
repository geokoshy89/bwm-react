import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {UseAuth} from 'providers/AuthProvider';

const GuestRoute=({children,...rest})=>{
    const authService=UseAuth();
    const onlyChild=React.Children.only(children);
    return (
       <Route {...rest} render={(props)=>!authService.isAuthenticated()?
       React.cloneElement(onlyChild,{...rest,...props}):<Redirect to={{pathname:'/'}}/>}/>
    )
}

export default GuestRoute;