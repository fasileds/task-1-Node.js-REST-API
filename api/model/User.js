import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  latitude: Number,
  longitude: Number,
});

const User = mongoose.model("User", userSchema);

export default User;
