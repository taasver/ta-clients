'use strict'

const server = require('./server/server');
const ClientsRepository = require('./repository/repository');
const config = require('./config/config');

console.log('--- Clients Service ---');
console.log('Connecting to clients repository...');

config.db.connect(config.dbSettings).then((db) => {
  let repo = new ClientsRepository(db);
  console.log('Connected. Starting Server');
  server.start({ port: config.serverSettings.port, repo }).then(app => {
    console.log(`Server started succesfully, running on port: ${config.serverSettings.port}.`);
    app.on('close', () => { repo.disconnect(); });
  });
}).catch((err) => {
  console.error(err);
});