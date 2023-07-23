
const request = require('supertest');
const { app } = require('../src/server');
// require('./testSetup')

describe("Has a homepage...", () => {
  it('...responds with status 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toEqual(200);
  });

  it('...responds with a JSON object', async () => {
    const response = await request(app).get('/');
    const responseBodyDataType = typeof response.body;
    expect(responseBodyDataType).toEqual("object");
  });
});


