var db = require("../db");
module.exports = {
  addToCart: function(req, res) {
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;
    if (!sessionId) {
      res.redirect("/product");
      return;
    }
    var count = db
      .get("sessions")
      .find({ id: sessionId })
      .get("cart." + productId, 0)
      .value();

    db.get("sessions")
      .find({ id: sessionId })
      .set("cart." + productId, count + 1)
      .write();
    res.redirect("/product");
  },
  index: function(req, res) {
    var sessionId = req.signedCookies.sessionId;
    res.render("carts/index", {
      carts: db
        .get("sessions")
        .find({ id: sessionId })
        .value()
    });
  }
};
