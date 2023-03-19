# Static Firewall

simple firewall to allow requests to single-page app only from white-listed machines

### Get Started
- copy `index.js` and `package.json` file into the frontend `./build` folder.


- open a terminal from the `./build` folder and run `npm install`


- specify the port by changing the `PORT` const.


- add and remove allowed ip addresses by modifying the `WHITE_LIST` array.


- run `npm start` from the `./build` folder the to serve the static content 