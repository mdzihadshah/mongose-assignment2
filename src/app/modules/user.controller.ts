import { Request, Response } from 'express';
import { createUserServices } from './user.services';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const result = await createUserServices.createUserIntoDB(user);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const userControllers = {
  createUser,
};
