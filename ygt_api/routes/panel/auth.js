const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//Route
const router = require("express").Router();
// Models
const {Admins} = require("../../helper/db");

router.post("/login", async (req, res) => {
    try {
        const {email = "", password = ""} = req.body;
        if (email !== "" && password !== "") {
            let admin = await Admins.findOne({
                where: {
                    email: email,
                },
            });
            let pass_control = false;
            if (admin) {
                if (admin.status) {
                    pass_control = await bcrypt.compare(password, admin.password);
                    if (pass_control) {
                        const token = jwt.sign(
                            {
                                admin_id: admin.admin_id,
                                email: admin.email,
                                status: admin.status
                            },
                            req.app.get("secret_key"),
                            {
                                expiresIn: 1408261000,
                            }
                        );
                        res.json({
                            result: true,
                            admin: {
                                name: admin.name,
                                surname: admin.surname,
                                email: admin.email,
                                letters: String(admin.name).substring(0, 1) + String(admin.surname).substring(0, 1),
                                status: admin.status
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

router.post("/verify", async (req, res) => {
    try {
        const {token} = req.body;
        let decoded = jwt.decode(token, req.app.get("secret_key"));
        if (decoded && decoded.admin_id && decoded.email) {
            let admin = await Admins.findOne({
                where: {
                    admin_id: decoded.admin_id,
                    email: decoded.email,
                    status: [1, 2],
                },
            });
            if (admin) {
                const new_token = jwt.sign(
                    {
                        admin_id: admin.admin_id,
                        email: admin.email,
                        status: admin.status
                    },
                    req.app.get("secret_key"),
                    {
                        expiresIn: 1408261000,
                    }
                );
                res.json({
                    result: true,
                    admin: {
                        name: admin.name,
                        surname: admin.surname,
                        email: admin.email,
                        letters: String(admin.name).substring(0, 1) + String(admin.surname).substring(0, 1),
                        status: admin.status
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