const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billSchema = new Schema({
  name: String,
  category: String,
  amount: String,
  user: { type: Schema.Types.ObjectId, ref: "User" }
},
{
  collection: "Bills",
  timestamps: true
});

const Bill = mongoose.model("Bill", billSchema);
module.exports = Bill;