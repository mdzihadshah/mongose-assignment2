import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

router.post('/users', userControllers.createUser);
router.get('/users', userControllers.getAllUsers);
router.get('/users/:userId', userControllers.getSingleUser);
router.put('/users/:userId', userControllers.userUpdate);
router.delete('/users/:userId', userControllers.userDelete);
router.put('/users/:userId/orders', userControllers.createOrderUser);
router.get('/users/:userId/orders', userControllers.getAllUserOrders);
router.get(
  '/users/:userId/orders/total-price',
  userControllers.getTotalOrderPrice,
);

export const userRoute = router;
