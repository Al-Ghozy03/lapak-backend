const {
  generateCode,
  messageList,
  listChat,
  sendMessage,
} = require("../controller/chat_controller");

const router = require("express")();

router.get("/generate-code/:to", generateCode);
router.get("/list-message/:room", messageList);
router.get("/list-chat", listChat);
module.exports = { chatRouter: router };
