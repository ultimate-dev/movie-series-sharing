const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const config = require("../config");
const mainRoutes = require("../routes/main");
const panelRoutes = require("../routes/panel");
const verifyKey = require("../middlewares/verify-key");
const locale = require("../middlewares/locale");

//App
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use("/media", express.static("media"));
app.use(verifyKey);
app.use(locale);
//Set
app.set("secret_key", config.secret_key);

//AppUse Routes
mainRoutes(app);
panelRoutes(app);

module.exports = app;
