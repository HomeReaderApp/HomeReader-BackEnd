const dotenv = require('dotenv')
dotenv.config();

const express = require('express')
const app = express()

const mongoose = require('mongoose')

const PORT = process.env.PORT || 3001
const HOST = process.env.HOST || '127.0.0.1'

const helmet = require('helmet')
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.contentSecurityPolicy({
	directives:{
		defaultSrc:["self"]
	}
}))

const cors = require('cors')
let corsOptions = {
	origin: ["http://localhost:3000", "https://bespoke-klepon-bc5d33.netlify.app"],
	optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.use(express.json());
app.use(express.urlencoded({extended: true}))

let databaseURL = "";
switch(process.env.NODE_ENV.toLowerCase()){
	case "production":
		databaseURL = process.env.DATABASE_URL;
		break;
	case "development":
		databaseURL = 'mongodb://localhost:27017/home_reader_db';
		break;
	case "test":
		databaseURL = 'mongodb://localhost:27017/home_reader_db_test';
		break;
	default:
		console.error("Wrong environment mode, database cannot connect");
}

const {databaseConnector} = require("./database")

databaseConnector(databaseURL).then(() =>{
	console.log("Connected to the Database at" + " " + databaseURL)
}).catch(error => {
	console.log("Could not connect to the database!")
	console.log(error)
})

app.get("/databaseHealth", (request, response) => {
    let databaseState = mongoose.connection.readyState;
    let databaseName = mongoose.connection.name;
    let databaseModels = mongoose.connection.modelNames();
    let databaseHost = mongoose.connection.host;

    response.json({
        readyState: databaseState,
        dbName: databaseName,
        dbModels: databaseModels,
        dbHost: databaseHost
    })
});

app.get('/', (request, response) => {
    response.json({
        message : "Welcome to the HomeReader app!"
    })
})

const teacherUserRouter = require('./routes/teacher_routes.js')
app.use('/teacher', teacherUserRouter)

const studentUserRouter = require('./routes/student_login_routes.js')
app.use('/student', studentUserRouter)

const validateRequest = require("./middlewares/auth_middlewares.js")
app.use(validateRequest)

const classRouter = require('./routes/class_routes.js');
app.use('/', classRouter)

const studentRouter = require('./routes/student_routes.js')
app.use('/', studentRouter)

const readingDataRouter = require("./routes/reading_data_routes.js")
app.use('/', readingDataRouter)

app.get('*', (request, response) =>{
	response.status(404)
	response.json({
		message: "Route not found",
		path: request.path
	})
})

module.exports = {
    app,
    PORT,
    HOST,
}