const User = require("../models/User");
const Income = require("../models/Income");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secret } = require("../config");
const IncomeCategory = require("../models/category/IncomeCategory");
const UserIncomeCategory = require("../models/category/UserIncomeCategory");

class incomeController {
  async addIncome(req, res) {
    try {
      const userId = req.user.id;
      const { title, category, amount, description } = req.body;

      const income = new Income({
        user: userId,
        title: title,
        date: new Date(),
        amount: amount,
        category: [category],
        description: description,
      });
      await income.save();
      res.json(income);
    } catch (e) {
      console.log(e);
    }
  }
  async getIncome(req, res) {
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
  async updateIncome(req, res) {
    try {
      console.log("req.body");
      console.log(req.body);
      console.log("req.body end");
      const actionId = req.body.actionId;
      //findOneAndUpdate
      const { title, category, amount, description, date } = req.body;
      const test = await Income.findOneAndUpdate(
        { _id: actionId },
        {
          title: title,
          category:category,
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
  async deleteIncome(req, res) {
    try {
      const incomeId = req.params.incomeId;
      const deletedIncome = await Income.findByIdAndDelete(incomeId);

      if (!deletedIncome) {
        return res.status(404).json({ message: "Income not found" });
      }

      res.json({ message: "Income deleted successfully", deletedIncome });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getAllIncomes(req, res) {
    try {
      const userId = req.user.id;
      const incomes = await Income.find({ user: userId });
      res.json(incomes);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new incomeController();
