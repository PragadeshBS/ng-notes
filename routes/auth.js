const { createUser, login } = require("../controllers/authController");

const router = require("express").Router();

router.post("/auth/signup", createUser);

router.post("/auth/login", login);

module.exports = router;
