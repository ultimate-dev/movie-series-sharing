const bcrypt = require("bcryptjs");
const upload = require("../../helper/upload");
const config = require("../../config");
const sequelize = require("sequelize");

//Route
const router = require("express").Router();
//Regx
const emailRegx =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegx = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
// Models
const { Users, Followeds, Posts, Watch } = require("../../helper/db");

router.get("/", async (req, res) => {
  try {
    let user_id = req.decoded.user_id;
    const user = await Users.findOne({
      where: {
        status: 1,
        user_id,
      },
      attributes: ["name", "surname", "user_name", "image", "back", "privacy"],
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
router.get("/requests", async (req, res) => {
  try {
    let user_id = req.decoded.user_id;

    const requests = await Followeds.findAll({
      where: {
        status: 1,
        user_id,
      },
      include: [{ model: Users, where: { status: 1 } }],
      order: [["createdAt", "DESC"]],
    });

    let _requests = [];

    await Promise.all(
      requests.map(async (item) => {
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
        _requests.push({ item, follower });
      })
    );

    res.json({
      result: true,
      requests: _requests,
    });
  } catch (err) {
    console.log(err);
    res.json({
      result: false,
      message: req.messages["error"]["catch"],
    });
  }
});
//
router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "back", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      let { name, surname, user_name, image, back } = req.body;
      if (name !== "" && surname !== "" && user_name !== "") {
        let _image = image;
        let _back = back;

        if (req.files && req.files["image"] && req.files["image"][0].path)
          _image = config.base_url + "/" + req.files["image"][0].path;

        if (req.files && req.files["back"] && req.files["back"][0].path)
          _back = config.base_url + "/" + req.files["back"][0].path;

        await Users.update(
          {
            name,
            surname,
            name_surname: name + " " + surname,
            user_name,
            image: _image,
            back: _back,
          },
          {
            where: {
              user_id: req.decoded.user_id,
              status: 1,
            },
          }
        );
        res.json({
          result: true,
          message: "Degisiklikler Kaydedildi.",
        });
      } else {
        res.json({
          result: false,
          message: "Lutfen Tum Alanlari Doldurun.",
        });
      }
    } catch (err) {
      console.log(err);
      res.json({
        result: false,
        message: req.messages["error"]["catch"],
      });
    }
  }
);

router.post("/email", async (req, res) => {
  try {
    const { current_email = "", new_email = "" } = req.body;
    if (current_email !== "" && new_email !== "") {
      let user = await Users.findOne({
        where: {
          user_id: req.decoded.user_id,
        },
      });
      if (user.email == current_email) {
        if (emailRegx.test(new_email)) {
          let email_control = await Users.count({
            where: {
              email: new_email,
            },
          });
          if (email_control == 0) {
            const save = await Users.update(
              {
                email: new_email,
              },
              {
                where: { user_id: req.decoded.user_id, status: 1 },
              }
            );
            if (save) {
              res.json({
                result: true,
                message:
                  "Email Adresiniz Değiştirildi. Lütfen Tekrar Giriş Yapınız.",
              });
            } else {
              res.json({
                result: false,
                message: "Değişiklikler Kaydedilemedi.",
              });
            }
          } else {
            res.json({
              result: false,
              message: "Bu Email Adresi Zaten Kullanılmaktadır.",
            });
          }
        } else {
          res.json({
            result: false,
            message: "Lütfen Geçerli Bir Email Adresi Giriniz.",
          });
        }
      } else {
        res.json({
          result: false,
          message: "Girdiğiniz Bilgileri Kotrol Ediniz.",
        });
      }
    } else {
      res.json({
        result: false,
        message: "Lütfen Gerekili Alanları Doldurunuz.",
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

router.post("/password", async (req, res) => {
  try {
    const { current_pass = "", new_pass = "", new_re_pass = "" } = req.body;
    if (current_pass !== "" && new_pass !== "" && new_re_pass !== "") {
      let user = await Users.findOne({
        where: {
          user_id: req.decoded.user_id,
          status: 1,
        },
      });
      let pass_control = false;
      pass_control = await bcrypt.compare(current_pass, user.password);
      if (pass_control) {
        if (String(new_pass).length >= 8) {
          if (new_pass == new_re_pass) {
            bcrypt.hash(new_pass, 10).then(async (hash) => {
              const save = await Users.update(
                {
                  password: hash,
                },
                {
                  where: { user_id: req.decoded.user_id, status: 1 },
                }
              );
              if (save) {
                res.json({
                  result: true,
                  message:
                    "Şifreniz Değiştirildi. Lütfen Tekrar Giriş Yapınız.",
                });
              } else {
                res.json({
                  result: false,
                  message: "Değişiklikler Kaydedilemedi.",
                });
              }
            });
          } else {
            res.json({
              result: false,
              message: "Girdiğiniz Şifreler Uyuşmuyor.",
            });
          }
        } else {
          res.json({
            result: false,
            message: "Şifreniz En Az 8 Karakterden Oluşmalıdır.",
          });
        }
      } else {
        res.json({
          result: false,
          message: "Girdiğiniz Bilgileri Kotrol Ediniz.",
        });
      }
    } else {
      res.json({
        result: false,
        message: "Lütfen Gerekili Alanları Doldurunuz.",
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

router.post("/privacy", async (req, res) => {
  try {
    const { privacy } = req.body;
    await Users.update(
      { privacy: privacy == true ? 1 : 0 },
      {
        where: { status: 1, user_id: req.decoded.user_id },
      }
    );
    res.json({
      result: true,
      message: "Gizlilik Ayarlari Degistirildi.",
    });
  } catch (err) {
    console.log(err);
    res.json({
      result: false,
      message: req.messages["error"]["catch"],
    });
  }
});

router.post("/watch_status", async (req, res) => {
  try {
    const { source_id, type, watch, title } = req.body;
    let watch_control = await Watch.findOne({
      where: {
        user_id: req.decoded.user_id,
        type,
        source_id,
        status: 1,
      },
    });
    if (watch_control) {
      await Watch.update(
        {
          watch,
          title,
        },
        {
          where: {
            watch_id: watch_control.watch_id,
          },
        }
      );
    } else {
      await Watch.create({
        user_id: req.decoded.user_id,
        type,
        watch,
        source_id,
        title,
      });
    }
    res.json({
      result: true,
      message: "Liste Guncellendi.",
    });
  } catch (err) {
    console.log(err);
    res.json({
      result: false,
      message: req.messages["error"]["catch"],
    });
  }
});

router.get("/watch_status", async (req, res) => {
  try {
    const { source_id, type } = req.headers;
    let watch = await Watch.findOne({
      where: {
        user_id: req.decoded.user_id,
        type,
        source_id,
        status: 1,
      },
    });
    res.json({
      result: true,
      watch: watch ? watch.watch : 0,
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
