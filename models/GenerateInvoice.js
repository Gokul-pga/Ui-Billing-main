const express = require("express");
const mongoose = require("mongoose");

// Child schema
const childSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  sellingPrice: { type: Number, required: true },
  quantity1: { type: Number, required: true },
  bag1: { type: Number, required: true },
  quantity2: { type: Number, },
  bag2: { type: Number, },
  totalPrice: { type: Number, required: true },
});

// Parent schema with the nested array and bill number
const billInvoice = new mongoose.Schema({
  ShopName: { type: String, required: true },
  shopAddress: { type: String, required: true },
  mobNum1: { type: String, required: true },
  mobNum2: { type: String, required: true },
  creator: { type: String, required: true },
  creationTime: { type: Date, default: Date.now },
  lastModified: { type: Date, default: Date.now },
  _class: { type: String, default: 'com.avitam.billing.model.Customer' },
  customerName: { type: String, required: true },
  paidstatus: { type: String },
  paidamount: { type: String },
  pendingAmount: { type: String },
  grossAmount: { type: String },
  totalAmount: { type: String },
  totalInvoicePiadAmount: { type: String },
  Invoice: [childSchema], 
  billNo: { type: String, unique: true }, 
});



const GenerateInvoice = mongoose.model('invoice', billInvoice);

module.exports = GenerateInvoice;
