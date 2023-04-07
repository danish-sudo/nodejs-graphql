import pkg from "mongoose";
const { model, Schema } = pkg;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: String,
  email: { type: String, unique: true, required: true },
  password: String,
  created_on: { type: Date, default: Date.now, required: true },
  modified_on: { type: Date, default: Date.now, required: true },
});
userSchema.index({ "$**": "text" });

export default model("User", userSchema);
