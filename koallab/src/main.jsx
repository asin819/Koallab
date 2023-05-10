import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {createStore, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import './index.css'

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
