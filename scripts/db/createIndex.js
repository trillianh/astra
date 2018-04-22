import {
  MongoClient
} from 'mongodb';

import {
  DB_NAME,
  MONGO_DB_HOST
} from '../../app/constants/config';

const createIndex = (collectionName, args, options) => {
  MongoClient.connect(MONGO_DB_HOST).then((client) => {
    const db = client.db(DB_NAME);
    const collection = db.collection(collectionName);

    collection.createIndex(args, options)
    client.close();
  });

  console.log(`Indexed created for ${collectionName} collection`);
};

export default createIndex;