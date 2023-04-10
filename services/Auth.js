import JWT from "jsonwebtoken";

export const assignJWTToken = async (signObj, expiresIn = "1d") => {
  const token = JWT.sign(signObj, process.env.JWT_SECRET, {
    expiresIn,
  });
  return token;
};

export const verifyToken = (token) => {
  try {
    if (token) {
      const decoded = JWT.verify(token, process.env.JWT_SECRET);

      return { status: true, decoded, token: token };
    }
    return false;
  } catch {
    return false;
  }
};
