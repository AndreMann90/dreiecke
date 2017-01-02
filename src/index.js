import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import measurementApp from './reducers'
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './PrintStyle.css'


let store = createStore(measurementApp);

console.log(store.getState());

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
