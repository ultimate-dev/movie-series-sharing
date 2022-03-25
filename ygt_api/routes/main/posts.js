const bcrypt = require("bcryptjs");
const upload = require("../../helper/upload");
const config = require("../../config");
const sequelize = require("sequelize");

//Route
const router = require("express").Router();
// Models
const { Posts, Users, Followeds, Watch } = require("../../helper/db");

router.get("/", async (req, res) => {
  try {
    let posts = await Posts.findAll({
      where: {
        status: 1,
      },
      include: [
        {
          model: Users,
          where: { status: 1 },
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    let _posts = [];

    await Promise.all(
      posts.map(async (item) => {
        let watch = await Watch.findOne({
          where: {
            user_id: req.decoded.user_id,
            type: item.type,
            source_id: item.source_id,
            status: 1,
          },
        });

        _posts.push({ item, watch: watch ? watch.watch : 0 });
      })
    );

    res.json({
      result: true,
      posts: _posts,
    });
  } catch (err) {
    console.log(err);
    res.json({
      result: false,
      message: req.messages["error"]["catch"],
    });
  }
});

router.post("/", async (req, res) => {
  try {
    let { text } = req.body;
    await Posts.create({ user_id: req.decoded.user_id, text });

    res.json({
      result: true,
      message: "Gonderi Olusturuldu.",
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
