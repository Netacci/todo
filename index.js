import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import todoRoutes from './todoRoute.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    `Error connecting to MongoDB: ${err}`;
  });
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/api/todos', todoRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
