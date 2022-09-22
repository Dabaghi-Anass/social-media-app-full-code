const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const socketio = require("socket.io");
const http = require("http");
const usersRoute = require("./routes/users");
const messageRoute = require("./routes/messages");
const auth = require("./routes/auth");
const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(cookieParser());
app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/SocialDB")
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));
const io = socketio(server, {
  cors: { origin: "*" },
});
app.set("json spaces", 2);
app.use("/api/users", usersRoute);
app.use("/api/messages", messageRoute);
app.use("/api/auth", auth);
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/PUBLIC/index.html"));
});
io.on("connection", (socket) => {
  socket.on("message", (message) => console.log(message));
  socket.emit("message", {
    content: "kidayr labas 3lik",
    isLiked: false,
    _id: "123",
  });
  socket.emit("message", {
    content: "afin lhmdlh",
    isLiked: true,
    _id: "aa",
    sender: "user",
  });
});
server.listen(PORT, console.log(`info : app listening on port ${PORT}...`));
