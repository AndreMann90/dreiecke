const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const cheerio = require('cheerio');
const dateFormat = require('date-format');

const pgp = require('pg-promise')();
import dbConnection from './dbConnectionDetails';

import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'
import App from '../src/App';
import Overview from '../src/Overview';
import { Provider } from 'react-redux';
import rootReducer from '../src/redux/index'
import { initImmutable } from '../src/redux/configureStore'


const app = express();
app.use(bodyParser.json());
const port = 9000;

const htmlTemplate = fs.readFileSync(path.join(__dirname, '../build', 'index.html')); // load template into memory

const db = pgp(dbConnection);

app.get('/', function (req, res) {

    db.any("select name, id from states")
        .then(data => {
            const html = prepareHtml({baustellen: data}, <Overview/>);
            res.status(200)
                .set('Content-Type', 'text/html')
                .send(html);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: 'Could not get available states'})
        });
});

app.post('/', function (req, res) {

    let name = req.body.name;
    if(!name) {
        name = dateFormat('Erstellt am dd.MM.yyyy um hh:mm:ss', new Date())
    }

    crypto.randomBytes(16, (err, buffer) => {
        const id = buffer.toString("hex");

        // use json data-type in postgres to validate statetr is proper json
        db.none("insert into states(id, name, stateStr) values($1, $2, $3)", [id, name, '{}'])
            .then(function () {
                res.status(201).json({id, name})
            })
            .catch(function (error) {
                res.status(500).json({error: 'Failed to create new instance'})
            });
    });
});

app.get('/:id', function (req, res) {

    db.one("select statestr from states where id=$1", req.params.id)
        .then(data => {
            const html = prepareHtml(data.statestr, <App/>);
            res.status(200)
                .set('Content-Type', 'text/html')
                .send(html);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({error: 'No instance found for given id'})
        });
});

app.put('/:id', function (req, res) {
    if(req.body.name == null) {
        res.status(400).json({error: 'name is missing'})
    } else if(req.body.state == null) {
        res.status(400).json({error: 'state is missing'})
    } else {
        db.none("update states set name=$2, stateStr=$3 where id=$1", [req.params.id, req.body.name, req.body.state])
            .then(data => {
                res.sendStatus(202)
            })
            .catch(error => {
                res.status(400).json({error: 'Cannot update this'})
            });
    }
});

function prepareHtml(preLoadedState, view) {
    let $ = cheerio.load(htmlTemplate);

    // put the initial state into the html
    let initScript = $(`<script>window.__PRELOADED_STATE__ = ${JSON.stringify(preLoadedState).replace(/</g, '\\x3c')}</script>`);
    $('#initState').replaceWith(initScript);

    // render the initial html
    initImmutable(preLoadedState);
    const store = createStore(rootReducer, preLoadedState);
    const startHtml = renderToString(
        <Provider store={store}>
            {view}
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
