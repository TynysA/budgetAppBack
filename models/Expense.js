const { Schema, model, mongoose } = require("mongoose");

const ExpenseSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 80,
    },
    amount: {
      type: Number,
      required: true,
      maxLength: 30,
      trim: true,
    },
    type: {
      type: String,
      default: "expense",
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    category: {
      type: [
        { type: String, ref: "ExpenseCategory" },
        {
          type: String,
          ref: "UserExpenseCategory",
        },
      ],
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 40,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Expense", ExpenseSchema);
