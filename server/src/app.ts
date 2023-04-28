import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const app: Application = express();

// Enable CORS
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Define API routes
app.get("/", (req, res) => {
  res.send("Hello world");
});

// Start server
const PORT = process.env.port || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
