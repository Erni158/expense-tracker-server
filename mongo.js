const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const mongoUri = `mongodb://${process.env.hostName}:${process.env.key}@${process.env.hostName}.mongo.cosmos.azure.com:${process.env.port}/${process.env.dbName}?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@${process.env.dbName}@`

function connect() {
  return mongoose.connect(mongoUri, { auth: { username: process.env.hostName, password: process.env.key }});
}

module.exports = {
  connect,
  mongoose
}