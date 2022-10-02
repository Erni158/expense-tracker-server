const asyncHandler = require("express-async-handler");
const Categories = require("../models/categories.model");
const checkServerError = require("../utils/checkServerError");
const ReadPreference = require("mongodb").ReadPreference;

const getCategories = asyncHandler(async (req, res) => {
  const docquery = Categories.find({ user: req.user }).read(ReadPreference.NEAREST);
  docquery
    .exec()
    .then(categories => {
      res.json(categories);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

const postCategory = asyncHandler(async (req, res) => {
  const category = new Categories({
    name: req.body.name,
    user: req.user._id,
  })
  category.save(error => {
    if (checkServerError(res, error)) return;
    res.status(201).json(category);
  })
})

module.exports = { getCategories, postCategory };