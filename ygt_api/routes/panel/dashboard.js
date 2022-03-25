//Route
const router = require("express").Router();
// Models
const {Users, Contacts,ContactSubjects} = require("../../helper/db");


router.get("/", async (req, res) => {
    try {


        let count_users = await Users.count({where: {status: 1}})
        let count_man = await Users.count({where: {status: 1, gender: "man"}})
        let count_woman = await Users.count({where: {status: 1, gender: 'woman'}})
        let count_ban = await Users.count({where: {status: 0}})

        let new_users = await Users.findAll({
            where: {status: 1},
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
            order: [["createdAt", "desc"]],
            limit: 6
        })

        let unread = await Contacts.findAll({
            where: {status: 1, read: 0},
            order: [["createdAt", "desc"]],
            limit: 4,
            include: [{model: Users}, {model: ContactSubjects}]
        })


        res.json({
            result: true,
            new_users: new_users,
            unread: unread,
            counts: {
                users: count_users,
                users_man: count_man,
                users_woman: count_woman,
                users_ban: count_ban
            }
        })


    } catch (err) {
        res.json({
            result: false,
            message: "Beklenmedik Bir Hata Oluştu. Lütfen Tekrar Deneyin."
        });
    }
});


module.exports = router;
