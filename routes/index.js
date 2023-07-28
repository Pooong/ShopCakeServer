import cake from "./cake";
import about from "./about";
import home from "./home";
/* GET home page. */

function route(app) {
	app.use("/api/cake", cake);
	app.use("/api/about", about);
	app.use("/api/home", home);

	app.use("/", function (req, res, next) {
		res.render("index", { title: "Express" });
	});
}

module.exports = route;
