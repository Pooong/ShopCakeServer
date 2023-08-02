import mongoose from "mongoose";
const Schema = mongoose.Schema;
import slug from "slug";
const typeProduct = new Schema(
	{
		nameType: { type: String },
		iconType: { type: String },
		slug: { type: String },
	},
	{
		timestamps: true,
	},
);

typeProduct.pre("save", function (next) {
	const nameSlug = slug(this.name);
	this.slug = nameSlug;
	this.deleted = false;
	next();
});

//Soft deleted
const mongooseDelete = require("mongoose-delete");
typeProduct.plugin(mongooseDelete, {
	deletedAt: true,
	overrideMethods: "all",
}); //{} de hien thi danh sach cac doc chua bi xoa

const TypeProduct = mongoose.model("TypeProduct", typeProduct);
export default TypeProduct;
