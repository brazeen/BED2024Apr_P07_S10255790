module.exports = {
    user: "booksapi_user",
    password: "books",
    server: "localhost", 
    database: "bed_db",
    trustServerCertificate: true,
    options: {
    port: 1433, // Default SQL Server port
    connectionTimeout: 60000, // Connection timeout in milliseconds
  },
}