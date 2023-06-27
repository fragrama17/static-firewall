const express = require('express');
const http = require('http');
const path = require("path");
const yargs = require('yargs');
const {Router} = require("express");

const DEFAULT_PATH = "build";
const DEFAULT_PORT = 3000;
const WHITE_LIST = ['::1'];
const ipAddressRegex = /^([0-9]{1,3}\.){3}[0-9]{1,3}$|^::1$|^::ffff:([0-9]{1,3}\.){3}[0-9]{1,3}$/;


const argv = yargs
    .option('p', {
        alias: 'port',
        description: 'Specify the port',
        type: 'number',
        default: DEFAULT_PORT
    })
    .option('f', {
        alias: 'folder',
        description: 'Specify the static folder where the index.html resides',
        default: DEFAULT_PATH
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

const port = argv.port || DEFAULT_PORT;
const folder = argv.folder || DEFAULT_PATH;
WHITE_LIST.push(...argv.ips.filter(ip => ipAddressRegex.test(ip)));

const firewall = (req, res, next) => {

    if (WHITE_LIST.indexOf(req.ip) === -1)
        return res.status(403).send('Hi Mate ! you are not allowed to see this, sorry');

    next();
}

const redirectRouter = Router();
redirectRouter.get('*', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, folder, 'index.html'));
});

const app = express();
app.use(firewall, redirectRouter);

http.createServer(app).listen(port, () => {
    console.log('static server listening on port', port);
});

console.log("Ips allowed:", WHITE_LIST);