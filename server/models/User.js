import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    hardskills:{
      type: String,
      required: true,
      min: 10,
      max: 100,
    },
    softskills:{
      type: String,
      required: true,
      min: 20,
      max: 100,
    },
    workexperience: {
      type: String,
      required: true,
      min: 1,
      max: 10,
    },
    education: {
      type: String,
      required: true,
      min: 10,
      max: 200
    },
    hobbies:{
      type: String,
      required: true,
      min: 10,
      max: 100,
    },
    about:{
      type: String,
      required: true,
      min: 20,
      max: 300,
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
