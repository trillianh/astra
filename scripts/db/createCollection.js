import {
  MongoClient
} from 'mongodb';

import {
  DB_NAME,
  MONGO_DB_HOST
} from '../../app/constants/config';

// Validate the collectionName
const createCollection = (collectionName) => {
  MongoClient.connect(MONGO_DB_HOST).then((client) => {
    const db = client.db(DB_NAME);

    db.createCollection(collectionName, (error, result) => {
      if (error) {
        console.log(error);
        throw 'Failed to create collection';
      }

      console.log(`Collection ${collectionName} created`);
    });

    client.close();
  });
};

export default createCollection;