const express = require("express");
const router = express.Router();

// Authenticated middleware
const isAuthenticatedMiddleware = require("../common/middlewares/IsAuthenticatedMiddleware");

router.get(
    "/",
    [isAuthenticatedMiddleware.check],
    UserController.find,
);

router.get(
    "/all",
    [isAuthenticatedMiddleware.check],
    UserController.list,
);

module.exports = router;

