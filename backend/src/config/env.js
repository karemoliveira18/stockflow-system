require('dotenv').config();

module.exports = {
  port: Number(process.env.PORT || 4000),
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET || 'stockflow-secret-dev',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
};
