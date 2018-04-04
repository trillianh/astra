import fs from 'fs';

const args = process.argv;
const migrationName = args[2];

// throw exception if migrationName is null, undefined, or empty string
// create a file in the db/migrations directory

const timestamp = Date.now();

if (migrationName === null || migrationName === undefined || migrationName === '') {
  throw 'Invalid migration name';
}

fs.writeFile(`./db/migrations/${timestamp}_${migrationName}.js`, `const TIMESTAMP=${timestamp}`, (err) => {
  if (err) {
    console.log(err);
    throw 'Failed to create migration';
  }

  console.log('Migration created');
});