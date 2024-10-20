import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      const temp = new ApiError(401, "Unauthorized request");
      return res.status(401).json({ ...temp, message: temp.message });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      const temp = new ApiError(401, "Invalid Access Token");
      return res.status(402).json({ ...temp, message: temp.message });
    }

    req.user = user;
    next();
  } catch (error) {
    const temp = new ApiError(401, error?.message || "Invalid Access Token");
    return res.status(402).json({ ...temp, message: temp.message });
  }
});
