const { Schema, model } = require("mongoose");

const userExpenseCategory = new Schema({
  value: { type: String },
});
module.exports = model("UserExpenseCategory", userExpenseCategory);
