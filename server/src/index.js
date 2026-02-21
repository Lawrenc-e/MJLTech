import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import env from './config/env.js';
import authMiddleware from './middleware/auth.js';
import authRoutes from './routes/auth.js';
import projectsRoutes from './routes/projects.js';
import tasksRoutes from './routes/tasks.js';
import healthRoutes from './routes/health.js';

const app = express();

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(
  cors({
    origin: env.corsOrigin,
    credentials: true
  })
);
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

app.use(`${env.apiPrefix}/health`, healthRoutes);
app.use(`${env.apiPrefix}/auth`, authRoutes);

if (env.allowUnauthenticatedReads) {
  app.use(`${env.apiPrefix}/projects`, projectsRoutes);
  app.use(`${env.apiPrefix}/tasks`, tasksRoutes);
} else {
  app.use(`${env.apiPrefix}/projects`, authMiddleware, projectsRoutes);
  app.use(`${env.apiPrefix}/tasks`, authMiddleware, tasksRoutes);
}

app.use((req, res) => {
  res.status(404).json({ message: 'Not found.' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error.' });
});

app.listen(env.port, () => {
  console.log(`API listening on port ${env.port}`);
});
