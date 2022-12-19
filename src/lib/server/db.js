import pkg from 'pg';
const { Pool } = pkg;
const pool = new Pool({
	host: '',
	port: 3502,
	user: 'postgres',
	database: 'unipet',
	password: 'inacap'
});

export const query = (text, params, callback) => {
	return pool.query(text, params, callback);
};
