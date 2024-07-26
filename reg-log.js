import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./controller/controllers.js";

const app = express();
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tuesday')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


app.use(express.json());
app.use(cors());


// Register routes
app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});