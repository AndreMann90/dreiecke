const express = require('express');
const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');

import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'
import App from '../src/App';
import { Provider } from 'react-redux';
import rootReducer from '../src/redux/index'


const app = express();
const port = 9000;

app.get('/', function (req, res) {
    let $ = cheerio.load(fs.readFileSync(path.join(__dirname, '../build', 'index.html')));

    // load the initial state
    let preLoadedState = {present: {name: 'test'}};

    // put the initial state into the html
    let initScript = $(`<script>window.__PRELOADED_STATE__ = ${JSON.stringify(preLoadedState).replace(/</g, '\\x3c')}</script>`);
    $('#initState').replaceWith(initScript);

    // render the initial html
    const store = createStore(rootReducer, preLoadedState);
    const startHtml = renderToString(
        <Provider store={store}>
            <App/>
        </Provider>
    );
    $('#app').append(startHtml);

    res.send($.html());
});

app.use(express.static('./build'));

app.listen(port, (error) => {
    if (error) {
        console.error(error)
    } else {
        console.info(`==> Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
    }
});