const router = require("express").Router();

/**
 * GET
 */
router.route("/").get(async (req, res) => {
    res.send("test")
})

/**
 * POST
 */
router.route("/").post(async (req, res) => {
    res.send("test")
})

/**
 * PUT
 */
router.route("/").put(async (req, res) => {
    res.send("test")
})

/**
 * DELETE
 */
router.route("/").delete(async (req, res) => {
    res.send("test")
})

module.exports = router;