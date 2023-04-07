import JWT from "jsonwebtoken";

import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import User from "../models/User.js";
import { success } from "../utils/responseCodes.js";

export const saveNewAccount = async (firstName, lastName, email, password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
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
      // check if verified
      const token = jsonwebtoken.sign(
        {
          id: user.id,
          email: user.email,
          permissionLevel: user.permissionLevel,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
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

export const verifyResetToken = async (token) => {
  const decoded = JWT.verify(token, process.env.JWT_SECRET);
  const user = await findCustomer(decoded.email);
  if (user) {
    return true;
  } else {
    return false;
  }
};

export const findUser = async (email) => {
  const user = await User.findOne({ email: email });
  return user;
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
