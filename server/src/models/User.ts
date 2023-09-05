import mongoose from "mongoose";

export interface User {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},

	lastName: {
		type: String,
		required: true,
	},

	password: {
		type: String,
		required: true,
	},

	email: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("user", userSchema);
