import mongoose, { Schema, model } from "mongoose";

// Define the role schema
const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Role = model('Role', roleSchema);
export default Role;