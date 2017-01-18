const express = require('express');
const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');

const pgp = require('pg-promise')();
import dbConnection from './dbConnectionDetails';

import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'
import App from '../src/App';
import { Provider } from 'react-redux';
import rootReducer from '../src/redux/index'


const app = express();
const port = 9000;

const htmlTemplate = fs.readFileSync(path.join(__dirname, '../build', 'index.html')); // load template into memory
const db = pgp(dbConnection);

app.get('/', function (req, res) {

    db.one("select * from states where id=$1", ['TestID'])
        .then(data => {
            const html = prepareHtml(data);
            res.send(html);
        })
        .catch(error => {
            const html = prepareHtml('');
            res.send(html);
        });
});

function prepareHtml(preLoadedStateString) {
    preLoadedStateString = preLoadedStateString.replace(/</g, '\\x3c');
    let $ = cheerio.load(htmlTemplate);

    // put the initial state into the html
    let initScript = $(`<script>window.__PRELOADED_STATE__ = ${preLoadedStateString}</script>`);
    $('#initState').replaceWith(initScript);

    // render the initial html
    const preLoadedState = JSON.parse(preLoadedStateString);
    const store = createStore(rootReducer, preLoadedState);
    const startHtml = renderToString(
        <Provider store={store}>
            <App/>
        </Provider>
    );
    // and put it into the html
    $('#app').append(startHtml);

    return $.html();
}

app.use(express.static('./build'));

app.listen(port, (error) => {
    if (error) {
        console.error(error)
    } else {
        console.info(`==> Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
    }
});
