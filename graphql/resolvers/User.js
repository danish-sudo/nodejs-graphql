import { combineResolvers } from "graphql-resolvers";

import {
  authenticateSignIn,
  findCustomer,
  saveNewAccount,
  searchCustomers,
} from "../../services/User.js";
import { success } from "../../utils/responseCodes.js";
import { authMiddleWare } from "../../middlewares/auth.js";

export default {
  Query: {
    privateCall: combineResolvers(authMiddleWare, async (_, {}, context) => {
      return "Yes, it's working";
    }),

    searchCustomerByEmail: async (_, {}, context) => {
      const search = await searchCustomers("idanishsiddique@gmail.com");
      return success(search);
    },
  },
  Mutation: {
    saveUser: async (_, { firstName, lastName, email, password }, context) => {
      const user = await findCustomer(email);
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
