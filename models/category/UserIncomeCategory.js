const { Schema, model } = require("mongoose");

const UserIncomeCategory = new Schema({
  value: { type: String },
});
module.exports = model("UserIncomeCategory", UserIncomeCategory);
