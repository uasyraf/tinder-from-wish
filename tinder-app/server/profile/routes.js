const express = require("express");
const router = express.Router();

// Authenticated middleware
const isAuthenticatedMiddleware = require("../common/middlewares/IsAuthenticatedMiddleware");

const ProfileController = require("./controllers/ProfileController");

router.get(
    "/",
    [isAuthenticatedMiddleware.check],
    ProfileController.find,
);

router.post(
    "/",
    [isAuthenticatedMiddleware.check],
    ProfileController.create,
);

router.put(
    "/",
    [isAuthenticatedMiddleware.check],
    ProfileController.update,
);

module.exports = router;
