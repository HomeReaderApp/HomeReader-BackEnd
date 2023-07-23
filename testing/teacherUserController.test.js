
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
  });
});

