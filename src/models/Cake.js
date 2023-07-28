import mongoose from "mongoose";
const Schema = mongoose.Schema;
import slug from "slug";
const cakeSchema = new Schema(
	{
		name: { type: String, maxLength: 255 },
		description: { type: String },
		videoId: { type: String, maxLength: 255 },
		image: { type: String },
		slug: { type: String },
	},
	{
		timestamps: true,
	},
);

cakeSchema.pre("save", function (next) {
	const nameSlug = slug(this.name);
	this.slug = nameSlug;
	this.deleted = false;
	next();
});

//Soft deleted
const mongooseDelete = require("mongoose-delete");
cakeSchema.plugin(mongooseDelete, {
	deletedAt: true,
	overrideMethods: "all",
}); //{} de hien thi danh sach cac doc chua bi xoa

const Cake = mongoose.model("Cake", cakeSchema);
export default Cake;
