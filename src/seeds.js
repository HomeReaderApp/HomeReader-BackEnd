const { deleteDatabase, databaseDisconnector } = require('./database');

const databaseURL = 'mongodb://localhost:27017/home_reader_db';

async function deleteAndDisconnect() {
  try {
    // Delete the database
    await deleteDatabase(databaseURL);

    // Disconnect from the MongoDB database
    await databaseDisconnector();
    console.log('Disconnected from the database');
  } catch (error) {
    console.error('Error:', error);
  }
}

deleteAndDisconnect();

// const mongoose = require('mongoose');
// const { databaseConnector } = require('./database');

// const { Class } = require('./models/class');
// // const { ReadingData } = require('./models/readingData');
// // const { Student } = require('./models/student');
// const { TeacherUser } = require('./models/teacherUser');

// const dotenv = require('dotenv');
// dotenv.config();

// // Data to be seeded
// const teachers = [
//   {
//     firstName: "Nicki",
//     lastName: "Hulett",
//     schoolName: "Wodonga PS",
//     username: "nickianne",
//     password: "123456",
//   },
//   {
//     firstName: "Travis",
//     lastName: "Hulett",
//     schoolName: "Bandiana PS",
//     username: "travotto",
//     password: "abcde",
//   },
// ];

// // Connect to the database
// const databaseURL = process.env.DATABASE_URL || "mongodb://localhost:27017/home_reader_db";

// databaseConnector(databaseURL).then(() => {
//   console.log("Database connected successfully!");
// }).catch(error => {
//   console.log(`
//   Some error occurred connecting to the database! It was: 
//   ${error}
//   `);
// }).then(async () => {
//   if (process.env.WIPE == "true"){
//       // Get the names of all collections in the DB.
//       const collections = await mongoose.connection.db.listCollections().toArray();
//       console.log(collections)

//       // Empty the data and collections from the DB so that they no longer exist.
//       collections.map((collection) => collection.name)
//       .forEach(async (collectionName) => {
//           mongoose.connection.db.dropCollection(collectionName);
//       });
//       console.log("Old DB data deleted.");
//   }})
//   // .then(async () => {
//   //   // Add new data into the database.

//   //   // Seed TeacherUsers
//   //   const teacherUserIds = await TeacherUser.insertMany(teachers)

//   //   console.log("New DB data created.");
//   // })
//   // .catch((error) => {
//   //   console.error("Error while seeding data:", error);
//   // })
//   .finally(() => {
//     // Disconnect from the database.
//     mongoose.connection.close();
//     console.log("DB seed connection closed.");
//   });
