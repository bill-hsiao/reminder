const mongoose = require('mongoose');
const env_vars = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS
}

mongoose.connect(`mongodb://${env_vars.user}:${env_vars.pass}@${env_vars.host}`, { useNewUrlParser: true })

const db = mongoose.connection;

db.once('open', function() {
  console.log(`connected to MongoDB at ${db.host}:${db.port}`);
});

db.on('error', function(err) {
  console.error(`Database error:\n${err}`);
});
