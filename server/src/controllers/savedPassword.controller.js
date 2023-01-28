const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { savedPasswordService } = require('../services');

const createPassword = catchAsync(async (req, res) => {
  const data = {
    ...req.body,
    userId: req.user._id,
  };
  const password = await savedPasswordService.createPassword(data);
  res.status(httpStatus.CREATED).send(password);
});

const getAllPasswords = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['username', 'site']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await savedPasswordService.queryAllPasswords({ userId: req.user._id, ...filter }, options, req.user._id);
  res.send(result);
});

const getPassword = catchAsync(async (req, res) => {
  const password = await savedPasswordService.getPasswordById(req.params.passwordId);
  if (!password) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Password not found');
  }
  res.send(password);
});

const showPassword = catchAsync(async (req, res) => {
  const password = await savedPasswordService.showPasswordById(req.params.passwordId);
  if (!password) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Password not found');
  }
  res.send(password);
});

const updatePassword = catchAsync(async (req, res) => {
  const password = await savedPasswordService.updatePasswordById(req.params.passwordId, req.body);
  res.send(password);
});

const deletePassword = catchAsync(async (req, res) => {
  await savedPasswordService.deletePasswordById(req.params.passwordId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPassword,
  getAllPasswords,
  getPassword,
  showPassword,
  updatePassword,
  deletePassword,
};
