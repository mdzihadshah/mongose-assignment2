import { Request, Response } from 'express';
import { userServices } from './user.services';
import {
  userOrderValidationSchema,
  userValidationSchema,
} from './user.validation';
// create user
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const parseData = userValidationSchema.parse(user);
    const result = await userServices.createUserIntoDB(parseData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      code: 500,
      message: 'Something went wrong!',
      error: err,
    });
  }
};
// get all user data
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsers();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    });
  }
};
// get single user data
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await userServices.getSingleUser(userId);

    if (!user)
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    });
  }
};
//update user
const userUpdate = async (req: Request, res: Response) => {
  try {
    const updateData = req.body;
    const userId = parseInt(req.params.userId);
    const user = await userServices.getSingleUser(userId);

    if (!user)
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });

    const updatedUser = await userServices.userUpdate(userId, updateData);

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    });
  }
};
// deleted user
const userDelete = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await userServices.getSingleUser(userId);

    if (!user)
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });

    await userServices.deleteUser(userId);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    });
  }
};

// create order
const createOrderUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  try {
    const userValidData = userOrderValidationSchema.parse(req.body);
    const user = await userServices.getSingleUser(userId);

    if (!user)
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });

    await userServices.createOrder(userId, userValidData);
    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    });
  }
};

// get all data user order list
const getAllUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const userOrderData = await userServices.getSingleUser(userId);

    if (!userOrderData)
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    const result = await userServices.getAllUserOrders(userId);
    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error,
    });
  }
};

export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  userUpdate,
  userDelete,
  createOrderUser,
  getAllUserOrders
};
