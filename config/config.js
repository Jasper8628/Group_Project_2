module.exports = {
<<<<<<< HEAD
  "development": {
    "username": "root",
    "password": null,
    "database": "chess_db",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }
}
=======
    "development": {
        "username": "root",
        "password": "Antares28",
        "database": "chess",
        "host": "localhost",
        "dialect": "mysql"
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "use_env_variable": "JAWSDB_URL",
        "username": process.env.MYSQL_USER,
        "password": process.env.MYSQL_KEY,
        "database": process.env.MYSQL_DBNAME,
        "host": process.env.MYSQL_HOST,
        "dialect": "mysql"
    }
}
>>>>>>> 622ec991174dcbaa7e2b8d7906f43ec5f13fff67
