const mongoose = require('mongoose');
const crypto = require('crypto');
const { toJSON, paginate } = require('./plugins');
const { cryptoSecret } = require('../config/config');

const savedPasswordSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    site: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: Object,
      required: true,
      trim: true,
      private: true, // used by the toJSON plugin
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
savedPasswordSchema.plugin(toJSON);
savedPasswordSchema.plugin(paginate);

function encrypt(password) {
  const iv = Buffer.from(crypto.randomBytes(16));
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(cryptoSecret), iv);
  const encryptedPass = Buffer.concat([cipher.update(password), cipher.final()]);
  return {
    iv: iv.toString('hex'),
    password: encryptedPass.toString('hex'),
  };
}

function decrypt(encryptedPass) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(cryptoSecret), Buffer.from(encryptedPass.iv, 'hex'));
  const decryptedPass = Buffer.concat([decipher.update(Buffer.from(encryptedPass.password, 'hex')), decipher.final()]);
  return decryptedPass.toString();
}

savedPasswordSchema.methods.showPassword = async function () {
  const password = this;
  const decryptedPassword = decrypt(password.password);
  return {
    password: decryptedPassword,
  };
};

savedPasswordSchema.pre('save', async function (next) {
  const data = this;
  if (data.isModified('password')) {
    data.password = encrypt(data.password);
  }
  next();
});

const SavedPassword = mongoose.model('SavedPasswords', savedPasswordSchema);

module.exports = SavedPassword;
