import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import 'bootstrap/dist/js/bootstrap.min.js'
import './index.scss';

//const h2Element=React.createElement('h2',null,'What a nice day');
// const element=React.createElement('h1',{className:'title'},'Hello World George',h2Element);
const rootElement=document.getElementById('root');
ReactDOM.render(<App/>,rootElement);