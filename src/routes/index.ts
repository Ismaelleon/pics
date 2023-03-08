import { Router, Request, Response } from 'express';
import { signUp } from '../controllers/auth';
import mongoose from 'mongoose';

const router = Router();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pics')

router.post('/sign-up', signUp);

export default router;
