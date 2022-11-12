const { getUserDetails } = require("../controllers/userController");

const router = require("express").Router();

router.get("/user", getUserDetails);

module.exports = router;
