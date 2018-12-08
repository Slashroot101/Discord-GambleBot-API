const { Pool } = require('pg');
const config = require('../../config');
const pool = new Pool(config.db);


exports.query = (text, params) => pool.query(text, params);
