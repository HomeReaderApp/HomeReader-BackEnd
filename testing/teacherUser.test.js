
const request = require('supertest');
const { app } = require('../src/server');
const TeacherUser = require('../src/models/teacherUser');
const { databaseDisconnector } = require('../src/database');
const bcrypt = require('bcrypt')

describe("Teacher Routes", () => {
  beforeEach(async () => {
    // Clear the teacherUser collection before each test to start with a clean state
    await TeacherUser.deleteMany();
  });

  describe("GET /teacher", () => {
    it("should respond with status 200 and return an empty array when there are no teacher users", async () => {
      const response = await request(app).get('/teacher');
      expect(response.status).toBe(200);
      expect(response.body.teacherUsers).toEqual([]);
    });

    it("should respond with status 200 and return a list of teacher users", async () => {
      // Add some teacher users to the test database
      const teacherUsers = [
        { firstName: "John", lastName: "Doe", schoolName: "ABC School", username: "john.doe", password: "password1" },
        { firstName: "Jane", lastName: "Smith", schoolName: "XYZ School", username: "jane.smith", password: "password2" }
      ];
      await TeacherUser.create(teacherUsers);

      const response = await request(app).get('/teacher');
      expect(response.status).toBe(200);
      expect(response.body.teacherUsers).toHaveLength(2);
    });
  });

  describe("POST /teacher/register", () => {
    it("should respond with status 201 and create a new teacher user", async () => {
      const newUser = {
        firstName: "John",
        lastName: "Doe",
        schoolName: "ABC School",
        username: "john.doe",
        password: "password1"
      };

      const response = await request(app)
        .post('/teacher/register')
        .send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');

      // Check if the user exists in the test database
      const user = await TeacherUser.findOne({ username: newUser.username });
      expect(user).toBeDefined();
    });

    it("should respond with status 400 if the username is already taken", async () => {
      // Add a user with the same username to the test database
      await TeacherUser.create({ firstName: "John", lastName: "Doe", schoolName: "School", username: "john.doe", password: "password1" });

      const newUser = {
        firstName: "Jane",
        lastName: "Smith",
        schoolName: "Other School",
        username: "john.doe", // Same username as the existing user
        password: "password2"
      };

      const response = await request(app)
        .post('/teacher/register')
        .send(newUser);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Username is already taken');
    });
  });

  describe("POST /teacher/login", () => {
    beforeEach(async () => {
      // Add a test teacher user with a known password for login tests
      const testUser = {
        firstName: "John",
        lastName: "Doe",
        schoolName: "Test School",
        username: "testuser",
        password: bcrypt.hashSync("testpassword", bcrypt.genSaltSync(10))
      };
      await TeacherUser.create(testUser);
    });

    it("should respond with status 200 and return a JWT token upon successful login", async () => {
      const loginCredentials = {
        username: "testuser",
        password: "testpassword"
      };

      const response = await request(app)
        .post('/teacher/login')
        .send(loginCredentials);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    it("should respond with status 401 if the username is invalid", async () => {
      const loginCredentials = {
        username: "nonexistentuser",
        password: "testpassword"
      };

      const response = await request(app)
        .post('/teacher/login')
        .send(loginCredentials);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'Invalid username');
    });

    it("should respond with status 401 if the password is incorrect", async () => {
      const loginCredentials = {
        username: "testuser",
        password: "wrongpassword"
      };

      const response = await request(app)
        .post('/teacher/login')
        .send(loginCredentials);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'Wrong password');
    });
  });

  describe("POST /teacher/logout", () => {
    it("should respond with status 200 and clear the JWT token", async () => {
      // Set up a mock authenticated request with a JWT token
      const authenticatedRequest = request(app).post('/teacher/logout').set('Cookie', 'jwtToken=mock_jwt_token');

      const response = await authenticatedRequest;

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Logout successful');
      // Assert that the JWT token cookie is cleared
      expect(response.header['set-cookie'][0]).toMatch(/jwtToken=;/);
    });

    // it("should respond with status 401 if the request is not authenticated", async () => {
    //   const response = await request(app).post('/teacher/logout');

    //   expect(response.status).toBe(401);
    //   expect(response.body).toHaveProperty('error', 'Unauthorized');
    // });
  });
});

 // Disconnect from the test database after all tests have completed
 afterAll(async () => {
    await databaseDisconnector()
  });