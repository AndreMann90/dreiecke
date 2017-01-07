import React from 'react';
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware  } from 'redux'
import createLogger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './redux/index';
import rootReducer from './redux/index'
import {addPosition} from './redux/positionList'
import App from './App';
import PrintPreview from './PrintPreview'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './PrintStyle.css'

//configuring middleware
let withStateDiff = false;
let logger = createLogger({diff: withStateDiff});

const epicMiddleware = createEpicMiddleware(rootEpic);

//setup store
let store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware, logger)
);

store.dispatch(addPosition()); // one empty position

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}/>
            <Route path="/print-preview" component={PrintPreview}/>
        </Router>
    </Provider>,
    document.getElementById('root')
);
