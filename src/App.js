import React,{useEffect} from 'react';
import Header from 'components/shared/Header';
import Routes from 'Routes';
import { Provider } from 'react-redux';
import {initStore} from 'store';
import {AuthProvider,UseAuth} from 'providers/AuthProvider';
import {MapProvider} from 'providers/MapProvider';
import{
  BrowserRouter as Router
} from 'react-router-dom';

const store=initStore();

const Providers=({children})=>
  <Provider store={store}>
  <AuthProvider>
      <MapProvider apiKey= "iRCPm28kXMVGElIrI4WyHVGVLE2CYXkh">
        {children}
      </MapProvider>
    </AuthProvider>
  </Provider>

const BwmApp=()=>{
  const authService=UseAuth();
  useEffect(()=>{
    authService.checkAuthState();
  },[authService]);
  return (
    <Router>
            <Header logout={authService.signOut}/>
            <Routes/>
          </Router>
  )
}
const App=()=>{
  return (
    <Providers>
          <BwmApp/>
      </Providers>
  );
}

export default App;