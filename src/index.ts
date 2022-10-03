import express, { Application } from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8000;

// set routes
app.use('/', routes);

mongoose
  .connect(process.env.DATABASE_URI as string)
  .then(() => {
    console.log('Connected to mongodb');
    app.listen(PORT, (): void => {
      console.log(`Server Running here 👉 http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    throw new Error(err);
  });
