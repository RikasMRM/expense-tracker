import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  notes: String,
  category: {
    type: String,
    enum: ["Transportation", "Rent", "Food", "Utilities", "Entertainment"],
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  archived: {
    type: Boolean,
    default: false,
  },
});

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
