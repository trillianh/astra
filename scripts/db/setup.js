// Note: For now just do what it is required to get the application running
// this will not be used in the future to create a collection and index
import createCollection from '../../scripts/db/createCollection';
import createIndex from '../../scripts/db/createIndex';

// There is a chance for race condition, these functions should return promises
createCollection('characters');
createIndex('characters', { discord_id: 1 }, { unique: true });