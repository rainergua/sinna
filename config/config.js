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
});*/

const con = new Pool({
	user: "postgres",
	host: "localhost",
	password: "12345678",
	database: "postgres",
	port: "5433",
});
module.exports = con;