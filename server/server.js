import express from 'express';
import cors from 'cors';
import imageRouter from './routes/imageRouter.js';
import * as dotenv from 'dotenv';
import errorHandler from './middlewares/error-handler.js';
import notFound from './middlewares/not-found.js';
const app = express();
app.use(cors());
dotenv.config();

// routes
app.get('/', (req, res) => {
  res.send(
    '<h1>MsApp Test</h1><h5>By Daniel Levi<h5><a href="/api/image">Image route</a>'
  );
});
app.use('/api/images', imageRouter);

// middelware
app.use(errorHandler); // 500
app.use(notFound); // 404
app.use(express.json());

const port = process.env.PORT || 5002;

// Start server
const start = async () => {
  try {
    app.listen(port, console.log(`Server is listening on ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
