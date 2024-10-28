const { Schema, model, SchemaTypes } = require("mongoose");
const Joi = require("joi");

const joiFirstSurveySchema = Joi.object({
  fullName: Joi.string().min(5).required(),
  education: Joi.string().min(2).required(),
  courses: Joi.string().min(2).required(),
  number: Joi.string(),
});

const firstSurveySchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "The answer is required"],
    },
    education: {
      type: String,
      required: [true, "The answer is required"],
    },
    courses: {
      type: String,
      required: [true, "The answer is required"],
    },
    number: {
      type: String,
      enum: ["first"],
      default: "first",
    },
    status: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const FirstSurvey = model("first-survey", firstSurveySchema);

const joiSecondSurveySchema = Joi.object({
  position: Joi.string().min(1).required(),
  stack: Joi.string().min(1).required(),
  salary: Joi.string().min(1).required(),
  number: Joi.string(),
});

const secondSurveySchema = new Schema(
  {
    position: {
      type: String,
      required: [true, "The answer is required"],
    },
    stack: {
      type: String,
      required: [true, "The answer is required"],
    },
    salary: {
      type: String,
      required: [true, "The answer is required"],
    },
    number: {
      type: String,
      enum: ["second"],
      default: "second",
    },
    status: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const SecondSurvey = model("second-survey", secondSurveySchema);

module.exports = {
  FirstSurvey,
  SecondSurvey,
  joiFirstSurveySchema,
  joiSecondSurveySchema,
};
