const User = require("../models/User");
const Expense = require("../models/Expense");
const ExpenseCategory = require("../models/category/ExpenseCategory");
const UserExpenseCategory = require("../models/category/UserExpenseCategory");

class expenseController {
  async addExpense(req, res) {
    try {
      const userId = req.user.id;
      const { title, category, amount, description } = req.body;

      const expense = new Expense({
        user: userId,
        title: title,
        date: new Date(),
        amount: amount,
        category: [category],
        description: description,
      });
      await expense.save();
      res.json(expense);
    } catch (e) {
      console.log(e);
    }
  }
  async getExpense(req, res) {
    try {
      // const token = req.headers.authorization.split(" ")[1];
      // if (!token) {
      //   return res.status(403).json({ message: "Пользователь не авторизован" });
      // }
      // const decodedData = jwt.verify(token, secret);
      const userId = req.user.id;
      const userBudget = await Budget.findOne({ user: userId });
      if (!userBudget) {
        return res
          .status(404)
          .json({ message: "Budget not found for this user" });
      }
      res.json(userBudget);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Somthing error" });
    }
  }
  async updateExpensse(req, res) {
    try {
      console.log(req.body);
      const actionId = req.body.actionId;
      //findOneAndUpdate
      const { title, category, amount, description, date } = req.body;
      const test = await Expense.findOneAndUpdate(
        { _id: actionId },
        {
          title: title,
          category: category,
          amount: amount,
          description: description,
          date: date,
        },
        { new: true }
      );
      res.json(test);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async deleteExpense(req, res) {
    try {
      const expenseId = req.params.expenseId;
      const deletedExpense = await Expense.findByIdAndDelete(expenseId);

      if (!deletedExpense) {
        return res.status(404).json({ message: "Expense not found" });
      }

      res.json({ message: "Income deleted successfully", deletedExpense });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getAllExpense(req, res) {
    try {
      const userId = req.user.id;
      const expense = await Expense.find({ user: userId });
      res.json(expense);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new expenseController();
