const express = require('express');
const path = require('path');

const app = express();
const port = 9000;

app.use(express.static('./build'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './build', 'index.html'));
});


app.listen(port, (error) => {
    if (error) {
        console.error(error)
    } else {
        console.info(`==> Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
    }
});