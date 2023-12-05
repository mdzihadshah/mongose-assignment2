import { User } from './user.model';
import { IUser } from './users/user.interface';

const createUserIntoDB = async (user: IUser) => {
  const result = await User.create(user);
  return result;
};
export const createUserServices = {
  createUserIntoDB,
};
