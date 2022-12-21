const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPassword = {
  body: Joi.object().keys({
    site: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const getAllPasswords = {
  query: Joi.object().keys({
    username: Joi.string(),
    site: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPassword = {
  params: Joi.object().keys({
    passwordId: Joi.string().custom(objectId),
  }),
};

const showPassword = {
  params: Joi.object().keys({
    passwordId: Joi.string().custom(objectId),
  }),
};

const updatePassword = {
  params: Joi.object().keys({
    passwordId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      site: Joi.string(),
      username: Joi.string(),
      password: Joi.string(),
    })
    .min(1),
};

const deletePassword = {
  params: Joi.object().keys({
    passwordId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPassword,
  getAllPasswords,
  getPassword,
  showPassword,
  updatePassword,
  deletePassword,
};
