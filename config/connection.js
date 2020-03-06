var mysql = requrie("mysql");
var connection;
if(process.env.JAWSDB_URL){
    connection = mysql.createConnection(process.env.JAWSDB_URL);

} else {
    connection = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"Antares28",
        database:"chess_db"
    });
};
connection.connect();
module.exports = connection;