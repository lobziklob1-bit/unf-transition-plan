const { Pool } = require('pg');

// Serverless-compatible connection pool
// Vercel serverless functions are short-lived, so we need:
// 1. Small pool size (or no pool at all)
// 2. Connection timeout
// 3. idleTimeoutMillis for quick cleanup

const connectionString = process.env.DATABASE_URL;
const isRemoteDatabase = Boolean(connectionString && !connectionString.includes('127.0.0.1') && !connectionString.includes('localhost'));

const pool = new Pool({
    connectionString,
    ssl: isRemoteDatabase ? { rejectUnauthorized: false } : false,
    max: 1, // Single connection for serverless
    idleTimeoutMillis: 5000, // Close idle connections quickly
    connectionTimeoutMillis: 10000, // 10s connection timeout
});

module.exports = pool;
