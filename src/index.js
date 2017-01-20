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
            <Route path="/" component={App}/> {/*TODO make overview*/}
            <Route path="/:id" component={App}/>
            <Route path="/:id/print-preview" component={PrintPreview}/>
        </Router>
    </Provider>,
    rootElement
);

/* To test whether its really a universal java app, build with the following and run the server (if your device and/or network connection is to fast to see it otherwise)
setTimeout(() => {
    render(......)
}, 1000);
*/
