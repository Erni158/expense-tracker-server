const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const receiptSchema = new Schema({
  name: String,
  category: String,
  amount: String,
  list: [{
    product: String,
    amount: String,
  }],
  user: { type: Schema.Types.ObjectId, ref: "User" }
},
{
  collection: "Receipts",
  timestamps: true
});

const Receipt = mongoose.model("Receipt", receiptSchema);
module.exports = Receipt;