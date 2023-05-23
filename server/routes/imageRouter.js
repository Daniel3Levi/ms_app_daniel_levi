import express from 'express';
import { getImages } from '../controllers/image.js';

const router = express.Router();

router.route('/').get(getImages);

export default router;
