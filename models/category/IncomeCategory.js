const { Schema, model } = require("mongoose");

const incomeCategorySchema = new Schema({
  value: { type: String, unique: true },
});
module.exports = model('IncomeCategory', incomeCategorySchema);
