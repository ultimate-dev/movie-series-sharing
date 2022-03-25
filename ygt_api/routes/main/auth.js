const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config");
//Regx
const emailRegx =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//Route
const router = require("express").Router();
// Models
const { Users } = require("../../helper/db");

router.post("/login", async (req, res) => {
  try {
    const { email = "", password = "" } = req.body;
    if (email !== "" && password !== "") {
      let user = await Users.findOne({
        where: {
          email: email,
        },
      });
      let pass_control = false;
      if (user) {
        if (user.status) {
          pass_control = await bcrypt.compare(password, user.password);
          if (pass_control) {
            const token = jwt.sign(
              {
                user_id: user.user_id,
                email: user.email,
                user_name: user.user_name,
              },
              req.app.get("secret_key"),
              {
                expiresIn: 1408261000,
              }
            );
            res.json({
              result: true,
              user: {
                user_name: user.user_name,
                name: user.name,
                surname: user.surname,
                image: user.image,
                back: user.back,
                email: user.email,
                createdAt: user.createdAt,
              },
              token,
            });
          } else {
            res.json({
              result: false,
              message:
                "Girdiğiniz e-posta ve şifreyle eşleşen bir hesap bulamadık.",
            });
          }
        } else {
          res.json({
            result: false,
            message:
              "Hesabınız Banlanmıştır. Lütfen Sistem Yönecisiyle İletişime Geçiniz.",
          });
        }
      } else {
        res.json({
          result: false,
          message:
            "Girdiğiniz e-posta ve şifreyle eşleşen bir hesap bulamadık.",
        });
      }
    } else {
      res.json({
        result: false,
        message: "Lütfen Gerekli Alanları Doldurunuz.",
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

router.post("/register", async (req, res) => {
  try {
    const { name, surname, user_name, email, password, rePassword } = req.body;
    if (
      name !== "" &&
      surname !== "" &&
      user_name !== "" &&
      email !== "" &&
      password !== "" &&
      rePassword !== ""
    ) {
      // email
      if (emailRegx.test(email)) {
        let email_control = await Users.count({
          where: {
            email: email,
          },
        });
        // email
        if (email_control == 0) {
          // password
          if (String(password).length >= 8) {
            // password
            if (password == rePassword) {
              bcrypt.hash(password, 10).then(async (hash) => {
                let user = await Users.create({
                  name,
                  surname,
                  user_name,
                  name_surname: name + " " + surname,
                  email,
                  password: hash,
                });
                if (user) {
                  res.json({
                    result: true,
                    message: "Kayıt İşlemi Başarılı. Lütfen Giriş Yapınız.",
                  });
                } else {
                  res.json({
                    result: false,
                    message: "Veri İşlenirken Hata Oluştu.",
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
        message: "Lütfen Gerekli Alanları Doldurunuz.",
      });
    }
  } catch (err) {
    res.json({
      result: false,
      message: req.messages["error"]["catch"],
    });
  }
});

router.post("/verify", async (req, res) => {
  try {
    const { token } = req.body;
    let decoded = jwt.decode(token, req.app.get("secret_key"));
    if (decoded && decoded.user_id && decoded.email) {
      let user = await Users.findOne({
        where: {
          user_id: decoded.user_id,
          email: decoded.email,
          status: 1,
        },
      });
      if (user) {
        const new_token = jwt.sign(
          {
            user_id: user.user_id,
            email: user.email,
            user_name: user.user_name,
          },
          req.app.get("secret_key"),
          {
            expiresIn: 1408261000,
          }
        );
        res.json({
          result: true,
          user: {
            user_name: user.user_name,
            name: user.name,
            surname: user.surname,
            image: user.image,
            back: user.back,
            email: user.email,
            createdAt: user.createdAt,
          },
          token: new_token,
        });
      } else {
        res.json({
          result: false,
          message: "Kullanıcı Doğrulanamadı. Lütfen Tekrar Giriş Yapınız.",
        });
      }
    } else {
      res.json({
        result: false,
        message: "Token Hatalı.",
      });
    }
  } catch (err) {
    res.json({
      result: false,
      message: req.messages["error"]["catch"],
    });
  }
});
module.exports = router;
