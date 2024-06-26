const Bill = require("../models/bill.model");
const Receipt = require("../models/receipt.model");
const checkServerError = require("../utils/checkServerError");

require("../mongo").connect();

function getBills(req, res) {
  const { start, end, isReceipts } = req.query;

  if (isReceipts) {
    const docqueryReceipt = Receipt.find({ 
      user: req.user,
      ...(start && end) && { createdAt: { 
        $gte: new Date(start), 
        $lt: new Date(end) 
      }}
    }).populate("user");

    docqueryReceipt.exec().then(receipts => {
      Bill.find({ 
        user: req.user,
        ...(start && end) && { createdAt: { 
          $gte: new Date(start), 
          $lt: new Date(end) 
        }}
      })
      .populate("user")
      .exec()
      .then(bills => {
        const merged = bills.concat(receipts);
        res.json(merged);
      })
    })
  } else {
    const docquery = Bill.find({ 
      user: req.user,
      ...(start && end) && { createdAt: { 
        $gte: new Date(start), 
        $lt: new Date(end) 
      }}
    }).populate("user");
  
    docquery
      .exec()
      .then(bills => {
        res.json(bills);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
}

async function postBill(req, res) {
  const bill = new Bill({
    name: req.body.name,
    category: req.body.category,
    amount: req.body.amount,
    user: req.user._id,
  })

  bill.save(error => {
    if (checkServerError(res, error)) return;
    res.status(201).json(bill);
  })
}

async function deleteBill(req, res) {
  const { selected } = req.body;
  
  for (const id of selected) {
    Bill.deleteOne({ _id: id })
    .catch(err => {
      res.status(500).send(err);
    });
  }

  res.json({
    status: "OK"
  })
}

module.exports = { getBills, postBill, deleteBill };