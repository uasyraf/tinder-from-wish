const router = require("express").Router();

// Authenticated middleware
const isAuthenticatedMiddleware = require("../common/middlewares/IsAuthenticatedMiddleware");

const RecommendationController = require("./controllers/RecommendationController");

router.get(
    "/",
    [isAuthenticatedMiddleware.check],
    RecommendationController.list,
);

module.exports = router;