import { Request, Response } from "express";
import userService from "../services/userService";

exports.register = async function (req: Request, res: Response) {
	try {
		const user = await userService.register(req.body);
	} catch {}
};
