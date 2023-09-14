const Router = require("express");
const router = new Router();
//const authController = require("../../controller/authController");
const expenseCategoryController = require("../../controller/category/expenseController");
// const budgetController = require("../controller/budgetController");
// const { check } = require("express-validator");
const authMiddleware = require("../../middleware/authMiddleware");
const roleMiddleware = require("../../middleware/roleMiddleware");

// router.post(
//   "/add/income/category",
//   incomeCategoryController.addIncomeCategory
// );
router.post("/add", expenseCategoryController.addExpenseCategory);
router.post(
  "/edit/add",
  authMiddleware,
  expenseCategoryController.addUserExpenseCategories
);
router.get(
  "/all",
  authMiddleware,
  expenseCategoryController.getExpenseCategories
);
router.get(
  "/user/get",
  authMiddleware,
  expenseCategoryController.getUserExpenseCategories
);
router.post(
  "/delete",
  authMiddleware,
  expenseCategoryController.deleteUserExpenseCategory
);
module.exports = router;
