const {Client} = require('pg');

let DB_URI;

if(process.env.NODE_ENV === 'test'){
    DB_URI = "postgresql:///braniac_test";
}
else
{ DB_URI = process.env.DATABASE_URL || "postgresql://jugfpjpx:Qvra6bOpgxwQ22GSRwpfNuS-K1JivKXW@bubble.db.elephantsql.com/jugfpjpx"
};


console.log("DATABASE:", DB_URI)
let db = new Client({connectionString: DB_URI})
db.connect();

module.exports = db;