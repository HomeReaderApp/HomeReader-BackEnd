
const { databaseDisconnector } = require('../src/database');


const request = require('supertest');
const { app } = require('../src/server');
const Class = require('../src/models/class');
const Student = require('../src/models/student');
const TeacherUser = require('../src/models/teacherUser');
const { createToken } = require('../src/services/auth_services');

// Function to clear the test database
async function clearTestDatabase() {
  await TeacherUser.deleteMany({});
  await Class.deleteMany({});
  await Student.deleteMany({})
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

  it('should create a new student', async () => {
    // Generate a token for the teacher user
    const token = createToken(teacherUser._id, teacherUser.username);

    const response = await request(app)
      .post(`/${testClass._id}/add-student`)
      .send({ 
        firstName: "Nicole",
        lastName: "hulett",
        loginCode: "aaaa",
        yearLevel: 1 
      })
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty('firstName', 'Nicole');
  });

  it('should return an error for duplicate login code', async () => {
    // Create a student with the same login code as the one used in the first test
    const requestBody = {
      firstName: 'Tessa',
      lastName: 'Hayward',
      yearLevel: 2,
      loginCode: "aaaa",
    };
    
    // Generate a token for the teacher user
    const token = createToken(teacherUser._id, teacherUser.username);
    
    // Add the duplicate student using the same login code
    const response = await request(app)
      .post(`/${testClass._id}/add-student`)
      .send(requestBody)
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty('error', 'The login code you entered is not unique. Please choose a different one.');
  });

  it('should return an error for missing required fields', async () => {
    // Omit the required 'firstName' field from the request body
    const requestBody = {
      lastName: 'MissingField',
      yearLevel: 3,
      loginCode: 6666,
    };
    
    // Generate a token for the teacher user
    const token = createToken(teacherUser._id, teacherUser.username);
    
    // Attempt to add the student with missing 'firstName'
    const response = await request(app)
      .post(`/${testClass._id}/add-student`)
      .send(requestBody)
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.statusCode).toEqual(500);

  });
  // Clean up the test data after all tests have completed
  afterAll(async () => {
    await clearTestDatabase();
  });

   afterAll(async () => {
    await databaseDisconnector()
  });
});







