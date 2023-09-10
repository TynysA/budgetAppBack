const ExpenseCategory = require("../../models/category/ExpenseCategory");
const UserExpenseCategory = require("../../models/category/UserExpenseCategory");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secret } = require("../../config");

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class ExpenseController {
  async addExpenseCategory(req, res) {
    try {
      const { categoryname } = req.body;
      const expense = new ExpenseCategory({
        value: categoryname,
      });
      await expense.save();
      res.json(expense);
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
    }
  }

  async addUserExpenseCategories(req, res) {
    try {
      const userId = req.user.id;
      const { categoryname } = req.body;
      console.log(categoryname);
      console.log(typeof categoryname);
      const userExpenseCategory = new UserExpenseCategory({
        user: userId,
        value: categoryname,
      });
      //  await userExpenseCategory.save();
      const user = await User.findByIdAndUpdate(
        userId,
        { $push: { userExpenseCategories: userExpenseCategory.value } },
        { new: true }
      );

      res.json(req.user);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Some error" });
    }
  }

  async getExpenseCategories(req, res) {
    try {
      const expense = await ExpenseCategory.find();
      const userId = req.user.id;
      const user = await User.findOne({ _id: userId });
      let temp = [];
      for (let i = 0; i < user.userExpenseCategories.length; i++) {
        temp.push({ value: user.userExpenseCategories[i] });
      }
      const userExpense = temp;
      const result = expense.concat(userExpense);
      res.json(result);
    } catch (e) {
      console.log(e);
    }
  }
  async getUserExpenseCategories(req, res) {
    try {
      const userId = req.user.id;
      const user = await User.findOne({ _id: userId });
      let temp = [];
      for (let i = 0; i < user.userExpenseCategories.length; i++) {
        temp.push({ value: user.userExpenseCategories[i] });
      }
      const userExpense = temp;
      res.json(userExpense);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new ExpenseController();
