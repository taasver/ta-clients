const demo = require('./demo');
const ObjectId = require('mongodb').ObjectId; // TODO: refactor, should be in config or somewhere else

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
      this.collection.findOne(ObjectId(id), (err, client) => {
        if (err) { reject(new Error(`An error occured fetching a client with id: ${id}, err: ${err}`)); }
        resolve(client);
      });
    });
  }

  insertClient(data) {
    return new Promise((resolve, reject) => {


      // TODO: validate data


      this.collection.insertOne(data, (err, res) => {
        if (err) { reject(new Error(`An error occured insering a client, err: ${err}`)); }
        resolve(res.ops[0]);
      });
    });
  }

  updateClient(id, data) {
    return new Promise((resolve, reject) => {



      // TODO: validate data and post proper data
      let newData = { $set: data };



      this.collection.findOneAndUpdate({_id: ObjectId(id)}, newData, { returnOriginal: false }, (err, res) => {
        if (err) { reject(new Error(`An error occured updating a client, err: ${err}`)); }
        resolve(res.value); 
      });
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