const Router = require("express");
const router = new Router();
//const authController = require("../../controller/authController");
const incomeCategoryController = require("../../controller/category/incomeController");
// const budgetController = require("../controller/budgetController");
// const { check } = require("express-validator");
const authMiddleware = require('../../middleware/authMiddleware');
const roleMiddleware = require('../../middleware/roleMiddleware');

// router.post(
//   "/add/income/category",
//   incomeCategoryController.addIncomeCategory
// );
router.post("/add", incomeCategoryController.addIncomeCategory);
router.post("/edit/add", authMiddleware, incomeCategoryController.addUserIncomeCategories);
router.get("/all", authMiddleware, incomeCategoryController.getIncomeCategories);
router.get("/user/get", authMiddleware, incomeCategoryController.getUserIncomeCategories)

module.exports = router;