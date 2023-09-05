import validator from "validator";
import User from "../models/User";

export const validate = function (data: User) {
	const errors = [];
	if (data.username === "") {
		errors.push("You must provide a username.");
	}
	if (validator.isEmail()) {
		errors.push("You must provide a valid email address.");
	}
	if (data.password === "") {
		errors.push("You must provide a password.");
	}
	if (data.password.length > 0 && data.password.length < 8) {
		errors.push("Password must be at least 8 characters.");
	}
	if (data.username.length > 0 && data.username.length < 3) {
		errors.push("Username must be at least 3 characters.");
	}
};

export const register = function (data: User) {
	// Validate user data
	this.validate(data);
};
