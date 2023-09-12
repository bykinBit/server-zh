import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import HttpException from "../exception/httpException.js";
import { StatusCodes } from "http-status-codes";
export const verifyAuth = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    next(new HttpException(StatusCodes.UNAUTHORIZED, "用户token错误！"));
    return;
  }
  const token = authorization?.trim();
  try {
    if (token) {
      const payload = jwt.verify(token, process.env.JWT_SECRET_KEY || "bykey");
      if (payload.id) {
        req._uId = payload.id;
        next();
      } else {
        next(new HttpException(StatusCodes.UNAUTHORIZED, "用户token有误！"));
      }
    } else {
      next(new HttpException(StatusCodes.UNAUTHORIZED, "用户token不完整！"));
    }
  } catch (error) {
    next(new HttpException(StatusCodes.UNAUTHORIZED, error?.message));
  }
};
