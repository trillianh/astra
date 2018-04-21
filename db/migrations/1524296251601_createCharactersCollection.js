import createCollection from '../../scripts/db/createCollection';

const TIMESTAMP = 1524296251601;

createCollection('characters');
createIndex('characters', { discord_id: 1 }, { unique: true });