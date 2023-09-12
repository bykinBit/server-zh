import { StatusCodes } from "http-status-codes";
const errorMiddleware = (err, _req, res, _next) => {
  let errors = {
    msg: err.message,
  };
  if (err?.error && Object.keys(err.error).length) {
    errors.errors = err.error;
    errors.success = false;
  }
  if (err.message === "jwt expired") {
    err.status = 401;
    errors.code = 1;
    errors.data = null;
  }
  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json(errors);
};
export default errorMiddleware;
