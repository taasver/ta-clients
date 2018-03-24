'use strict'

const status = require('http-status');

module.exports = (app, options) => {
  const {repo} = options;

  app.get('/clients', (req, res, next) => {
    repo.getClients().then(clients => {
      res.status(status.OK).json(clients);
    }).catch(next);
  });

  app.get('/clients/:id', (req, res, next) => {
    repo.getClientById(req.params.id).then(client => {
      res.status(status.OK).json(client);
    }).catch(next);
  })

};