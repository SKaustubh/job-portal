// error middleware || next function

// 1. create a file in middlewares folder called errorMiddleware.js

const errorMiddleware = (err, req, res, next) => {
    console.log(err);
    const defaultErrors = {
        statusCode: 500,
        message: err,
    }


    // if missing field error
    if (err.name === 'ValidationError') {
        defaultErrors.statusCode = 400
        defaultErrors.message = Object.values(err.errors).map(item => item.message).join(',')
    }

    // duplicate error
    if (err.code && err.code === 11000) {
        defaultErrors.statusCode = 400
        defaultErrors.message = `${Object.keys(
            err.keyValue
        )}Field must be unique`;
    }

    res.status(defaultErrors.statusCode).json({ message: defaultErrors.message })
};

export default errorMiddleware;