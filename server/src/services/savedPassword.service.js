const httpStatus = require('http-status');
const { SavedPassword } = require('../models');
const ApiError = require('../utils/ApiError');


const createPassword = async (data) => {
  return SavedPassword.create(data);
};

const queryAllPasswords = async (filter, options) => {
  // const passwords = await SavedPassword.paginate(filter, options);
  const passwords = await SavedPassword.find(filter);
  // return passwords
  return {
    results : passwords,
    totalResults: passwords.length
  };
};

const getPasswordById = async (id) => {
  const password = await SavedPassword.findById(id);
  return SavedPassword.findById(id);
};

const showPasswordById = async (id) => {
  const password = await SavedPassword.findById(id);
  //! return the decrypted password 
  console.log("------>",password);
  return await password.showPassword();
};


const updatePasswordById = async (id, updateBody) => {
  const password = await getPasswordById(id);
  if (!password) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Password not found');
  }
  Object.assign(password, updateBody);
  await password.save();
  return password;
};

const deletePasswordById = async (id) => {
  const password = await getPasswordById(id);
  if (!password) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Password not found');
  }
  await password.remove();
  return password;
};

module.exports = {
  createPassword,
  queryAllPasswords,
  getPasswordById,
  showPasswordById,
  updatePasswordById,
  deletePasswordById,
};
