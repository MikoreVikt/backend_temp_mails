const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../../middlewares/authMiddleware");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  getFirstResultController,
  getSecondResultController,
} = require("../../controllers/adminController");

router.use(authMiddleware);

router.get("/firstresult", asyncWrapper(getFirstResultController));
router.get("/secondresult", asyncWrapper(getSecondResultController));

module.exports = {
  adminRouter: router,
};
