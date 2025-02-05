const mysql = require('mysql2/promise');

// Create the connection pool
const pool = mysql.createPool({
  host: "tunely-db.c5usqgcyg57d.ca-central-1.rds.amazonaws.com",
  user: "admin",
  password: "BlueSky2025!",
  database: "tunely-db",
  connectionLimit: 10 
});

const db = {
  
  query: async (sql, params) => {
    let connection;
    try {
      connection = await pool.getConnection(); // Get a connection from the pool
      const [results] = await connection.execute(sql, params); // Execute the query
      return results; // Return the query results
    } catch (err) {
      console.error('Error during query execution:', err); // Log any error that occurs
      throw err; // Rethrow error for further handling if needed
    } finally {
      if (connection) {
        connection.release(); // Always release the connection back to the pool
      }
    }
  }
};

module.exports = db;
