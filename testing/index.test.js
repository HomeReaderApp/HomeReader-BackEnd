// // server.test.js
// const request = require('supertest');
// const { app } = require('../src/server');

// describe("Has a homepage...", () => {
    
//     it('...responds with status 200', async() => {
//         const response = await request(app).get('/')
//         expect(response.statusCode).toEqual(200)
//     })
//     it('...responds with a JSON object', async() => {
//         const response = await request(app).get('/')
//         const responseBodyDataType = typeof(response.body)
//         expect(responseBodyDataType).toEqual("object")
//     })
// })

// describe("User...", () => {
//     describe("...can sign up...", () => {
//         it("... with a valid username, firstName, lastName, schoolName and password", async () => {
//             const response = await request(app)
//             .post('/teacher/register')
//             .send({
//                 username: "nicki5384",
//                 password: "1234567",
//                 firstName: "Nicki",
//                 lastName: "Hulett",
//                 schoolName: "Osbornes PS"
//             })
//             expect(response.body).toEqual({message: "User registered successfully", token: expect.any(String)})
//             expect(response.statusCode).toEqual(201)
//         })
        

//     })
// })

const request = require('supertest');
const { app } = require('../src/server');

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

describe("User...", () => {
  describe("...can sign up...", () => {
    it("... with a valid username, firstName, lastName, schoolName, and password", async () => {
      const response = await request(app)
        .post('/teacher/register')
        .send({
          username: "nicki5380",
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

