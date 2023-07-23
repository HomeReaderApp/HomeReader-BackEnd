const {app, PORT, HOST} = require('./server')

// app.listen(PORT, () => {
//     console.log("Express server is running on port" + PORT)
// })

const server = app.listen(PORT, HOST, () => {
    if (server.address().port != PORT){
		PORT = server.address().port;
	}

	console.log(`	
	Express server is now running!
	Server address mapping is:
	
	HOST: ${HOST}
	PORT: ${PORT}
    `)
})
