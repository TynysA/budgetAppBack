const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./router/authRouter");
const budgetRouter = require("./router/budgetRouter");
const incomeCategoriesRouter = require("./router/category/incomeCategoryRouter");
const expenseCategoriesRouter = require("./router/category/expenseCategoryRouter");
const incomeRouter = require("./router/incomeRouter");
const expenseRouter = require("./router/expenseRouter");

const PORT = process.env.PORT || 8000;

const cors = require("cors");

const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/auth", authRouter);

app.use("/", budgetRouter);
app.use("/income/category", incomeCategoriesRouter);
app.use("/expense/category", expenseCategoriesRouter);
app.use("/income", incomeRouter);
app.use("/expense", expenseRouter);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://qwery:qwerty123@test1.cac3uky.mongodb.net/?retryWrites=true&w=majority`
    );
    app.listen(PORT, () => console.log(`server started on  port ${PORT}`));
  } catch (e) {
    console.log("Error");
    console.log(e);
  }
};

start();
