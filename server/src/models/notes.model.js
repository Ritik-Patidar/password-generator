const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const notesSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    note: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
notesSchema.plugin(toJSON);
notesSchema.plugin(paginate);

const Notes = mongoose.model('Notes', notesSchema);

module.exports = Notes ;
