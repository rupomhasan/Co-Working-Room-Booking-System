import mongoose, { Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcryptjs from "bcryptjs";
import config from "../../config";
export const crateUserSchema = new Schema<TUser>({
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String, required: [true, "Email is required"], unique: true },
  password: {
    type: String,
    required: true,
    select: 0,
  },
  address: { type: String, required: [true, "Address is required"], select: 0 },
  phone: { type: String, required: [true, "ContactNumber is required"] },
  role: { type: String, default: "user" },
});
crateUserSchema.pre("save", async function (next) {
  const hashedPassword = await bcryptjs.hash(
    this.password,
    Number(config.salt_rounds),
  );
  this.password = hashedPassword;
  next();
});
crateUserSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});
export const User = mongoose.model("User", crateUserSchema);
