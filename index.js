const express = require('express');
const http = require('http');
const app = express();

const PORT = 8080;

const WHITE_LIST = ['::1'];

const firewall = (req, res, next) => {

    if (WHITE_LIST.indexOf(req.ip) === -1)
        return res.status(403).send('Hi Mate ! you are not allowed to see this, sorry');

    next();
}

app.use(firewall, express.static(__dirname));

http.createServer(app).listen(PORT, () => {
    console.log('static server listening on port', PORT);
});