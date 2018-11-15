const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const itemSchema = new Schema({
  key: {
    type: String,
    required: true
  },
  type: {
    type: String
  },
  subject: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },


  objectId: Schema.Types.ObjectId
})

module.exports = mongoose.model("Item", itemSchema);
