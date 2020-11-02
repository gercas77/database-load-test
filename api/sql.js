const mysql = require('mysql2/promise');

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA,
    waitForConnections: true,
    connectionLimit: 500,
    queueLimit: 0
}
const pool = mysql.createPool(config);

const queryById = async (id) => {
    const [rows] = await pool.query(`SELECT * FROM users WHERE id = ${id}`);
    return rows;
};

const create = async (name, age, salary) => {
    const [rows] = await pool.query(`INSERT INTO users (name, age, salary) VALUES ('${name}', '${age}', '${salary}')`);
    return rows;
};

const queryByName = async (name) => {
    const [rows] = await pool.query(`SELECT * FROM users WHERE name = '${name}'`);
    return rows;
};

const queryBySalaryRange = async (from, to) => {
    const [rows] = await pool.query(`SELECT * FROM users WHERE salary BETWEEN ${from} AND ${to}`);
    return rows;
};

module.exports = { queryById, create, queryByName, queryBySalaryRange };