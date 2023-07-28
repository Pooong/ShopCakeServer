import Cake from "../src/models/Cake";
var ObjectId = require("mongoose").Types.ObjectId;

class AboutController {
	showAbout(req, res, next) {
		res.send("AboutPage");
	}
}

module.exports = new AboutController();
