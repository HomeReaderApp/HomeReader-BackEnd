
const request = require('supertest');
const { app } = require('../src/server');
const { databaseDisconnector } = require('../src/database');


describe("Homepage", () => {
  it('responds with status 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toEqual(200);
  });

  it('responds with a JSON object', async () => {
    const response = await request(app).get('/');
    const responseBodyDataType = typeof response.body;
    expect(responseBodyDataType).toEqual("object");
  });

  it('responds with the correct message', async () => {
    const response = await request(app).get('/');
    expect(response.body.message).toEqual("Welcome to the HomeReader app!");
  });
});

  // Disconnect from the test database after all tests have completed
  afterAll(async () => {
    await databaseDisconnector()
  });



