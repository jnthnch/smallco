const { Client } = require("pg");

const client = new Client({
  connectionString: "postgresql://localhost/users"
});

client.connect();

module.exports = client;