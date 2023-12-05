import { User } from './user.model';
import { IUser } from './users/user.interface';

const createUserIntoDB = async (user: IUser) => {
  const result = await User.create(user);
  return result;
};
const getAllUsers = async () => {
  const result = await User.find().select({
    userName: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });
  return result;
};

const getSingleUser = async (userId: number) => {
  const result = await User.findOne({ userId });

  return result;
};
const userUpdate = async (userId: number, updateData: Partial<IUser>) => {
  const result = await User.findOneAndUpdate({ userId }, updateData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteUser = async (userId: number) => {
  const result = await User.findOneAndDelete({ userId });
  return result;
};

export const userServices = {
  createUserIntoDB,
  getAllUsers,
  getSingleUser,
  userUpdate,
  deleteUser,
};
