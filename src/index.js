import React from 'react';
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'
import App from './App';
import PrintPreview from './PrintPreview'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './PrintStyle.css'

const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(preloadedState);
const rootElement = document.getElementById('app');

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}/>
            <Route path="/print-preview" component={PrintPreview}/>
        </Router>
    </Provider>,
    rootElement
);
