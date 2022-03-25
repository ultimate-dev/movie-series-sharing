//Middlewares
const verifyToken = require("../../middlewares/verify-token");
const verifyAdmin = require("../../middlewares/verify-admin");

//Routes
const testRouter = require("./test");
const authRouter = require("./auth");
const dashboardRouter = require("./dashboard");
const adminRouter = require("./admin");
const usersRouter = require("./users");
const managersRouter = require("./managers");


const suffix = "/panel";
module.exports = (app) => {
    app.use(suffix + "/test", testRouter);
    app.use(suffix + "/auth", authRouter);
    app.use(suffix + "/api", verifyToken);
    app.use(suffix + "/api", verifyAdmin);
    app.use(suffix + "/api/admin", adminRouter);
    app.use(suffix + "/api/dashboard", dashboardRouter);
    app.use(suffix + "/api/users", usersRouter);
    app.use(suffix + "/api/managers", managersRouter);
};
