export const success = (docs) => {
  return { docs, status: { success: true } };
};

export const InternalError = () => {
  return {
    status: { success: false, code: 500, message: "Internal Server Error" },
  };
};

export const AccessDenied = () => {
  return {
    status: { success: false, code: 403, message: "Unauthorized" },
  };
};
