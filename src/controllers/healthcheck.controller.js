import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const healthcheck = asyncHandler(async (req, res) => {
  //TODO: build a healthcheck response that simply returns the OK status as json with a message
  try {
    res.status(200).json({
      message: "ok",
    });
  } catch (error) {
    throw new ApiError(500, "Internal Server Error");
  }
});

export { healthcheck };
