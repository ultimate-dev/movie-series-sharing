//Middlewares
const verifyToken = require("../../middlewares/verify-token");
//Routes
const testRouter = require("./test");
const authRouter = require("./auth");
const accountRouter = require("./account");
const userRouter = require("./user");
const messagesRouter = require("./messages");
const postsRouter = require("./posts");










module.exports = (app) => {
  app.use("/api", verifyToken);
  app.use("/test", testRouter);
  app.use("/auth", authRouter);
  app.use("/api/account", accountRouter);
  app.use("/api/user", userRouter);
  app.use("/api/messages", messagesRouter);
  app.use("/api/posts", postsRouter);

};