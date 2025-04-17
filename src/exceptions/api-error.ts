class ApiError extends Error {
	status: number;
	errors: string[];

	constructor(status: number, message: string, errors: string[] = []) {
		super(message);
		this.status = status;
		this.errors = errors;
		Object.setPrototypeOf(this, ApiError.prototype);
	}

	static BadRequest(message: string, errors: string[] = []): ApiError {
		return new ApiError(400, message, errors);
	}

	static UnauthorizedError(): ApiError {
		return new ApiError(401, "Пользователь не авторизован");
	}

	static NotFoundError(message: string): ApiError {
		return new ApiError(404, message);
	}

	static ServerError(): ApiError {
		return new ApiError(500, "Ошибка сервера")
	}

}

export default ApiError;
