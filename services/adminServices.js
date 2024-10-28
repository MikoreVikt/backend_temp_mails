const { User } = require("../models/userModel");
const { FirstSurvey, SecondSurvey } = require("../models/surveyModel");

const getFirstResult = async () => {
  const users = await User.find({});

  const guests = await users.filter((object) => object.status === "GUEST");

  const username = await guests.map(({ _id, username }) => {
    return {
      _id,
      username,
    };
  });

  const userAnswers = await guests.map((user) => user.ownPoll);

  const uA = userAnswers.map((arr) => arr[0]);

  const answers = await Promise.all(
    uA.map(async ({ _id }) => await FirstSurvey.find({ _id }))
  );

  return { username, answers };
};

const getSecondResult = async () => {
  const users = await User.find({});

  const guests = await users.filter((object) => object.status === "GUEST");

  const username = await guests.map(({ _id, username }) => {
    return {
      _id,
      username,
    };
  });

  const userAnswers = await guests.map((user) => user.ownPoll);

  const uA = userAnswers.map((arr) => arr[1]);

  const answers = await Promise.all(
    uA.map(async ({ _id }) => await SecondSurvey.find({ _id }))
  );

  return { username, answers };
};

module.exports = {
  getFirstResult,
  getSecondResult,
};
