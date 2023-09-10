const { Schema, model } = require("mongoose");

const expenseCategorySchema = new Schema({
  value: { type: String, unique: true },
});
module.exports = model('ExpenseCategory', expenseCategorySchema);

