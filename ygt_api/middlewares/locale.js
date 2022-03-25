const locales = require("../locales");
module.exports = (req, res, next) => {
  let lang = "en";
  if (req.headers.locale) lang = req.headers.locale;

  let messages = locales["en"];

  if (locales[lang]) messages = locales[lang];

  req.messages = messages;
  next();
};
