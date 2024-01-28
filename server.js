import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { StatusCodes } from 'http-status-codes';

// Routes
import jobRoutes from './routes/jobRouter.js';
import authRoutes from './routes/authRouter.js';
import userRoutes from './routes/userRouter.js';

// Public
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

// Middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(path.resolve(__dirname, './public')));

app.use(express.json());
app.use(cookieParser());

// In frontend to abort CORS policy
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PUT, PATCH, DELETE'
//   );
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });
const corsOptions = {
  origin: 'http://localhost:5100',
  credentials: true,
};

app.use(cors(corsOptions));

// Test server
app.get('/api/v1/test', (req, res, next) => {
  res.json({ msg: 'test route' });
});

// Router
app.use('/api/v1/jobs', authenticateUser, jobRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', authenticateUser, userRoutes);

app.get('*', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, './public', 'index.html'));
});

// We can use now in Node try catch without using f-n IMPORTANT
// try {
//   const response = await fetch(
//     'https://www.course-api.com/react-useReducer-cart-project'
//   );
//   const cartData = await response.json();
//   console.log(cartData);
// } catch (err) {
//   console.log(err);
// }

// ERROR
app.use('*', (req, res, next) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: 'Not Found' });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (err) {
  console.log(err);
  process.exit(1);
}
