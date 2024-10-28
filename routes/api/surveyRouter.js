const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../../middlewares/authMiddleware");

const { validation } = require("../../middlewares/validationMiddleware");

const {
  joiFirstSurveySchema,
  joiSecondSurveySchema,
} = require("../../models/surveyModel");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  firstSurveyController,
  secondSurveyController,
  getMyAnswersController,
} = require("../../controllers/surveyController");

router.use(authMiddleware);

router.get("/myanswers", asyncWrapper(getMyAnswersController));
router.post(
  "/firstsurvey",
  validation(joiFirstSurveySchema),
  asyncWrapper(firstSurveyController)
);
router.post(
  "/secondsurvey",
  validation(joiSecondSurveySchema),
  asyncWrapper(secondSurveyController)
);

module.exports = {
  surveyRouter: router,
};
