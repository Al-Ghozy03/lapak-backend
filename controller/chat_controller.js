const { default: jwtDecode } = require("jwt-decode");
const { Op, QueryTypes } = require("sequelize");
const crypto = require("crypto");
const { sequelize } = require("../models");
const chatmodel = require("../models").room_chats;
const messagemodel = require("../models").messages;
const listchatmodel = require("../models").list_chats;

async function listChat(req, res) {
  try {
    const data = await sequelize.query(
      `select list.id as id_list,list.receiver,list.room_code,users.name,users.photo_profile from list_chats as list join users on list.receiver = users.id where list.user_id = ${
        jwtDecode(req.headers.authorization).id
      }`,
      {
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    return res.status(200).json({ data });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
}

async function messageList(req, res) {
  try {
    const data = await messagemodel.findAll({
      where: { room_code: req.params.room },
    });
    return res.json({ data: data });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
}

async function sendMessage(req, res) {
  try {
    let body = req.body;
    const value = await listchatmodel.findOne({
      where: { room_code: body.room_code, user_id: body.to },
    });
    if (!value) {
      await listchatmodel.create({
        receiver: body.from,
        room_code: body.room_code,
        user_id: body.to,
      });
    }
    const data = await messagemodel.create(body);
    return res.status(200).json({ data });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
}

async function generateCode(req, res) {
  try {
    const { authorization } = req.headers;
    const from = jwtDecode(authorization).id;
    const to = req.params.to;
    const code = await chatmodel.findOne({
      where: {
        [Op.or]: [
          {
            [Op.and]: [{ from: from }, { to: to }],
          },
          {
            [Op.and]: [{ from: to }, { to: from }],
          },
        ],
      },
    });

    let roomCode = crypto.randomBytes(10).toString("hex");
    if (!code) {
      await chatmodel.create({ from: from, to: to, room_code: roomCode });
      await listchatmodel.create({
        receiver: to,
        room_code: roomCode,
        user_id: from,
      });
      return res.json({
        message: "berhasil membuat baru",
        code: {
          from: from,
          to: to,
          code: roomCode,
        },
      });
    }
    const data = await listchatmodel.findOne({
      where: {
        room_code: code.room_code,
        user_id: to,
      },
    });

    if (!data) {
      await listchatmodel.create({
        receiver: to,
        room_code: code.room_code,
        user_id: jwtDecode(req.headers.authorization).id,
      });
    }

    res.json({ message: "berhasil", code });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
}

module.exports = {
  generateCode,
  sendMessage,
  messageList,
  listChat,
};
