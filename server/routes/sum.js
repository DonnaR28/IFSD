import express from 'express';
import { calculateSum } from '../controllers/sum.js';

const router = express.Router();

// Calculate sum route
router.post('/sum', calculateSum);

export default router;
