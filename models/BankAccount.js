const mongoose = require('mongoose');
const {Schema} = mongoose;

const bankAccountSchema = new Schema({
  accountnumber: {type: Number, required: true},
  accountholder: {type: String,required: true}, 
  nickname: {type: String,required: true}, 
  mobileno: {type: Number, required: true},
  accountbalance: {type: Number, required: true},
  creator: {type: String, required: true},
  accounttype: {type: String},
  status: {type: Boolean, default: true},
  creationTime: {type: Date, default: Date.now},
  lastModified: {type: Date, default: Date.now},
  _class: {type: String, default: 'com.avitam.billing.model.Product'},
});

const Bankacc = mongoose.model('bankdetail', bankAccountSchema);

module.exports = Bankacc;
