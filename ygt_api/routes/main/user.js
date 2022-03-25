const bcrypt = require("bcryptjs");
const upload = require("../../helper/upload");
const config = require("../../config");
const sequelize = require("sequelize");

//Route
const router = require("express").Router();
// Models
const { Users, Followeds, Posts, Watch } = require("../../helper/db");

router.get("/", async (req, res) => {
  try {
    let { user_id } = req.headers;
    let user = await Users.findOne({
      where: {
        status: 1,
        user_id,
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

    const followers = await Followeds.findAll({
      where: {
        status: 2,
        user_id,
      },
      include: [{ model: Users, where: { status: 1 } }],
    });

    let _followers = [];

    await Promise.all(
      followers.map(async (item) => {
        let follower = await Users.findOne({
          where: {
            status: 1,
            user_id: item.follower_id,
          },
          attributes: [
            "user_id",
            "name",
            "surname",
            "user_name",
            "image",
            "back",
          ],
        });
        _followers.push({ item, follower });
      })
    );

    const followeds = await Followeds.findAll({
      where: {
        status: 2,
        follower_id: user_id,
      },
      include: [
        {
          model: Users,
          where: { status: 1 },
          attributes: [
            "user_id",
            "name",
            "surname",
            "user_name",
            "image",
            "back",
          ],
        },
      ],
    });

    let posts = await Posts.findAll({
      where: {
        status: 1,
        user_id,
      },
      include: [{ model: Users, where: { status: 1 } }],
    });

    let control_follow = await Followeds.findOne({
      where: {
        user_id: user_id,
        follower_id: req.decoded.user_id,
      },
    });




    let watch_movies = await Watch.findAll({
      where: {
        status: 1,
        user_id,
        watch: 1,
        type: "movie",
      },
    });

    let watched_movies = await Watch.findAll({
      where: {
        status: 1,
        user_id,
        watch: 2,
        type: "movie",
      },
    });

    let watch_series = await Watch.findAll({
      where: {
        status: 1,
        user_id,
        watch: 1,
        type: "series",
      },
    });

    let watched_series = await Watch.findAll({
      where: {
        status: 1,
        user_id,
        watch: 2,
        type: "series",
      },
    });



    if (user) {
      res.json({
        result: true,
        user,
        followers: _followers,
        followeds,
        posts,
        control_follow: control_follow ? control_follow.status : 0,
        me: user_id == req.decoded.user_id,
        lists: {
          watch_movies,
          watched_movies,
          watch_series,
          watched_series,
        },
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
//follows
router.post("/follow", async (req, res) => {
  try {
    let { user_id } = req.body;

    let follow = await Followeds.findOne({
      where: {
        follower_id: req.decoded.user_id,
        user_id,
      },
    });

    if (follow) {
      await Followeds.update(
        { status: 1 },
        {
          where: {
            follower_id: req.decoded.user_id,
            user_id,
          },
        }
      );
    } else {
      await Followeds.create({
        follower_id: req.decoded.user_id,
        user_id,
      });
    }
    res.json({
      result: true,
    });
  } catch (err) {
    console.log(err);
    res.json({
      result: false,
      message: req.messages["error"]["catch"],
    });
  }
});
router.post("/unfollow", async (req, res) => {
  try {
    let { user_id } = req.body;

    await Followeds.update(
      { status: 0 },
      {
        where: {
          follower_id: req.decoded.user_id,
          user_id,
        },
      }
    );

    res.json({
      result: true,
      message: "Takip Istegi Kaldirildi.",
    });
  } catch (err) {
    console.log(err);
    res.json({
      result: false,
      message: req.messages["error"]["catch"],
    });
  }
});

router.post("/decfollow", async (req, res) => {
  try {
    let { user_id } = req.body;

    await Followeds.update(
      { status: 0 },
      {
        where: {
          follower_id: user_id,
          user_id: req.decoded.user_id,
        },
      }
    );

    res.json({
      result: true,
      message: "Takip Istegi Kaldirildi.",
    });
  } catch (err) {
    console.log(err);
    res.json({
      result: false,
      message: req.messages["error"]["catch"],
    });
  }
});

router.post("/accfollow", async (req, res) => {
  try {
    let { user_id } = req.body;

    await Followeds.update(
      { status: 2 },
      {
        where: {
          follower_id: user_id,
          user_id: req.decoded.user_id,
        },
      }
    );

    res.json({
      result: true,
      message: "Takip Istegi Kabul Edildi.",
    });
  } catch (err) {
    console.log(err);
    res.json({
      result: false,
      message: req.messages["error"]["catch"],
    });
  }
});

router.get("/search", async (req, res) => {
  try {
    let { search } = req.headers;
    let users = await Users.findAll({
      attributes: [
        "user_id",
        "name",
        "surname",
        "name_surname",
        "user_name",
        "image",
        "back",
      ],
      where: {
        status: 1,

        [sequelize.Op.or]: [
          {
            name_surname: {
              [sequelize.Op.like]: "%" + String(search).toLowerCase() + "%",
            },
          },
          {
            user_name: {
              [sequelize.Op.like]: "%" + String(search).toLowerCase() + "%",
            },
          },
        ],
      },
    });

    res.json({
      result: true,
      users,
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
