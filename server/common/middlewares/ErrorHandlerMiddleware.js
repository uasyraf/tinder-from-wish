module.exports = {
  handler: (err, req, res, next) => {
    console.log("it's working");
    console.error(err.stack);
    return res.status(500).json({ status: false, error: { message: "Internal Server Error" } });
  },
};