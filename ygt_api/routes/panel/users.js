//Route
const router = require("express").Router();
// Models
const {Users} = require("../../helper/db");

router.get("/list", async (req, res) => {
    try {
        let {user = "all"} = req.headers

        let _where = {
            status: 1
        }


        if (user !== "all") {
            _where = {
                status: 1,
                user_id: user
            }
        }

        let users = await Users.findAll({
            where: _where,
            attributes: [
                "user_id",
                "image",
                "name",
                "surname",
                "email",
                "phone",
                "gender",
                "country",
                "city",
                "post_code",
                "adress",
                "createdAt",
            ],
            order: [["createdAt", "DESC"]]
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

router.get("/ban", async (req, res) => {
    try {
        let users = await Users.findAll({
            where: {
                status: 0,
            },
            attributes: [
                "user_id",
                "image",
                "name",
                "surname",
                "email",
                "phone",
                "gender",
                "country",
                "city",
                "post_code",
                "adress",
                "createdAt",
            ],
            order: [["createdAt", "DESC"]]
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

router.post("/ban", async (req, res) => {
    try {
        const {user_id} = req.body;
        await Users.update({status: 0}, {where: {user_id: user_id}});
        res.json({
            result: true,
            message: "Kullanıcı Banlandı.",
        });
    } catch (err) {
        console.log(err);
        res.json({
            result: false,
            message: req.messages["error"]["catch"],
        });
    }
});

router.post("/unban", async (req, res) => {
    try {
        const {user_id} = req.body;
        await Users.update({status: 1}, {where: {user_id: user_id}});
        res.json({
            result: true,
            message: "Kullanıcı Banı Kaldırıldı.",
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
