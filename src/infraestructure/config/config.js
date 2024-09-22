const { Pool } = require('pg');

// BD Ivan
const con = new Pool({
	user: "sinna_prod",
	host: "172.16.1.226",
	password: "s1nn42024#",
	database: "sinna_prod",
	port: "5555",
});
/*
const con = new Pool({
	user: "postgres",
	host: "localhost",
	password: "12345678",
	database: "sinna",
	port: "5435",
});*/

module.exports = con;
