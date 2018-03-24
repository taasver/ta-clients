module.exports = class ClientsRepository {

  constructor(db) {
    this.db = db;
    this.collection = this.db.collection('clients');
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

};