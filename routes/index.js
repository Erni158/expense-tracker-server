const express = require("express");
const { registerUser, authUser, tokenCheck, profile } = require("../controllers/userControllers");
const { getBills, postBill, deleteBill } = require("../services/bill-service");
const { getCategories, postCategory } = require("../controllers/categoriesControllers");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/bills", protect, async (req, res) => {
  getBills(req, res);
});

router.post("/bill", protect, async (req, res) => {
  postBill(req, res);
})

router.post("/bill/delete", protect, async (req, res) => {
  deleteBill(req, res);
})

router.get("/categories", protect, async (req, res) => {
  getCategories(req, res);
})

router.post("/category", protect, async (req, res) => {
  postCategory(req, res);
})

router.post("/profile", protect, profile);

router.get("/token_check", protect, tokenCheck);

router.post("/register", registerUser);
router.post("/login", authUser);

router.get('/about', async (req, res) => {
  res.send({ title: "OK" });
});

module.exports = router;