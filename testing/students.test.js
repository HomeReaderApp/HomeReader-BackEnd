const request = require('supertest');
const { app } = require('../src/server');
const Student = require('../src/models/student');
const TeacherUser = require('../src/models/teacherUser');
const Class = require('../src/models/class');
const { databaseDisconnector } = require('../src/database');
const { createToken } = require('../src/services/auth_services'); // Import the function to create a token

describe("Student Routes", () => {
  let teacherToken;

  beforeEach(async () => {
    // Clear the student and class collections before each test to start with a clean state
    await Student.deleteMany();
    await Class.deleteMany();

    // Create a new teacher user and get the token for authentication
    const newUser = {
      firstName: "John",
      lastName: "Doe",
      schoolName: "ABC School",
      username: "john.doe",
      password: "password1",
    };
    const userResponse = await request(app).post('/teacher/register').send(newUser);
    expect(userResponse.status).toBe(201);
    expect(userResponse.body).toHaveProperty('token');
    teacherToken = userResponse.body.token;
  });

  afterAll(async () => {
    await databaseDisconnector();
  });

  describe("POST /teacher/create-student", () => {
    it("should respond with status 201 and create a new student", async () => {
      // Create a new class for the teacher
      const newClass = {
        className: "Math Class",
      };
      const classResponse = await request(app)
        .post('/teacher/create-class')
        .set('Authorization', `Bearer ${teacherToken}`)
        .send(newClass);
      expect(classResponse.status).toBe(201);
      expect(classResponse.body).toHaveProperty('className', newClass.className);

      // Create a new student for the class
      const newStudent = {
        firstName: "Jane",
        lastName: "Smith",
        yearLevel: "10",
        loginCode: "student123",
      };
      const response = await request(app)
        .post('/teacher/create-student')
        .set('Authorization', `Bearer ${teacherToken}`)
        .send(newStudent);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('firstName', newStudent.firstName);

      // Check if the student exists in the test database
      const studentFromDb = await Student.findById(response.body._id);
      expect(studentFromDb).toBeDefined();

      // Check if the student is associated with the class
      const updatedClass = await Class.findById(classResponse.body._id);
      expect(updatedClass.students).toContain(studentFromDb._id);
    });

    it("should respond with status 400 if the login code is not unique", async () => {
      // Create a new class for the teacher
      const newClass = {
        className: "Math Class",
      };
      const classResponse = await request(app)
        .post('/teacher/create-class')
        .set('Authorization', `Bearer ${teacherToken}`)
        .send(newClass);
      expect(classResponse.status).toBe(201);
      expect(classResponse.body).toHaveProperty('className', newClass.className);

      // Create a new student with a non-unique login code for the class
      const newStudent1 = {
        firstName: "Jane",
        lastName: "Smith",
        yearLevel: "10",
        loginCode: "student123",
      };
      const newStudent2 = {
        firstName: "John",
        lastName: "Doe",
        yearLevel: "11",
        loginCode: "student123", // Same login code as the first student
      };
      const response1 = await request(app)
        .post('/teacher/create-student')
        .set('Authorization', `Bearer ${teacherToken}`)
        .send(newStudent1);
      expect(response1.status).toBe(201);
      expect(response1.body).toHaveProperty('firstName', newStudent1.firstName);

      // Attempt to create another student with the same login code for the same class
      const response2 = await request(app)
        .post('/teacher/create-student')
        .set('Authorization', `Bearer ${teacherToken}`)
        .send(newStudent2);
      expect(response2.status).toBe(400);
      expect(response2.body).toHaveProperty(
        'error',
        'The login code you entered is not unique. Please choose a different one.'
      );

      // Check if only the first student exists in the test database (not the second one)
      const studentsFromDb = await Student.find();
      expect(studentsFromDb).toHaveLength(1);
      expect(studentsFromDb[0].firstName).toBe(newStudent1.firstName);
    });

    it("should respond with status 401 if the request is not authenticated", async () => {
      const newStudent = {
        firstName: "Jane",
        lastName: "Smith",
        yearLevel: "10",
        loginCode: "student123",
      };
      const response = await request(app).post('/teacher/create-student').send(newStudent);
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'Unauthorized');
    });
  });

  // Add tests for other controller methods (getStudentById, updateStudent, deleteStudent) similarly
});
