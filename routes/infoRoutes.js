const express = require("express");
const infoService = require("../services/infoService");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(infoService.getApiInfo());
});

router.get("/health", (req, res) => {
  res.json(infoService.getHealth());
});

module.exports = router;
