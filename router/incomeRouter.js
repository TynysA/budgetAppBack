const Router = require("express");
const router = new Router();
const authController = require("../controller/authController");
const incomeController = require("../controller/incomeController");
const { check } = require("express-validator");
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware');

router.get("/all", authMiddleware,  incomeController.getAllIncomes);
router.post("/add", authMiddleware, incomeController.addIncome);
router.delete('/:incomeId', incomeController.deleteIncome);

module.exports = router;
