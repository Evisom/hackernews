import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import {Provider} from 'react-redux'

import GlobalStyle from './globalStyle';

import 'bootstrap/dist/css/bootstrap.min.css';

import Article from './Article'
import App from './App';
import NotFound from './NotFound'

import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <GlobalStyle/>
    <Provider store={store}>
      <BrowserRouter>
      
        <Routes>
          <Route path='/' element={<App/>}/>
          <Route path='/article/:id' element={<Article/>}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
    </BrowserRouter>
  </Provider>
</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
