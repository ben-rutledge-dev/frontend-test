import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { router } from './routes';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Delay middleware - adds 100ms delay to all responses to simulate network latency
app.use((req: Request, res: Response, next: NextFunction) => {
  setTimeout(next, 100);
});

// Routes
app.use('/', router);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Mock API running on http://localhost:${PORT}`);
});

// Graceful shutdown handler
const shutdown = () => {
  console.log('\nReceived shutdown signal, closing server gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
  
  // Force shutdown after 1 second
  setTimeout(() => {
    console.error('Forced shutdown after timeout');
    process.exit(1);
  }, 1000);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
