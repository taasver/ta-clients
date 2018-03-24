const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const api = require('../api/clients');

const start = (options) => {
  return new Promise((resolve, reject) => {
    if (!options.repo) { reject(new Error('The server must be started with a connected repository')); }
    if (!options.port) { reject(new Error('The server must be started with an available port')); }

    const app = express();
    app.use(helmet());
    app.use(cors())
    app.use((err, req, res, next) => {
      reject(new Error('Something went wrong!, err:' + err));
      res.status(500).send('Something went wrong!');
    })

    api(app, options);

    const server = app.listen(options.port, () => resolve(server));
  })
}

module.exports = Object.assign({}, {start});