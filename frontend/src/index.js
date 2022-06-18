import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux"
import store from "./store";
import {positions,transitions,Provider as AlertProvider} from "react-alert"
import AlertTemplate from "react-alert-template-basic";

// const root = ReactDOM.createRoot(document.getElementById('root'))
const options ={
  timeout:4000,
  position:positions.BOTTOM_CENTER,
  transitions:transitions.SCALE
}
ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
    <App />
    </AlertProvider>
  </Provider>,
  document.getElementById("root")
);

