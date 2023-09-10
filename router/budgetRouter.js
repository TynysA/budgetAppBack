const Router = require("express");
const router = new Router();
const authController = require("../controller/authController");
const budgetController = require("../controller/budgetController");
const { check } = require("express-validator");
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware');

router.get("/budget", authMiddleware, budgetController.getUserBudget);
router.get("/budgets", roleMiddleware(["ADMIN"]), budgetController.getBudgets);
router.get("/budget/actions", authMiddleware, budgetController.getAllActions);

module.exports = router;
