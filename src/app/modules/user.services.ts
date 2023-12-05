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
export const userServices = {
  createUserIntoDB,
  getAllUsers,
};
