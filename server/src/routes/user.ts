import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import userModel from '../models/user';
import authMiddleware from '../middlewares/authenticate';

const router = Router();
const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRET_KEY as string;

router.use(cookieParser());

// add a new user
router.post('/register', async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// login
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const isExistingUser = await userModel.findOne({ email })

  if (!isExistingUser) {
    res.status(400).json({ message: 'User does not exist' });
    return;
  }

  const isValidPassword = bcrypt.compareSync(password, isExistingUser.password);

  if (!isValidPassword) {
    res.status(400).json({ message: 'Invalid password' });
    return;
  }

  const tokenPayload = {
    id: isExistingUser._id,
    firstName: isExistingUser.firstName,
    lastName: isExistingUser.lastName,
    email: isExistingUser.email,
    message: 'User logged in successfully'
  };

  try {
    const token = jwt.sign(tokenPayload, secret, {});
    res.cookie('token', token, { httpOnly: true, secure: true }).json(tokenPayload);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// get user profile
router.get('/profile', authMiddleware, async (req: Request & { user?: any }, res: Response) => {
  try {
    const user = await userModel.findOne({ _id: req.user ? req.user.id : null });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// logout
router.post('/logout', async (req: Request, res: Response) => {
  res.clearCookie('token').json({ message: 'User logged out successfully' });
});

export default router;