import { Router, Request, Response } from 'express';
import linkModel from '../models/links';
import authMiddleware from '../middlewares/authenticate';

const router = Router();

// add a new link
router.post('/add', authMiddleware, async (req: Request & { user?: any }, res: Response) => {
  try {
    const { url, modifiedUrl } = req.body;

    const newLink = await linkModel.create({
      url,
      modifiedUrl,
      user: req.user ? req.user.id : null,
      isGuestLink: !req.user
    });

    res.status(201).json(newLink);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// get all links
router.get('/get-all', authMiddleware, async (req: Request & { user?: any }, res: Response) => {
  try {
    const links = await linkModel.find({ user: req.user ? req.user.id : null });

    res.status(200).json(links);
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

// get a link by id
router.get('/get/:id', authMiddleware, async (req: Request & { user?: any }, res: Response) => {
  try {
    const link = await linkModel.findOne({ _id: req.params.id, user: req.user ? req.user.id : null });

    if (!link) {
      res.status(404).json({ message: 'Link not found' });
      return;
    }

    res.status(200).json(link);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// delete a link by id
router.delete('/delete/:id', authMiddleware, async (req: Request & { user?: any }, res: Response) => {
  try {
    const link = await linkModel.findOne({ _id: req.params.id, user: req.user ? req.user.id : null });

    if (!link) {
      res.status(404).json({ message: 'Link not found' });
      return;
    }

    await linkModel.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: 'Link deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;