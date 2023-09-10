const { Schema, model } = require("mongoose");

const IncomeSchema = new Schema(
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
      default: "income",
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    category: {
      type: [
        { type: String, ref: "IncomeCategory" },
        {
          type: String,
          ref: "UserIncomeCategory",
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

module.exports = model("Income", IncomeSchema);
