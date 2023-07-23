const mongoose = require('mongoose')

async function databaseConnector(databaseURL){
    await mongoose.connect(databaseURL)
}

async function databaseDisconnector(){
    await mongoose.connection.close()
 
}

async function deleteDatabase(databaseURL) {
    try {
      await mongoose.connect(databaseURL);
      await mongoose.connection.dropDatabase();
      console.log('Database deleted successfully!');
    } catch (error) {
      console.error('Error deleting the database:', error);
    }
  }

module.exports = {
    databaseConnector, 
    databaseDisconnector,
    deleteDatabase
}

