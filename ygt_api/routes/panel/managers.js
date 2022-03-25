//Route
const router = require("express").Router();

const bcrypt = require("bcryptjs");
const emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// Models
const {Admins} = require("../../helper/db");

router.get("/", async (req, res) => {
    try {

        if (req.decoded && req.decoded.status && req.decoded.status == 2) {
            let managers = await Admins.findAll({
                where: {status: 1},
                attributes: [
                    "admin_id",
                    "name",
                    "surname",
                    "email",
                    "createdAt",
                ],
                order: [["createdAt", "DESC"]]
            });

            res.json({
                result: true,
                managers,
            });
        } else {
            res.json({
                result: false,
                message: req.messages["error"]["err401"],
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
router.delete("/", async (req, res) => {
    try {

        if (req.decoded && req.decoded.status && req.decoded.status == 2) {
            const {admin_id} = req.headers
            await Admins.update({status: 0}, {
                where: {status: 1, admin_id},
            });

            res.json({
                result: true,
                message: "Yönetici Başarıyla Silindi",
            });
        } else {
            res.json({
                result: false,
                message: req.messages["error"]["err401"],
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
router.put("/", async (req, res) => {
    try {

        if (req.decoded && req.decoded.status && req.decoded.status == 2) {
            let {name = "", surname = "", email = "", password = ""} = req.body
            if (name !== "" && surname !== "" && email !== "" && password !== "") {
                if (emailRegx.test(email)) {

                    let controlEmail = await Admins.count({
                        where: {
                            status: [1, 2], email
                        }
                    })

                    if (controlEmail == 0) {
                        bcrypt.hash(String(password), 10).then(async (hash) => {
                            await Admins.create({name, surname, email, password: hash});
                            res.json({
                                result: true,
                                message: "Yönetici Başarıyla Oluşturuldu",
                            });
                        })
                    } else {
                        res.json({
                            result: false,
                            message: "Bu Email Adresi Kullanılmaktadır."
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
                    message: req.messages["error"]["missing"],
                });
            }
        } else {
            res.json({
                result: false,
                message: req.messages["error"]["err401"],
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
