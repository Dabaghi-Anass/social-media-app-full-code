const express = require("express");
const router = express.Router();
const {
  deleteMessage,
  getMessages,
  sendMessage,
  likeMessage,
} = require("./methods/message--Methods.js");
router.get("/:sender/:receiver", (req, res) =>
  getMessages(req, res, {
    sender: req.params.sender,
    receiver: req.params.receiver,
  })
);
router.post("/", (req, res) => sendMessage(req, res));
router.delete("/:id", (req, res) => deleteMessage(req, res));
router.put("/:id", (req, res) => likeMessage(req, res));
module.exports = router;
