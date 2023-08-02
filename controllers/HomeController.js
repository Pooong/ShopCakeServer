import Product from "../src/models/Product";
var ObjectId = require("mongoose").Types.ObjectId;

class HomeController {
	showHome(req, res, next) {
		res.send("HomePage");
	}
}

module.exports = new HomeController();
