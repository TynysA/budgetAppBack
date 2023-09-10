const Router = require("express");
const router = new Router();
const authController = require("../controller/authController");
const expenseController = require("../controller/expenseController");
const { check } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/all", authMiddleware, expenseController.getAllExpense);
router.post("/add", authMiddleware, expenseController.addExpense);
router.delete('/:expenseId', expenseController.deleteExpense);
module.exports = router;
