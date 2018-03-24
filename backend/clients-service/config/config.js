const db = require('./mongo');

const dbSettings = {
  dbName: process.env.DB || 'ta-clients',
  server: process.env.DB_SERVER || 'mongodb://localhost:27017/'
}

const serverSettings = {
  port: process.env.PORT || 3000
}

module.exports = Object.assign({}, {db, dbSettings, serverSettings});