const express = require('express');
const http = require('http');
const path = require("path");
const yargs = require('yargs');
const app = express();

//TODO change the path of the static content folder if -f (or --folder) command specified
const DEFAULT_PATH = "build";
const DEFAULT_PORT = 3000;
const WHITE_LIST = ['::1'];
const ipAddressRegex = /^([0-9]{1,3}\.){3}[0-9]{1,3}$|^::1$|^::ffff:([0-9]{1,3}\.){3}[0-9]{1,3}$/;

let port = DEFAULT_PORT;

const argv = yargs
    .option('p', {
        alias: 'port',
        description: 'Specify the port',
        type: 'number'
    })
    .option('i', {
        alias: 'ips',
        description: 'Specify the static ip addresses to allow requests',
        type: 'array',
        default: []
    })
    .help()
    .alias('help', 'h')
    .argv;

port = argv.port || DEFAULT_PORT;
WHITE_LIST.push(...argv.ips.filter(ip => ipAddressRegex.test(ip)));

const firewall = (req, res, next) => {

    if (WHITE_LIST.indexOf(req.ip) === -1)
        return res.status(403).send('Hi Mate ! you are not allowed to see this, sorry');

    next();
}

app.use(firewall, express.static(path.join(__dirname, DEFAULT_PATH)));

http.createServer(app).listen(port, () => {
    console.log('static server listening on port', port);
});

console.log("Ips allowed:", WHITE_LIST);