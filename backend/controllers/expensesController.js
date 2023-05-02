import Expense from "../models/Expense.js";

async function getAllExpenses(req, res) {
  const userId = req.user._id;

  try {
    const expenses = await Expense.find({ user: userId, archived: false });

    return res.json({ expenses });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function createExpense(req, res) {
  const userId = req.user._id;

  const { name, date, amount, notes, category } = req.body;

  const expense = new Expense({
    name,
    date,
    amount,
    notes,
    category,
    user: userId,
  });

  try {
    await expense.save();

    return res.json({ expense });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function updateExpense(req, res) {
  const userId = req.user._id;

  const { id } = req.params;
  const { name, date, amount, notes, category } = req.body;

  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: id, user: userId },
      { name, date, amount, notes, category },
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.json({ expense });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteExpense(req, res) {
  const userId = req.user._id;

  const { id } = req.params;

  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: id, user: userId },
      { archived: true },
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.json({ expense });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export default {
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
};
