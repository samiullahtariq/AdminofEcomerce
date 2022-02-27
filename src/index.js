import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import store from './redux/store'
import { PersistGate } from 'redux-persist/integration/react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js"
import {Provider} from "react-redux"
import {persistor} from './redux/store'

ReactDOM.render(
  <React.StrictMode>
   <BrowserRouter>
   <Provider store={store}>
   <PersistGate loading={null} persistor={persistor}>
       <App/>
    </PersistGate>
     </Provider>
       </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
