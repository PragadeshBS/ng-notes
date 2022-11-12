const notesRoutes = require("./notes");
const authRoutes = require("./auth");
const userRoutes = require("./user");

const router = require("express").Router();

router.all("/notes*", notesRoutes);

router.all("/auth*", authRoutes);

router.all("/user*", userRoutes);

module.exports = router;
