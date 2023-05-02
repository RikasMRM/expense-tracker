import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { authMiddleware, corsMiddleware } from "./utils/middleware.js";
import authController from "./controllers/authController.js";
import expensesController from "./controllers/expensesController.js";
import profileController from "./controllers/profileController.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(corsMiddleware);

app.post("/api/register", authController.register);
app.post("/api/login", authController.login);

app.use(authMiddleware);

app.get("/api/expenses", expensesController.getAllExpenses);
app.post("/api/expenses", expensesController.createExpense);
app.put("/api/expenses/:id", expensesController.updateExpense);
app.delete("/api/expenses/:id", expensesController.deleteExpense);

app.get("/api/profile", profileController.getProfile);
app.put("/api/profile", profileController.updateProfile);

const PORT = process.env.PORT || 6001;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} not connected`));
