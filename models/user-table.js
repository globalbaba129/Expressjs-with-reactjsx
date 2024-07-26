import mongoose, { Schema, model } from "mongoose";

// user schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
      salary: {
        type: Number,
        required: true,
      },
   
      password: {
        type: String,
        required: true,
      },
      role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
      },
});
const usertab = model("usertab", userSchema);
export default usertab;