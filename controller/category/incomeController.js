const IncomeCategory = require("../../models/category/IncomeCategory");
const UserIncomeCategory = require("../../models/category/UserIncomeCategory");
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

class IncomeController {
  async addIncomeCategory(req, res) {
    try {
      res.json("success");
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
    }
  }

  async addUserIncomeCategories(req, res) {
    try {
      const userId = req.user.id;
      const { categoryname } = req.body;
      console.log(categoryname);
      console.log(typeof categoryname);
      const userIncomeCategory = new UserIncomeCategory({
        user: userId,
        value: categoryname,
      });
      //   await userIncomeCategory.save();
      const user = await User.findByIdAndUpdate(
        userId,
        { $push: { userIncomeCategories: userIncomeCategory.value } },
        { new: true }
      );

      res.json(req.user);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Some error" });
    }
  }

  async getIncomeCategories(req, res) {
    try {
      const income = await IncomeCategory.find();
      const userId = req.user.id;
      const user = await User.findOne({ _id: userId });
      let temp = [];
      for (let i = 0; i < user.userIncomeCategories.length; i++) {
        temp.push({ value: user.userIncomeCategories[i] });
      }
      const userIncome = temp;
      const result = income.concat(userIncome);
      res.json(result);
    } catch (e) {
      console.log(e);
    }
  }
  async deleteUserIncomeCategory(req, res) {
    try {
      const userId = req.user.id;
      const user = await User.findOne({ _id: userId });
      const deleteCategory = req.body.categoryname;
      //console.log(user.userIncomeCategories);
      let userIncomeCategories = user.userIncomeCategories;
      console.log(userIncomeCategories);
      for (let i = 0; i < userIncomeCategories.length; i++) {
        let element = userIncomeCategories[i];
        if (deleteCategory == element) {
          let spliced = userIncomeCategories.splice(i, 1);
          break;
        }
      }
      const test = await User.findOneAndUpdate(
        { _id: userId },
        { userIncomeCategories: userIncomeCategories },
        { new: true }
      );
      res.json(req.body);
    } catch (e) {
      console.log(e);
    }
  }
  async getUserIncomeCategories(req, res) {
    try {
      const userId = req.user.id;
      const user = await User.findOne({ _id: userId });
      let temp = [];
      for (let i = 0; i < user.userIncomeCategories.length; i++) {
        temp.push({ value: user.userIncomeCategories[i] });
      }
      const userIncome = temp;
      res.json(userIncome);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new IncomeController();
