import { Router, Request, Response } from 'express';
import linkModel from '../models/links';

const router = Router();

// add a new link
router.post('/add', async (req: Request, res: Response) => {
  try {
    const { url, modifiedUrl } = req.body;

    const newLink = await linkModel.create({
      url,
      modifiedUrl
    });

    res.status(201).json(newLink);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// get url by modifiedUrl
router.get('/get/:link', async (req: Request, res: Response) => {
  try {
    const link = await linkModel.findOne({ modifiedUrl: req.params.link });

    if (!link) {
      res.status(404).json({ message: 'Link not found' });
      return;
    }

    res.status(200).json(link);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

export default router;