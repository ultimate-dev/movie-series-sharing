const bcrypt = require("bcryptjs");
const sequelize = require('sequelize');
const emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//Route
const router = require("express").Router();
// Models
const {Admins} = require("../../helper/db");

router.get("/", async (req, res) => {
    try {
        let admin = await Admins.findOne({
            where: {
                admin_id: req.decoded.admin_id,
                status: [1, 2],
            },
            attributes: ["name", "surname", "email"],
        });
        if (admin) {
            res.json({
                result: true,
                admin,
            });
        } else {
            res.json({
                result: false,
                message: "Admin Bulunamad─▒.",
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

router.post("/", async (req, res) => {
    try {
        const {name, surname, email, password} = req.body;
        if (name !== "" && surname !== "" && email !== "" && password !== "") {
            if (emailRegx.test(email)) {
                let admin = await Admins.findOne({
                    where: {admin_id: req.decoded.admin_id, status: [1, 2]},
                });
                let pass_control = await bcrypt.compare(String(password), admin.password);
                if (pass_control) {
                    let controlEmail = await Admins.count({
                        where: {
                            [sequelize.Op.not]: [
                                {admin_id: req.decoded.admin_id}
                            ],
                            status: [1, 2], email
                        }
                    })
                    if (controlEmail == 0) {
                        let save = await Admins.update(
                            {name, surname, email},
                            {
                                where: {admin_id: req.decoded.admin_id, status: [1, 2]},
                            }
                        );

                        if (save) {
                            res.json({
                                result: true,
                                message: "Bilgiler G├╝ncellendi.",
                            });
                        } else {
                            res.json({
                                result: false,
                                message: "Bilgiler G├╝ncelenemedi.",
                            });
                        }
                    } else {
                        res.json({
                            result: false,
                            message: "Bu Email Adresi Kullan─▒lmaktad─▒r.",
                        });
                    }
                } else {
                    res.json({
                        result: false,
                        message: "┼×ifre Do─črulanamad─▒.",
                    });
                }
            } else {
                res.json({
                    result: false,
                    message: req.messages["error"]["email"],
                });
            }
        } else {
            res.json({
                result: false,
                message: "L├╝tfen Gerekli Alanlar─▒ Doldurunuz.",
            });
        }
    } catch (err) {
        console.log(err);
        res.json({
            result: false,
            message: req.messages["error"]["missing"],
        });
    }
});

router.post("/pass", async (req, res) => {
    try {
        const {current_pass, new_pass, new_re_pass} = req.body;
        if (current_pass !== "" && new_pass !== "" && new_re_pass !== "") {
            let admin = await Admins.findOne({
                where: {admin_id: req.decoded.admin_id, status: [1, 2]},
            });
            let pass_control = false;
            pass_control = await bcrypt.compare(current_pass, admin.password);
            if (pass_control) {
                if (String(new_pass).length >= 8) {
                    if (new_pass == new_re_pass) {
                        bcrypt.hash(String(new_pass), 10).then(async (hash) => {
                            let save = await Admins.update(
                                {password: hash},
                                {
                                    where: {admin_id: req.decoded.admin_id, status: [1, 2]},
                                }
                            );
                            if (save) {
                                res.json({
                                    result: true,
                                    message: "┼×ifre G├╝ncellendi.",
                                });
                            } else {
                                res.json({
                                    result: false,
                                    message: "┼×ifre G├╝ncelenemedi.",
                                });
                            }
                        });
                    } else {
                        res.json({
                            result: false,
                            message: "Girdi─činiz ┼×ifreler Uyu┼čmuyor.",
                        });
                    }
                } else {
                    res.json({
                        result: false,
                        message: "┼×ifreniz En Az 8 Karakterden Olu┼čmal─▒d─▒r.",
                    });
                }
            } else {
                res.json({
                    result: false,
                    message: "┼×ifre Do─črulanamad─▒.",
                });
            }
        } else {
            res.json({
                result: false,
                message: "L├╝tfen Gerekli Alanlar─▒ Doldurunuz.",
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

module.exports = router;
