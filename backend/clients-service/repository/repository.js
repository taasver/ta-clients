const demo = require('./demo');

module.exports = class ClientsRepository {

  constructor(db) {
    this.db = db;
    this.collection = this.db.collection('clients');

    // This step is only for demo purposes
    this.getClients().then(clients => {
      if (!clients.length) { this.insertDemoData(); }
    });

  }

  getClients() {
    return new Promise((resolve, reject) => {
      const clients = [];
      const cursor = this.collection.find({}, {title: 1, id: 1});
      cursor.forEach((client) => {
        clients.push(client);
      }, (err) => {
        if (err) { reject(new Error('An error occured fetching all clients, err:' + err)); }
        resolve(clients);
      });
    });
  }

  getClientById(id) {
    return new Promise((resolve, reject) => {
      this.collection.findOne({id: id}, { _id: 0, id: 1, title: 1, format: 1 }, (err, client) => {
        if (err) { reject(new Error(`An error occured fetching a client with id: ${id}, err: ${err}`)); }
        resolve(client);
      })
    });
  }
  
  disconnect() {
    this.db.close();
  }

  // insert some inital data to db, only for demo purposes
  insertDemoData() {
    this.collection.insertMany(demo.CLIENTS, function(err, res) {
      if (err) { reject(new Error('An error occured inserting demo data, err:' + err)); }
    });
  }

};