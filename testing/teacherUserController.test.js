
const request = require('supertest');
const { app } = require('../src/server');
const { clearDatabase } = require('./testSetup'); // Import the clearDatabase function


describe("User...", () => {
//   Call clearDatabase before running the test case
    beforeAll(async () => {
    await clearDatabase();
  });

  describe("...can sign up...", () => {
    it("... with a valid username, firstName, lastName, schoolName, and password", async () => {
      const response = await request(app)
        .post('/teacher/register')
        .send({
          username: "nicki5389",
          password: "1234567",
          firstName: "Nicki",
          lastName: "Hulett",
          schoolName: "Osbornes PS",
        });

      expect(response.body).toEqual({ message: "User registered successfully", token: expect.any(String) });
      expect(response.statusCode).toEqual(201);
    });

    it("... with incomplete information", async () => {
        const response = await request(app)
          .post('/teacher/register')
          .send({
            username: "john_doe",
            password: "password123",
            firstName: "John",
            // Last name and school name are missing
          });
    
        expect(response.body).toEqual({ error: 'Failed to register user' });
        expect(response.statusCode).toEqual(500);
      });

    //   it("... with a non-unique username", async () => {
    //     // Assume 'john_doe' is already taken or non-unique
    //     const response = await request(app)
    //       .post('/teacher/register')
    //       .send({
    //         username: "john_doe", // Attempting to use a non-unique username
    //         password: "securepassword",
    //         firstName: "John",
    //         lastName: "Doe",
    //         schoolName: "Example School",
    //       });
    
    //     expect(response.body).toEqual({ error: 'Username is already taken' });
    //     expect(response.statusCode).toEqual(400);
    //   });
    });
  });

