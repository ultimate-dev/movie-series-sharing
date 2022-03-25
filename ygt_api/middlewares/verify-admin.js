const {Admins} = require("../helper/db")

module.exports = async (req, res, next) => {
    const {admin_id, email} = req.decoded;

    let admin = await Admins.count({
        where: {
            admin_id: admin_id,
            email: email,
            status: [1, 2],
        }
    })

    if (admin > 0) {
        next()
    } else {
        res.json({
            result: false,
            message: "502"
        })
    }

};