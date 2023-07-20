// const mongoose = require('mongoose');
// const { databaseConnector } = require('./database');

// const { TeacherUser } = require('./models/teacherUser.js')
// const { Class } = require('./models/class')
// const { ReadingData } = require('./models/readingData')
// const { Student } = require('./models/student')

// const dotenv = require('dotenv');
// dotenv.config();

// const teachers = [
//     { 
//     firstName: "Nicki",
//     lastName: "Hulett" ,
//     schoolName: "Wodonga PS",
//     username: "nickianne",
//     password: "123456"
//     },

//     {
//     firstName: "Travis",
//     lastName:  "Hulett",
//     schoolName: "Bandiana PS",
//     username: "travotto",
//     password: "abcde"
//         },

// ]

// // const readingData = [
// //     {
// //         bookName:,
// //         rating:,
// //         comments:,
// //         student:,
// //     }
// // ]

// // const students = [
// //     {
// //         studentName:
// //         yearLevel:
// //         loginCode:
// //         classId:
// //     }
// // ]

// const classes = [
//     {
//         className: "Junior",
//         teacherId: "123456789"
//     }
// ]

// // Connect to a database
// var databaseURL = "";
// switch (process.env.NODE_ENV.toLowerCase()) {
//     case "test":
//         databaseURL = "mongodb://localhost:27017/home_reader_db_test";
//         break;
//     case "development":
//         databaseURL = "mongodb://localhost:27017/home_reader_db";
//         break;
//     case "production":
//         databaseURL = process.env.DATABASE_URL;
//         break;
//     default:
//         console.error("Incorrect JS environment specified, database will not be connected.");
//         break;
// }

// databaseConnector(databaseURL).then(() => {
//     console.log("Database connected successfully!");
// }).catch(error => {
//     console.log(`
//     Some error occurred connecting to the database! It was: 
//     ${error}
//     `);
// }).then(async () => {
//     if (process.env.WIPE == "true"){
//         // Get the names of all collections in the DB.
//         const collections = await mongoose.connection.db.listCollections().toArray();

//         // Empty the data and collections from the DB so that they no longer exist.
//         collections.map((collection) => collection.name)
//         .forEach(async (collectionName) => {
//             mongoose.connection.db.dropCollection(collectionName);
//         });
//         console.log("Old DB data deleted.");
//     }
// }).then(async () => {
//     // Add new data into the database.
//     await TeacherUser.insertMany(teachers);
//     let addClasses = await Class.insertMany(classes)

//     console.log("New DB data created.");
// }).then(() => {
//     // Disconnect from the database.
//     mongoose.connection.close();
//     console.log("DB seed connection closed.")
// });


// seed.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { databaseConnector } = require('./database');

const { Class } = require('./models/class');
const { ReadingData } = require('./models/readingData');
const { Student } = require('./models/student');
const { TeacherUser } = require('./models/teacherUser');

dotenv.config();

// Data to be seeded
const teachers = [
  {
    firstName: "Nicki",
    lastName: "Hulett",
    schoolName: "Wodonga PS",
    username: "nickianne",
    password: "123456",
  },
  {
    firstName: "Travis",
    lastName: "Hulett",
    schoolName: "Bandiana PS",
    username: "travotto",
    password: "abcde",
  },
];

const classes = [
  {
    className: "Junior",
    teacherId: null, // Replace with the actual teacherId after seeding teachers
  },
  {
    className: "Senior",
    teacherId: null, // Replace with the actual teacherId after seeding teachers
  },
  // Add more class objects as needed.
];

// Connect to the database
const databaseURL = process.env.DATABASE_URL || "mongodb://localhost:27017/home_reader_db";

databaseConnector(databaseURL)
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((error) => {
    console.log("Some error occurred connecting to the database:", error);
    process.exit(1);
  })
  .then(async () => {
    if (process.env.WIPE === "true") {
      // Get the names of all collections in the DB.
      const collections = await mongoose.connection.db.listCollections().toArray();

      // Empty the data and collections from the DB so that they no longer exist.
      await Promise.all(collections.map((collection) => mongoose.connection.db.dropCollection(collection.name)));
      console.log("Old DB data deleted.");
    }
  })
  .then(async () => {
    // Add new data into the database.

    // Seed TeacherUsers
    const teacherUserIds = await TeacherUser.insertMany(teachers);

    // Seed Classes with actual teacherId
    const updatedClasses = classes.map((cls, index) => {
      return { ...cls, teacherId: teacherUserIds[index]._id };
    });

    await Class.insertMany(updatedClasses);

    console.log("New DB data created.");
  })
  .catch((error) => {
    console.error("Error while seeding data:", error);
  })
  .finally(() => {
    // Disconnect from the database.
    mongoose.connection.close();
    console.log("DB seed connection closed.");
  });
