const crypto = require('crypto');
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

const demo = require('./demo');
const ObjectId = require('mongodb').ObjectId; // TODO: refactor, should be in config or somewhere else

const CRYPTO_KEY = 'a6F3cgtl';
const CRYPTO_ALGORITHM = 'aes-256-ctr';

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
      // make sure that phone number and email are there
      if (!data.email || !data.phone) {
        reject({invalidData: true, message: 'Please enter phone and email!'});
        return;
      }
      // validate phone number
      try {
        const number = phoneUtil.parseAndKeepRawInput(data.phone, 'UK');
        if (!phoneUtil.isValidNumber(number)) {
          throw new Error('Invalid phone number format');
        }
      } catch (err) {
        reject({invalidData: true, message: err.message + '. Valid format: +44 020 3000 2006'});
        return;
      }
      // encrypt phone number
      data.phone = this.encrypt(data.phone);
      this.collection.insertOne(data, (err, res) => {
        if (err) { reject(new Error(`An error occured insering a client, err: ${err}`)); }
        resolve(res.ops[0]);
      });
    });
  }

  updateClient(id, data) {
    return new Promise((resolve, reject) => {
      if (data.phone || data.phone === '') {
        reject({invalidData: true, message: 'Phone cannot be changed!'});
        return;
      }
      if (data.email === '') {
        reject({invalidData: true, message: 'Email cannot be empty!'});
        return;
      }
      this.collection.findOneAndUpdate({_id: ObjectId(id)}, { $set: data }, { returnOriginal: false }, (err, res) => {
        if (err) { reject(new Error(`An error occured updating a client, err: ${err}`)); }
        resolve(res.value); 
      });
    });
  }
  
  disconnect() {
    this.db.close();
  }

  encrypt(text) {
    let cipher = crypto.createCipher(CRYPTO_ALGORITHM, CRYPTO_KEY);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  }

  decrypt(text) {
    let decipher = crypto.createDecipher(CRYPTO_ALGORITHM, CRYPTO_KEY);
    let dec = decipher.update(text, 'hex' , 'utf8');
    dec += decipher.final('utf8');
    return dec;
  }

  // insert some inital data to db, only for demo purposes
  insertDemoData() {
    this.collection.insertMany(demo.CLIENTS, function(err, res) {
      if (err) { reject(new Error('An error occured inserting demo data, err:' + err)); }
    });
  }

};