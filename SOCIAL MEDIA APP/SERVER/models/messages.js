const mongoose = require("mongoose");
const messageSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  receiver: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  sendedAt: {
    type: String,
    required: true,
    default: Date.now(),
  },
  isLiked: Boolean,
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
