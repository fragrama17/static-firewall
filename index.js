const express = require('express');
const http = require('http');
const path = require("path");
const yargs = require('yargs');

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

    if (WHITE_LIST.indexOf(req.ip) === -1) {
        console.log("NOT ALLOWED:", req.ip, new Date().toLocaleString("en-au"));
        return res.status(403).send('Hi Mate ! you are not allowed to see this, sorry');
    }

    console.log(req.ip, new Date().toLocaleString("en-au"));
    next();
}

const app = express();

app.use(firewall);
app.use(express.static(path.join(__dirname, folder))); // Serve static files from the specified folder
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, folder, 'index.html'));
});

http.createServer(app).listen(port, () => {
    console.log('static server listening on port', port);
});

console.log("Ips allowed:", WHITE_LIST);