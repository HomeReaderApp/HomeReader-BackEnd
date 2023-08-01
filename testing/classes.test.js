// // const request = require('supertest');
// // const { app } = require('../src/server');
// // const Class = require('../src/models/class');
// // const TeacherUser = require('../src/models/teacherUser');
// // const { createToken, createStudentToken } = require('../src/services/auth_services');
const { databaseDisconnector } = require('../src/database');

// // describe("Classes", () => {
// //   // Create a test teacher user and class for testing
// //   let teacherUser;
// //   let testClass;

// //   beforeAll(async () => {
// //     teacherUser = new TeacherUser({
// //       firstName: "John",
// //       lastName: "Doe",
// //       schoolName: "Test School",
// //       username: "testuser",
// //       password: "testpassword",
// //     });

// //     testClass = new Class({
// //       className: "Test Class",
// //     });

// //     await teacherUser.save();
// //     await testClass.save();

// //     // Add the test class to the teacher's classes array
// //     teacherUser.classes.push(testClass);
// //     await teacherUser.save();
// //   });

// //   afterAll(async () => {
// //     // Cleanup the test data and disconnect from the database after all tests have completed
// //     await TeacherUser.deleteMany({});
// //     await Class.deleteMany({});
// //   });

// //   it('should create a new class', async () => {
// //     // Generate a token for the teacher user
// //     const token = createToken(teacherUser._id, teacherUser.username);

// //     const response = await request(app)
// //       .post('/create-class')
// //       .send({ className: "New Class" })
// //       .set('Authorization', `Bearer ${token}`);
    
// //     expect(response.statusCode).toEqual(201);
// //     expect(response.body).toHaveProperty('className', 'New Class');
// //   });

// //   it('should get teacher classes', async () => {
// //     // Generate a token for the teacher user
// //     const token = createToken(teacherUser._id, teacherUser.username);

// //     const response = await request(app)
// //       .get(`/${teacherUser._id}/get-classes`)
// //       .set('Authorization', `Bearer ${token}`);
    
// //     expect(response.statusCode).toEqual(200);
// //     expect(response.body).toBeInstanceOf(Array);
// //     expect(response.body.length).toEqual(1); // The test teacher user should have one class
// //   });

// //   it('should get a specific class for a teacher', async () => {
// //     // Generate a token for the teacher user
// //     const token = createToken(teacherUser._id, teacherUser.username);

// //     const response = await request(app)
// //       .get(`/get-class/${testClass._id}`)
// //       .set('Authorization', `Bearer ${token}`);
    
// //     expect(response.statusCode).toEqual(200);
// //     expect(response.body).toHaveProperty('className', testClass.className);
// //   });
// // });

// //    // Disconnect from the test database after all tests have completed
// //    afterAll(async () => {
// //     await databaseDisconnector()
// //   });

// const request = require('supertest');
// const { app } = require('../src/server');
// const Class = require('../src/models/class');
// const TeacherUser = require('../src/models/teacherUser');
// const { createToken, createStudentToken } = require('../src/services/auth_services'); // Import the JWT functions

// describe("Classes", () => {
//   // Create a test teacher user and class for testing
//   let teacherUser;
//   let testClass;

//   beforeAll(async () => {
//     teacherUser = new TeacherUser({
//       firstName: "John",
//       lastName: "Doe",
//       schoolName: "Test School",
//       username: "testuser",
//       password: "testpassword",
//     });

//     testClass = new Class({
//       className: "Test Class",
//     });

//     await teacherUser.save();
//     await testClass.save();

//     // Add the test class to the teacher's classes array
//     teacherUser.classes.push(testClass);
//     await teacherUser.save();
//   });

//   afterAll(async () => {
//     // Cleanup the test data and disconnect from the database after all tests have completed
//     await TeacherUser.deleteMany({});
//     await Class.deleteMany({});
//   });

//   it('should create a new class', async () => {
//     // Generate a token for the teacher user
//     const token = createToken(teacherUser._id, teacherUser.username);

//     const response = await request(app)
//       .post('/create-class')
//       .send({ className: "New Class" })
//       .set('Authorization', `Bearer ${token}`);
    
//     expect(response.statusCode).toEqual(201);
//     expect(response.body).toHaveProperty('className', 'New Class');
//   });

//   it('should get teacher classes', async () => {
//     // Generate a token for the teacher user
//     const token = createToken(teacherUser._id, teacherUser.username);

//     const response = await request(app)
//       .get(`/${teacherUser._id}/get-classes`)
//       .set('Authorization', `Bearer ${token}`);

//     // Log the response body for debugging
//     console.log(response.body);

//     expect(response.statusCode).toEqual(200);
//     expect(response.body).toBeInstanceOf(Array);
//     expect(response.body.length).toEqual(1); // The test teacher user should have one class
//   });

//   it('should get a specific class for a teacher', async () => {
//     // Generate a token for the teacher user
//     const token = createToken(teacherUser._id, teacherUser.username);

//     const response = await request(app)
//       .get(`/get-class/${testClass._id}`)
//       .set('Authorization', `Bearer ${token}`);
    
//     expect(response.statusCode).toEqual(200);
//     expect(response.body).toHaveProperty('className', testClass.className);
//   });
//     // Disconnect from the test database after all tests have completed
//    afterAll(async () => {
//     await databaseDisconnector()
//   });

// });

const request = require('supertest');
const { app } = require('../src/server');
const Class = require('../src/models/class');
const TeacherUser = require('../src/models/teacherUser');
const { createToken, createStudentToken } = require('../src/services/auth_services'); // Import the JWT functions

// Function to clear the test database
async function clearTestDatabase() {
  await TeacherUser.deleteMany({});
  await Class.deleteMany({});
}

describe("Classes", () => {
  // Create a test teacher user and class for testing
  let teacherUser;
  let testClass;

  beforeAll(async () => {
    // Clear the test database before running the tests
    await clearTestDatabase();

    teacherUser = new TeacherUser({
      firstName: "John",
      lastName: "Doe",
      schoolName: "Test School",
      username: "testuser",
      password: "testpassword",
    });

    testClass = new Class({
      className: "Test Class",
    });

    await teacherUser.save();
    await testClass.save();

    // Add the test class to the teacher's classes array
    teacherUser.classes.push(testClass);
    await teacherUser.save();
  });

  // Clean up the test data after all tests have completed
  afterAll(async () => {
    await clearTestDatabase();
  });

  it('should create a new class', async () => {
    // Generate a token for the teacher user
    const token = createToken(teacherUser._id, teacherUser.username);

    const response = await request(app)
      .post('/create-class')
      .send({ className: "New Class" })
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty('className', 'New Class');
  });

  it('should get teacher classes', async () => {
    // Generate a token for the teacher user
    const token = createToken(teacherUser._id, teacherUser.username);

    const response = await request(app)
      .get(`/${teacherUser._id}/get-classes`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toEqual(2); // The test teacher user should have one class
  });

  it('should get a specific class for a teacher', async () => {
    // Generate a token for the teacher user
    const token = createToken(teacherUser._id, teacherUser.username);

    const response = await request(app)
      .get(`/get-class/${testClass._id}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('className', testClass.className);
  });
//   Disconnect from the test database after all tests have completed
   afterAll(async () => {
    await databaseDisconnector()
  });
});


