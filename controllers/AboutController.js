import Product from "../src/models/Product";

class AboutController {
	showAbout(req, res, next) {
		res.send("AboutPage");
	}
}

module.exports = new AboutController();
