const bcrypt = require("bcryptjs");
const upload = require("../../helper/upload");
const config = require("../../config");
const sequelize = require("sequelize");

//Route
const router = require("express").Router();
// Models
const { Messages, Users } = require("../../helper/db");

router.get("/detail", async (req, res) => {
  try {
    const { user_id } = req.headers;
    if (parseInt(user_id) !== parseInt(req.decoded.user_id)) {
      let info = await Users.findOne({
        where: {
          status: 1,
          user_id,
        },
        attributes: ["name", "surname", "user_name", "image", "user_id"],
      });

      let messages = await Messages.findAll({
        where: {
          status: 1,
          user_id: {
            [sequelize.Op.or]: [user_id, req.decoded.user_id],
          },
          sender_id: {
            [sequelize.Op.or]: [user_id, req.decoded.user_id],
          },
        },
      });

      await Messages.update(
        { read: 1 },
        {
          where: {
            read: 0,
            status: 1,
            user_id: req.decoded.user_id,
          },
        }
      );

      res.json({
        result: true,
        messages,
        info,
      });
    } else {
      res.json({
        result: false,
        message: req.messages["error"]["catch"],
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      result: false,
      message: req.messages["error"]["catch"],
    });
  }
});

router.post("/detail", async (req, res) => {
  try {
    const { user_id, message = "" } = req.body;
    if (parseInt(user_id) !== parseInt(req.decoded.user_id)) {
      await Messages.create({
        sender_id: req.decoded.user_id,
        user_id,
        message,
      });

      res.json({
        result: true,
      });
    } else {
      res.json({
        result: false,
        message: req.messages["error"]["catch"],
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      result: false,
      message: req.messages["error"]["catch"],
    });
  }
});

router.get("/lasts", async (req, res) => {
  try {
    let messages = await Messages.findAll({
      where: {
        status: 1,
        user_id: req.decoded.user_id,
        read: 0,
      },
      limit: 3,
    });

    let _messages = [];

    await Promise.all(
      messages.map(async (item) => {
        let sender = await Users.findOne({
          where: {
            status: 1,
            user_id: item.sender_id,
          },
        });
        _messages.push({
          message: item.message,
          sender_id: item.sender_id,
          sender,
        });
      })
    );

    res.json({
      result: true,
      messages: _messages,
    });
  } catch (err) {
    console.log(err);
    res.json({
      result: false,
      message: req.messages["error"]["catch"],
    });
  }
});

router.get("/", async (req, res) => {
  try {
    let senders = await Messages.findAll({
      where: {
        status: 1,
        [sequelize.Op.or]: [
          { user_id: req.decoded.user_id },
          { sender_id: req.decoded.user_id },
        ],
      },
      group: ["sender_id"],
      order: [["createdAt", "DESC"]],
    });

    let _senders = [];

    await Promise.all(
      senders.map(async (item) => {
        if (item.user_id == req.decoded.user_id) {
          let user = await Users.findOne({
            where: {
              status: 1,
              user_id: item.sender_id,
            },
            attributes: [
              "user_id",
              "name",
              "surname",
              "user_name",
              "image",
              "back",
              "privacy",
            ],
          });

          _senders.push(user);
        } else {
          let user = await Users.findOne({
            where: {
              status: 1,
              user_id: item.user_id,
            },
            attributes: [
              "user_id",
              "name",
              "surname",
              "user_name",
              "image",
              "back",
              "privacy",
            ],
          });
          _senders.push(user);
        }
      })
    );

    res.json({
      result: true,
      senders: _senders,
    });
  } catch (err) {
    console.log(err);
    res.json({
      result: false,
      message: req.messages["error"]["catch"],
    });
  }
});


module.exports = router;
