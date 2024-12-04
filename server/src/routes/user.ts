import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import cookieParser from "cookie-parser";
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import userModel from '../models/user';
import authMiddleware from '../middlewares/authenticate';

const router = Router();
const salt = bcrypt.genSaltSync(10);
const secret = process.env.JWT_SECRET as string;

router.use(cookieParser());

interface CustomJwtPayload extends JwtPayload {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

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
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const isExistingUser = await userModel.findOne({ email });

    if (!isExistingUser) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const passOk = bcrypt.compareSync(password, isExistingUser.password);

    if (!passOk) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const tokenPayload = {
      id: isExistingUser._id,
      firstName: isExistingUser.firstName,
      lastName: isExistingUser.lastName,
      email: isExistingUser.email,
      message: "User logged in successfully",
    };

    const token = jwt.sign(tokenPayload, secret, {});
    res.cookie("token", token, { httpOnly: true }).json(tokenPayload);
  } catch (err) {
    console.error('Internal server error:', err);
    res.status(500).json({ message: "Internal server error" });
  }
});


// get user profile
router.get('/profile', authMiddleware, async (req: Request & { user?: any }, res: Response) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  res.json(req.user);
});

// to check if the user is logged in
router.get('/check-login', async (req: Request, res: Response) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(401).json({
      authenticated: false,
      message: 'Unauthorized'
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret);
    res.json({
      authenticated: true,
      user: decoded
    });
  } catch (error) {
    res.status(401).json({
      authenticated: false,
      message: 'Invalid or expired token'
    });
  }
});

// update first name
router.put('/update/firstName', async (req: Request, res: Response) => {
  const { firstName } = req.body;
  const { token } = req.cookies;

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  jwt.verify(token, secret, {}, async (err, decoded) => {
    if (err) {
      console.error('JWT verification error:', err);
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const info = decoded as CustomJwtPayload;
      const updatedUser = await userModel.findByIdAndUpdate(info.id, { firstName }, { new: true });

      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(updatedUser);
    } catch (error) {
      console.error('Internal server error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  })
});

// update last name
router.put('/update/lastName', async (req: Request, res: Response) => {
  const { lastName } = req.body;
  const { token } = req.cookies;

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  jwt.verify(token, secret, {}, async (err, decoded) => {
    if (err) {
      console.error('JWT verification error:', err);
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const info = decoded as CustomJwtPayload;
      const updatedUser = await userModel.findByIdAndUpdate(info.id, { lastName }, { new: true });

      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(updatedUser);
    } catch (error) {
      console.error('Internal server error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  })
});

// update email
router.put('/update/email', async (req: Request, res: Response) => {
  const { email } = req.body;
  const { token } = req.cookies;

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  jwt.verify(token, secret, {}, async (err, decoded) => {
    if (err) {
      console.error('JWT verification error:', err);
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const info = decoded as CustomJwtPayload;
      const updatedUser = await userModel.findByIdAndUpdate(info.id, { email }, { new: true });

      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(updatedUser);
    } catch (error) {
      console.error('Internal server error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  })
});

// update password
router.put('/update/password', async (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  const { token } = req.cookies;

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  jwt.verify(token, secret, {}, async (err, decoded) => {
    if (err) {
      console.error('JWT verification error:', err);
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const info = decoded as CustomJwtPayload;
      const user = await userModel.findById(info.id);

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      const passOk = bcrypt.compareSync(currentPassword, user.password);

      if (!passOk) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
      }

      const hashedPassword = bcrypt.hashSync(newPassword, salt);
      const updatedUser = await userModel.findByIdAndUpdate(info.id, { password: hashedPassword }, { new: true });

      res.json(updatedUser);
    } catch (error) {
      console.error('Internal server error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  })
});

// logout
router.post('/logout', async (req: Request, res: Response) => {
  res.clearCookie('token').json({ message: 'User logged out successfully' });
});

export default router;