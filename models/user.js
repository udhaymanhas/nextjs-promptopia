import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});

/**
 * In Next, as this is run on each request, due to serverless nature, we need to check if model is already registered
 */
const User = models.User || model("User", UserSchema);
export default User;

/**
 * Regular express, always on , always available server
 *
 * const User = model("User", UserSchema);
 * export default User;
 */
