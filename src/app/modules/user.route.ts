import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

router.post('/users', userControllers.createUser);
router.get('/users', userControllers.getAllUsers);

export const userRoute = router;
