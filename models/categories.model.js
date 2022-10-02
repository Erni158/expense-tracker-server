const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
  name: String,
  user: { type: Schema.Types.ObjectId, ref: "User" }
},
{
  collection: "Categories",
});

const Categories = mongoose.model("Categories", categoriesSchema);
module.exports = Categories;