import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware  } from 'redux'
import createLogger from 'redux-logger';
import rootReducer from './redux/index'
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './PrintStyle.css'

let withStateDiff = false;
let logger = createLogger({diff: withStateDiff});

let store = createStore(
    rootReducer,
    applyMiddleware(logger)
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
