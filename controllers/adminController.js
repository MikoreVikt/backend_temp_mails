const {
  getFirstResult,
  getSecondResult,
} = require("../services/adminServices");

const getFirstResultController = async (req, res) => {
  const { username, answers } = await getFirstResult();

  res.status(200).json({ username, answers });
};

const getSecondResultController = async (req, res) => {
  const { username, answers } = await getSecondResult();

  res.status(200).json({ username, answers });
};

module.exports = {
  getFirstResultController,
  getSecondResultController,
};
