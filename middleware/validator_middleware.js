const { validationResult } = require("express-validator");

async function middlewareValidation(req, res, next) {
  const error = validationResult(req);
  if (!error.isEmpty())
    return res.status(442).json({
      status: "gagal",
      error: error.mapped(),
    });
  next();
}

module.exports = { middlewareValidation };
