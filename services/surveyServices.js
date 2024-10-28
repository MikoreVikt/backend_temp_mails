const { FirstSurvey, SecondSurvey } = require("../models/surveyModel");

const getMyAnswers = async (owner) => {
  const first = await FirstSurvey.find({ owner });
  const second = await SecondSurvey.find({ owner });

  const answers = [];

  await first.map((obj) => answers.push(obj));
  await second.map((obj) => answers.push(obj));

  return answers;
};

const postFirstAnswer = async ({ fullName, education, courses }, owner) => {
  const number = "first";
  const status = true;

  return await FirstSurvey.create({
    fullName,
    education,
    courses,
    number,
    status,
    owner,
  });
};

const postSecondAnswer = async ({ position, stack, salary }, owner) => {
  const number = "second";
  const status = true;

  return await SecondSurvey.create({
    position,
    stack,
    salary,
    number,
    status,
    owner,
  });
};

module.exports = {
  getMyAnswers,
  postFirstAnswer,
  postSecondAnswer,
};
