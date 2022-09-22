const Message = require("../../models/messages");
const _ = require("lodash");
async function getMessages(req, res, query) {
  try {
    const messages = await Message.find(query);
    res.json(messages);
  } catch (err) {
    res.send(err).status(404);
  }
}
async function sendMessage(req, res) {
  try {
    const message = new Message(
      _.pick(req.body, ["content", "sender", "receiver", "sendedAt"])
    );
    message.save();
    res.json(message);
  } catch (err) {
    res.send(err).status(404);
  }
}
async function likeMessage(req, res) {
  try {
    const message = await Message.findOne({ _id: req.params.id });
    if (!message) return;
    message.isLiked = !message.isLiked;
    await message.save();
    res.json(message);
  } catch (err) {
    res.send(err).status(404);
  }
}
async function deleteMessage(req, res) {
  try {
    const message = await Message.findOne({ _id: req.params.id });
    await message.delete();
    res.json(message);
  } catch (err) {
    res.send(err).status(404);
  }
}
module.exports = {
  getMessages,
  sendMessage,
  likeMessage,
  deleteMessage,
};
