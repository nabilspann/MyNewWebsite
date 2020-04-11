module.exports = (req, res, next) => {
  const { status } = req.body;
  if (
    status !== "Start of development" &&
    status !== "In development" &&
    status !== "Finished product"
  ) {
    // res.statusMessage = "Current password does not match";
    // res.status(400).end();
    return res
      .status(400)
      .send(
        'Please pass a valid status: "Start of development", "In development", or "Finished product"'
      )
      .end();
  }
  next();
};
