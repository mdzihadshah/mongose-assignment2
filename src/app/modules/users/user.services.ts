import { User } from './user.model';
import { IOrder, IUser } from './user.interface';

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
// save order
const createOrder = async (userId: number, orderData: IOrder) => {
  const result = await User.findOneAndUpdate(
    { userId },
    {
      $push: {
        orders: orderData,
      },
    },
  );
  return result;
};
//get all user data
const getAllUserOrders = async (userId: number) => {
  const result = await User.findOne(
    { userId },
    { 'orders.productName': 1, 'orders.price': 1, 'orders.quantity':1 },
  );
  return result;
};

export const userServices = {
  createUserIntoDB,
  getAllUsers,
  getSingleUser,
  userUpdate,
  deleteUser,
  createOrder,
  getAllUserOrders,
};
