const { Pool } = require('pg');

// Serverless-compatible connection pool
// Vercel serverless functions are short-lived, so we need:
// 1. Small pool size (or no pool at all)
// 2. Connection timeout
// 3. idleTimeoutMillis for quick cleanup

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 1, // Single connection for serverless
    idleTimeoutMillis: 5000, // Close idle connections quickly
    connectionTimeoutMillis: 10000, // 10s connection timeout
});

module.exports = pool;
