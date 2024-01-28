import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import Job from '../models/jobModel.js';

export const getCurrentUser = async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getApplicationStats = async (req, res, next) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();

  res.status(StatusCodes.OK).json({ users, jobs });
};

export const updateUser = async (req, res, next) => {
  // console.log(req.file);
  // In case we added in req.body password we want not to sent that
  const obj = { ...req.body };
  delete obj.password;
  console.log(obj);

  const updateUser = await User.findOneAndUpdate(req.user.userId, obj, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ updateUser });
};
