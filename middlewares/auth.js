import { skip } from "graphql-resolvers";
import { verifyToken } from "../services/Auth.js";
import { AccessDenied } from "../utils/responseCodes.js";

export const authMiddleWare = (parent, args, { auth }) => {
  if (verifyToken(auth)) {
    return skip;
  } else {
    return AccessDenied();
  }
};
