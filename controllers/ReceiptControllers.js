const asyncHandler = require("express-async-handler");
const Receipt = require("../models/receipt.model");
const checkServerError = require("../utils/checkServerError");

const getReceipts = asyncHandler(async (req, res) => {
  const { start, end } = req.query;

  const docquery = Receipt.find({ 
    user: req.user,
    ...(start && end) && { createdAt: { 
      $gte: new Date(start), 
      $lt: new Date(end) 
    }}
  }).populate("user");

  docquery
    .exec()
    .then(receipts => {
      res.json(receipts);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

const postReceipt = asyncHandler(async (req, res) => {
  const receipt = new Receipt({
    name: req.body.name,
    category: req.body.category,
    amount: req.body.amount,
    list: req.body.list,
    user: req.user._id,
  })
  receipt.save(error => {
    if (checkServerError(res, error)) return;
    res.status(200).json(receipt);
  })
});

const deleteReceipt = asyncHandler(async (req, res) => {
  const { selected } = req.body;
  
  for (const id of selected) {
    Receipt.deleteOne({ _id: id })
    .catch(err => {
      res.status(500).send(err);
    });
  }

  res.json({
    status: "OK"
  })
});

module.exports = { getReceipts, postReceipt, deleteReceipt };