import mongoose from "mongoose";
const Schema = mongoose.Schema;
import slug from "slug";
const userSchema = new Schema(
	{
		fullname: { type: String, require: true },
		numberphone: { type: String, require: true },
		address: { type: String, require: true },
		admin: { type: Boolean, default: false },
		username: { type: String, require: true, maxLength: 255 },
		password: { type: String, require: true },
		slug: { type: String, require: true },
	},
	{
		timestamps: true,
	},
);

userSchema.pre("save", function (next) {
	const nameSlug = slug(this.fullname);
	this.slug = nameSlug;
	this.deleted = false;
	next();
});

//Soft deleted
const mongooseDelete = require("mongoose-delete");
userSchema.plugin(mongooseDelete, {
	deletedAt: true,
	overrideMethods: "all",
}); //{} de hien thi danh sach cac doc chua bi xoa

const userModel = mongoose.model("userModel", userSchema);
export default userModel;
