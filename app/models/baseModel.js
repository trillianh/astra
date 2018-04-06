import {
  MongoClient
} from 'mongodb';

import {
  DB_NAME,
  MONGO_DB_HOST
} from '../constants/config';

class BaseModel {
  static create(args, collectionName) {

    return MongoClient.connect(MONGO_DB_HOST).then((client) => {
      let attributes = [];

      if (args instanceof Array) {
        attributes = args;
      } else if (args.constructor == Object) {
        attributes.push(args);
      } else {
        // Throw an error due to invalid argument type
      }

      const db = client.db(DB_NAME);
      const collection = db.collection(collectionName);
      const records = collection.insertMany(attributes);

      client.close();

      return records;
    }).then((records) => {
      return records;
    });
  };

  static find(args, collectionName) {
    return MongoClient.connect(MONGO_DB_HOST).then((client) => {
      const db = client.db(DB_NAME);
      const collection = db.collection(collectionName);
      const records = collection.find(args).toArray();

      client.close();

      return records;
    }).then((records) => {
      return records;
    });
  };

  static update(query, args, collectionName) {
    // Need to find the record of interest using a unique ID like discordID(?)
    // Return a promise with update
  };
};

export {
  BaseModel
};