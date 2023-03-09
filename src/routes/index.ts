import { Router, Request, Response } from 'express';
import { signUp, logIn } from '../controllers/auth';
import mongoose from 'mongoose';

const router = Router();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pics')

router.post('/sign-up', signUp);
router.post('/log-in', logIn);

export default router;
