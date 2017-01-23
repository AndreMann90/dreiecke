const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const cheerio = require('cheerio');
import moment from 'moment';
moment.locale('de');

const pgp = require('pg-promise')();
import {types} from 'pg';
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

const formatStr = 'Do MMMM YYYY, hh:mm:ss';
const TIMESTAMP_OID = 1114;
const parseTimeFn = (val) => {
    return val === null ? null : moment(val + "+0000").format(formatStr);
};
const decorateName = name => {
    return name ? name : 'Ohne Name'
};
types.setTypeParser(TIMESTAMP_OID, parseTimeFn);
const db = pgp(dbConnection);

app.get('/', function (req, res) {

    db.any("SELECT name, id, lastmodified FROM states ORDER BY lastmodified DESC")
        .then(data => {
            data = data.map(item => {item.name = decorateName(item.name); return item});
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
        name = ''
    }
    let state = req.body.state;
    if(!state) {
        state = '{}'
    }
    let timestamp = moment();
    let lastmodified = timestamp.format(formatStr);

    crypto.randomBytes(16, (err, buffer) => {
        const id = buffer.toString("hex");

        // use json data-type in postgres to validate statetr is proper json
        db.none("insert into states(id, name, stateStr, lastmodified) values($1, $2, $3, $4)", [id, name, state, timestamp.utc().format()])
            .then(function () {
                res.status(201).json({id, lastmodified, state,
                    name: decorateName(name)
                })
            })
            .catch(function (error) {
                console.log(error);
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
        db.none("update states set name=$2, stateStr=$3, lastmodified=$4 where id=$1",
                [req.params.id, req.body.name, req.body.state, moment.utc().format()])
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
