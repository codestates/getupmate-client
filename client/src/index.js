import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import iphone from './iphone6.png';

const frameStyle = {
  'display': 'none',
  'width': '610px',
  'position': 'absolute',
  'margin': 'auto',
  'left': '0px',
  'right': '10px',
  'bottom': '0px',
  'top': '10px'
}

ReactDOM.render(
  <BrowserRouter>
    <img src={iphone} style={frameStyle} />
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);