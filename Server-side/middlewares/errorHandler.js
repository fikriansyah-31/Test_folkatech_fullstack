const errorHandler = (err, req, res, next) => {
    let message = "Internal server error";
    let code = 500;

    if (
        err.name === "SequelizeValidationError" ||
        err.name === "SequelizeUniqueConstraintError" ||
        err.name === "ValidationErrorItem"
    ) {
        message = err.errors[0].message;
        code = 400;
    } else if (err.name === "empty_email") {
        message = "Email is required";
        code = 400;
    } else if (err.name === "empty_password") {
        message = "Password is required";
        code = 400;
    } else if (err.name === "unauthorized") {
        message = "Email / Password is wrong";
        code = 401;
    } else if (err.name === "DataNotFound") {
        message = "Data Not Found"
        code = 404
    } else if (err.name === "Unauthenticated") {
        message = "Unauthenticated"
        code = 401
    }
    res.status(code).json({ message });
}

module.exports = errorHandler