const mongoose = require('mongoose');
var crypto = require('crypto');
const { toJSON, paginate } = require('./plugins');

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
      type: String,
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

// function encrypt(text){
//   var cipher = crypto.createCipher('aes-256-cbc', cypherKey)
//   var crypted = cipher.update(text,'utf8','hex')
//   crypted += cipher.final('hex');
//   return crypted; //94grt976c099df25794bf9ccb85bea72
// }

// function decrypt(text){
//   var decipher = crypto.createDecipher('aes-256-cbc',cypherKey)
//   var dec = decipher.update(text,'hex','utf8')
//   dec += decipher.final('utf8');
//   return dec; //myPlainText
// }

savedPasswordSchema.methods.showPassword = async function () {
  const password = this;
  return {
    password: password.password
  };
};


const SavedPassword = mongoose.model('SavedPasswords', savedPasswordSchema);

module.exports = SavedPassword;
