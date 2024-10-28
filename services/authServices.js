const { compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { User } = require("../models/userModel");
const { HttpError } = require("../helpers/httpError");

const { JWT_SECRET } = process.env;

const registration = async ({
  username,
  email,
  password,
  status = "GUEST",
}) => {
  const user = await User.findOne({ email });

  if (status === "ADMIN")
    throw new HttpError(409, `Please don't try to change the status!`);

  if (user) throw new HttpError(409, `Email: '${email}' in use`);

  const newUser = new User({
    username,
    email,
    password,
    status,
  });
  await newUser.save();

  const { _id, createdAt } = newUser;
  const token = sign({ _id, createdAt }, JWT_SECRET);

  newUser.token = token;

  await User.findByIdAndUpdate({ _id }, { token }, { new: true });

  return newUser;
};

const logIn = async (email, password) => {
  const user = await User.findOne({ email });

  const { _id, createdAt, username, status, ownPoll } = user;

  if (!user) throw new HttpError(401, `No user with email: '${email}' found`);

  if (!(await compare(password, user.password)))
    throw new HttpError(401, `Wrong password`);

  const token = sign({ _id, createdAt }, JWT_SECRET);

  await User.findByIdAndUpdate({ _id }, { token }, { new: true });

  return {
    user: { username, email, status, ownPoll },
    token,
  };
};

const logOut = async (_id) => {
  return await User.findOneAndUpdate({ _id }, { token: null }, { new: true });
};

const currentUser = async (_id) => {
  return await User.findOne({ _id });
};

module.exports = {
  registration,
  logIn,
  logOut,
  currentUser,
};
