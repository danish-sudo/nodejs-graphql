import {
  authenticateSignIn,
  findCustomer,
  findUser,
  saveNewAccount,
  searchCustomers,
} from "../../services/User.js";
import { success } from "../../utils/responseCodes.js";

export default {
  Query: {
    searchCustomerByEmail: async (_, { email }, context) => {
      const search = await searchCustomers(email);
      return success(search);
    },
  },
  Mutation: {
    saveUser: async (_, { firstName, lastName, email, password }, context) => {
      const user = await findUser(email);
      if (!user) {
        const response = await saveNewAccount(
          firstName,
          lastName,
          email,
          password
        );

        return success(response);
      } else {
        return success({
          success: false,
          errorField: "email",
          message: "User Already Exists",
        });
      }
    },

    async signInAuth(_, { email, password }) {
      const user = await findCustomer(email);
      return await authenticateSignIn(user, password);
    },
  },
};
