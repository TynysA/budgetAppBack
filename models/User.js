const { Schema, model } = require("mongoose");

const User = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: [{ type: String, ref: "Role" }],
  avatar: { type: String, required: false },
  userExpenseCategories: [{ type: String, ref: "UserExpenseCategory" }],
  userIncomeCategories: [{ type: String, ref: "UserIncomeCategory" }],
});

module.exports = model("User", User);
