import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { success } from "../utils/responseCodes.js";
import { assignJWTToken } from "./Auth.js";

export const saveNewAccount = async (firstName, lastName, email, password) => {
  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
  });
  await newUser.save();
  return { success: true, message: "Account SuccessFully Created" };
};

export const authenticateSignIn = async (user, password) => {
  if (!user) {
    return success({
      success: false,
      errorField: "email",
    });
  } else {
    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      return success({
        success: false,
        errorField: "password",
      });
    } else {
      const token = await assignJWTToken({
        id: user.id,
        email: user.email,
      });

      return success({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: token,
        success: true,
      });
    }
  }
};

export const searchCustomers = async (email) => {
  const users = await User.find({
    email: { $regex: email, $options: "i" },
  });
  return users;
};

export const findCustomer = async (email) => {
  const val = `^${email}$`;

  const user = await User.findOne({
    email: { $regex: val, $options: "i" },
  });
  return user;
};
