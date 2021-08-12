const Joi = require("joi");

const register = Joi.object({
  firstname: Joi.string().min(3).required(),
  lastname: Joi.string().required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(5).required(),
});

const login = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(5).required(),
});

module.exports = {
  register,
  login,
};
