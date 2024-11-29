import express, { Request, Response, Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import linkRouter from './routes/link';
import userRouter from './routes/user';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

mongoose.connect(process.env.MONGO_URI as string).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log(error);
});

app.use('/link', linkRouter);
app.use('/user', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});