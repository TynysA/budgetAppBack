const User = require("../models/User");
const Role = require("../models/Role");
const Budget = require("../models/Budget");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secret } = require("../config");
const Income = require("../models/Income");
const Expense = require("../models/Expense");

class budgetController {
  async getUserBudget(req, res) {
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
      const income = await Income.find({ user: userId });
      const expense = await Expense.find({ user: userId });
      let TempExpenses = 0;
      let TempIncome = 0;

      for (let i = 0; i < expense.length; i++) {
        TempExpenses = TempExpenses + expense[i].amount;
      }
      for (let j = 0; j < income.length; j++) {
        TempIncome = TempIncome + income[j].amount;
      }

      const tempAmount = TempIncome - TempExpenses;
      const test = await Budget.findOneAndUpdate(
        { user: userId },
        { amount: tempAmount },
        { new: true }
      );

      res.json(test);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Somthing error" });
    }
  }
  async getBudgets(req, res) {
    try {
      const budgets = await Budget.find();
      res.json(budgets);
    } catch (e) {
      console.log(e);
    }
  }
  async getAllActions(req, res) {
    try {
      const userId = req.user.id;
      const incomes = await Income.find({ user: userId }).sort({
        dateField: -1,
      });
      const expenses = await Expense.find({ user: userId }).sort({
        dateField: -1,
      });
      const combinedData = [...incomes, ...expenses];

      combinedData.sort((a, b) => b.date - a.date);

      return res.json({ combinedData });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new budgetController();
