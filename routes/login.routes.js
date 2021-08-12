const express = require("express");
const router = express.Router();
const loginService = require("../services/login.service")

// CREATE
router.post("/", async (req, res) => {
  const post = await loginService.createPost(req.body);
  res.send(post);
});

module.exports = router;
