const { Pool } = require('pg');

// const con = new Pool({
// 	user: "postgres",
// 	host: "localhost",
// 	password: "6180158",
// 	database: "db_ac2021",
// 	port: "5432",
// });

/*const con = new Pool({
	user: "rgutierreza",
	host: "10.10.10.44",
	password: "b8QLYI9R71Kb",
	database: "db_transcripcion",
	port: "5422",
});
// Server MJ
const con = new Pool({
	user: "sinna",
	host: "137.184.232.160",
	password: "sinna2023",
	database: "sinna",
	port: "5432",
});*/
// BD Ivan
const con = new Pool({
	user: "sinna",
	host: "137.184.232.160",
	password: "sinna2023",
	database: "sinna",
	port: "5444",
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
