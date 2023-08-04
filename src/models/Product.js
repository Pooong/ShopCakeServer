import mongoose from "mongoose";
const Schema = mongoose.Schema;
import slug from "slug";
const productSchema = new Schema(
	{
		name: { type: String },
		description: { type: String },
		price: { type: String, maxLength: 255 },
		image: { type: String },
		slug: { type: String },
	},
	{
		timestamps: true,
	},
);

productSchema.pre("save", function (next) {
	const nameSlug = slug(this.name);
	this.slug = nameSlug;
	this.deleted = false;
	next();
});

//Soft deleted
const mongooseDelete = require("mongoose-delete");
productSchema.plugin(mongooseDelete, {
	deletedAt: true,
	overrideMethods: "all",
}); //{} de hien thi danh sach cac doc chua bi xoa

const Product = mongoose.model("Product", productSchema);
export default Product;
