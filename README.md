# Static Firewall

simple firewall to allow requests to single-page app only from white-listed machines with static ip address

### Get Started
- copy `index.js` and `package.json` file into the frontend `./build` folder.


- open a terminal from the `./build` folder and run `npm install`


- specify the port by changing the `PORT` const.


- add and remove allowed ip addresses by modifying the `WHITE_LIST` array.


- run `npm start` from the `./build` folder to serve the static content 

### Options
- `-p` or `--port` to specify port (default is 3000)
- `-i` or `--ips` to specify the static ip addresses (separated by white space) to allow requests 

### WIP
 - change the path of the static content folder if -f (or --folder) command specified
