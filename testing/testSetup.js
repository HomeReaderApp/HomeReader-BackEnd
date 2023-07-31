
// const mongoose = require('mongoose');
// const { deleteDatabase } = require('../src/database'); 

// // // Your database URL
// const databaseURL = 'mongodb://localhost:27017/home_reader_db_test';

// beforeAll(async () => {
//     await mongoose.connect(databaseURL, { useNewUrlParser: true, useUnifiedTopology: true });
//   });
  
//   // Disconnect from the test database after all tests have completed
//   afterAll(async () => {
//     await mongoose.disconnect();
//   });
  
// // Function to clear the database before running tests
// async function clearDatabase() {
//   try {
//     await deleteDatabase(databaseURL);
//   } catch (error) {
//     console.error('Error clearing the database:', error);
//   }
// }

// module.exports = { clearDatabase };
