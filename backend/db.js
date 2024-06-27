const {Client} = require('pg');

let DB_URI;

/* Determines which database is being used based
   on process.env.NODE_ENV */
if(process.env.NODE_ENV === 'test'){
    DB_URI = "postgresql:///braniac_test";
}
else{ 
    DB_URI = process.env.DATABASE_URL || "postgresql:///brainiac"
};

let db = new Client({connectionString: DB_URI})
db.connect();

module.exports = db;