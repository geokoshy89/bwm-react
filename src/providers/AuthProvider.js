import React from 'react';
import {loginUser,userAuthenticated} from 'actions';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import moment from 'moment'
const  {createContext,useContext}=React;
const AuthContext=createContext(null);
export const AuthBaseProvider=({children,dispatch})=>{

    const checkAuthState=()=>{
        const decodedToken=decodeToken(getToken());
        if(decodedToken && moment().isBefore(getExpiration(decodedToken))){
            dispatch(userAuthenticated(decodedToken));
        }
    }
    const isAuthenticated=()=>{
        const decodedToken=decodeToken(getToken());
        return isTokenValid(decodedToken);
    }    

    const isTokenValid=(decodedToken)=>{
       return decodedToken && moment().isBefore(getExpiration(decodedToken));
    }
    const getExpiration=(decodedToken)=>{
        return moment.unix(decodedToken.exp);
    }
    const getToken=()=>{
        return localStorage.getItem('bwm_token');
    }
    const decodeToken=(token)=>{
        return jwt.decode(token);
    }
    const signIn=(loginData)=>{
        return loginUser(loginData)
        .then(({token})=>{
            localStorage.setItem('bwm_token',token);
            const decodedToken=decodeToken(token);
            dispatch({
                type:'USER_AUTHENTICATED',
                username:decodedToken.username||''
            })
          return token;
        });
    }

    const signOut=()=>{
        localStorage.removeItem('bwm_token');
        dispatch({
            type:'USER_SIGN_OUT'
        });
    };
    const authApi={
        signIn,
        checkAuthState,
        signOut,
        isAuthenticated
    }
    return (
        <AuthContext.Provider value={authApi}>
            {children}
        </AuthContext.Provider>
    )
}
export const AuthProvider=connect()(AuthBaseProvider);

export const UseAuth=()=>{

    return useContext(AuthContext);
}

export const withAuth=(Component)=>props=>
            <AuthContext.Consumer>
                {authAPi=><Component {...props} auth={authAPi}/>}
            </AuthContext.Consumer>
        
   
