import pkg from "mongoose";
import bcrypt from "bcryptjs";

const { model, Schema } = pkg;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: String,
  email: { type: String, unique: true, required: true },
  password: String,
  created_on: { type: Date, default: Date.now, required: true },
  modified_on: { type: Date, default: Date.now, required: true },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

userSchema.index({ "$**": "text" });

export default model("User", userSchema);
