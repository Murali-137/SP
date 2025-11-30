const { Pool } = require('pg');

const productPool = new Pool({
    user: "user_1",
    host: "localhost",
    database: "senra",
    password: "PASS",
    port: 5432,
})

module.exports = productPool;