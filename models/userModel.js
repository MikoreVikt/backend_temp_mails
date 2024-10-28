const { Schema, model, SchemaTypes } = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const joiRegiterSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "uk", "ua", "org"] },
    })
    .required(),
  password: Joi.string().min(6).alphanum().required(),
  username: Joi.string().min(5).alphanum().required(),
  status: Joi.string().min(5).max(5).alphanum(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "uk", "ua", "org"] },
    })
    .required(),
  password: Joi.string().min(6).alphanum().required(),
});

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["GUEST", "ADMIN"],
      default: "GUEST",
    },
    ownPoll: [
      {
        type: SchemaTypes.ObjectId,
        ref: "poll",
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.isPasswordCorrect = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  user.password = await bcrypt.hash(user.password, 12);
  next();
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiRegiterSchema,
  joiLoginSchema,
};
