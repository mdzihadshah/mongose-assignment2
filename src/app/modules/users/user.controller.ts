import { Request, Response } from 'express';
import { userServices } from './user.services';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const result = await userServices.createUserIntoDB(user);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
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

export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser: userUpdate,
  userDelete,
};
