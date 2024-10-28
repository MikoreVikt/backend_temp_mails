const {
  registration,
  logIn,
  logOut,
  currentUser,
} = require("../services/authServices");

const registrationController = async (req, res) => {
  const { username, email, status, token } = await registration(req.body);

  res.status(201).json({
    message: "New user has been created!",
    status: "created",
    code: "201",
    token,
    user: {
      username,
      email,
      status,
    },
  });
};

const logInController = async (req, res) => {
  const { email, password } = req.body;

  const { token, user } = await logIn(email, password);

  res.status(200).json({
    status: "success",
    code: "200",
    token,
    user,
  });
};

const logOutController = async (req, res) => {
  const { _id } = req.user;
  await logOut(_id);
  res.status(200).json({ message: "Logout successful" });
};

const currentUserController = async (req, res) => {
  const { _id } = req.user;
  const data = await currentUser(_id);
  res.status(200).json({ data });
};

module.exports = {
  registrationController,
  logInController,
  logOutController,
  currentUserController,
};
