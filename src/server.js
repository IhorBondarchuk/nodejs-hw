import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';
import { setServers } from 'node:dns/promises';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(logger);
app.use(express.json());
app.use(cors());

app.use(notesRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

setServers(['1.1.1.1', '8.8.8.8']);

await connectMongoDB();

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server is running on port ${PORT}`);
});
