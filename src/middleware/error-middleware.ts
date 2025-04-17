import { ErrorRequestHandler } from "express";
import ApiError from "../exceptions/api-error";

const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
	console.error(err);

	if (err instanceof ApiError) {
		res.status(err.status).json({
			message: err.message,
			errors: err.errors || [],
		});
	} else {
		res.status(500).json({
			message: "Непредвиденная ошибка",
		});
	}
};

export default errorMiddleware;
