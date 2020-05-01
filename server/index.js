const express = require('express');
const pino = require('express-pino-logger');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const Database = require('./database');
const bodyParser = require ('body-parser');
const Api = require('./api');

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();
  app.use(pino());

  // Database calls
  const database = new Database();

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // Priority serve any static files.
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }));
  
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  // Answer API requests.
  new Api(app, database);

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  });
}
