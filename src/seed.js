const { ConnectToDatabase, CloseDatabase } = require('./db');
const movies = require('./movies');

async function Seed() {
  const collection = await ConnectToDatabase();
  await collection.deleteMany({});
  const result = await collection.insertMany(movies);
  console.log(`Inserted ${result.insertedCount} movies.`);
}

Seed()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(CloseDatabase);
