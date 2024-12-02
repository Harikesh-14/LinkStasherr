import { Router, Request, Response } from 'express';
import cookieParser from "cookie-parser";
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import customLinkModel from '../models/custom-link';

const router = Router();
const secret = process.env.JWT_SECRET as string;

router.use(cookieParser());

interface CustomJwtPayloadLink extends JwtPayload {
  id: string;
  url: string;
  modifiedUrl: string;
  click: number;
}

// add a new custom link
router.post('/add', async (req: Request, res: Response) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      res.status(401).json({ message: 'Token not found' });
      return;
    }

    jwt.verify(token, secret, {}, async (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const { url, modifiedUrl } = req.body;

      if (!url || !modifiedUrl) {
        res.status(400).json({ message: 'Please enter both original and custom URL' });
        return;
      }
      const info = decoded as CustomJwtPayloadLink;
      const newCustomLink = await customLinkModel.create({
        url,
        modifiedUrl,
        user: info.id,
      });

      res.status(201).json(newCustomLink);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// get all custom links by user id
router.get('/get-all/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const customLinks = await customLinkModel.find({ userId });

    res.status(200).json(customLinks);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;