import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},

	description: String,

	priority: {
		type: String,
		default: "Medium",
	},

	isChecked: {
		type: Boolean,
		default: false,
	},

	dueDate: {
		type: Date,
		default: Date.now(),
	},

	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

module.exports = mongoose.model("Todo", todoSchema);
