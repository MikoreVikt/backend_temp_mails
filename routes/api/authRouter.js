const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../../middlewares/authMiddleware");

const { validation } = require("../../middlewares/validationMiddleware");

const { joiRegiterSchema, joiLoginSchema } = require("../../models/userModel");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  registrationController,
  logInController,
  logOutController,
  currentUserController,
} = require("../../controllers/authController");

router.post(
  "/register",
  validation(joiRegiterSchema),
  asyncWrapper(registrationController)
);
router.post(
  "/login",
  validation(joiLoginSchema),
  asyncWrapper(logInController)
);
router.post("/logout", authMiddleware, asyncWrapper(logOutController));
router.post("/current", authMiddleware, asyncWrapper(currentUserController));

module.exports = {
  authRouter: router,
};
