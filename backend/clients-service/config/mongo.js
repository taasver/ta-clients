const MongoClient = require('mongodb');

const connect = (options) => {
  return MongoClient.connect(options.server + options.dbName, options.parameters)
        .then(database => database.db(options.dbName));
}

module.exports = Object.assign({}, {connect});