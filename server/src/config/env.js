import dotenv from 'dotenv';

dotenv.config();

const nodeEnv = process.env.NODE_ENV || 'development';
const port = Number.parseInt(process.env.PORT || '5000', 10);

const env = {
  nodeEnv,
  port: Number.isNaN(port) ? 5000 : port,
  apiPrefix: process.env.API_PREFIX || '/api/v1',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  allowUnauthenticatedReads: process.env.ALLOW_UNAUTHENTICATED_READS === 'true',
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number.parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mjltechs',
    ssl: process.env.DB_SSL === 'true'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'dev_secret_change_me',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  }
};

if (!process.env.JWT_SECRET && nodeEnv === 'production') {
  throw new Error('JWT_SECRET must be set in production.');
}

export default env;
