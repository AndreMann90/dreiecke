const express = require('express');
const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');
/* TODO make following imports work
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'
import App from './App';
import { Provider } from 'react-redux'
*/

const app = express();
const port = 9000;

app.get('/', function (req, res) {
    let $ = cheerio.load(fs.readFileSync(path.join(__dirname, './build', 'index.html')));

    // load the initial state
    let preLoadedState = {present: {name: 'test'}};

    // put the initial state into the html
    let initScript = $(`<script>window.__PRELOADED_STATE__ = ${JSON.stringify(preLoadedState).replace(/</g, '\\x3c')}</script>`);
    $('#initState').replaceWith(initScript);

    // render the initial html TODO see imports
    /*const store = createStore(counterApp, preLoadedState);
    const html = renderToString(
        <Provider store={store}>
            <App/>
        </Provider>
    );
     $('#app').append(initScript); */

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