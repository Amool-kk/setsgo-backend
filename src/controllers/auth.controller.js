import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const options = {
  httpOnly: true,
  secure: true,
};

export const generateAccessAndRefereshToken = async (userId) => {
  try {
    const user = await User.findOne({ _id: userId });
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "testing");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    let temp = new ApiError(400, "Email and Password are required");
    return res.status(400).json({ ...temp, message: temp.message });
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    let temp = new ApiError(409, "User is already exists");
    return res.status(409).json({ ...temp, message: temp.message });
  }

  const user = await User.create({
    email,
    password,
  });

  if (!user._id) {
    let temp = new ApiError(400);
    return res.status(400).json(temp);
  }

  const data = {
    email: user.email,
    _id: user._id,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  res.status(201).json(new ApiResponse(200, data, "User registered"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    let temp = new ApiError(400, "Email and Password are required");
    return res.status(400).json({ ...temp, message: temp.message });
  }

  const existedUser = await User.findOne({ email });

  if (!existedUser) {
    let temp = new ApiError(404, "User is not exists");
    return res.status(404).json({ ...temp, message: temp.message });
  }

  if (existedUser.googleId) {
    let temp = new ApiError(404, "User is not exists");
    return res.status(404).json({ ...temp, message: temp.message });
  }

  const isPasswordVaild = await existedUser.verifyPassword(password);

  if (!isPasswordVaild) {
    let temp = new ApiError(404, "User is not exists");
    return res.status(401).json({ ...temp, message: temp.message });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshToken(
    existedUser._id
  );

  const data = {
    _id: existedUser._id,
    email: existedUser.email,
    createdAt: existedUser.createdAt,
    updatedAt: existedUser.updatedAt,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, data, "User logged In Successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(
    _id,
    {
      $set: { refreshToken: null },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .cookie("accessToken")
    .cookie("refreshToken")
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const userProfile = asyncHandler(async (req, res) => {
  const { _id, email, createdAt, updatedAt } = req.user;

  return res
    .status(200)
    .json(
      new ApiResponse(200, { _id, email, createdAt, updatedAt }, "User profile")
    );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken;

  if (!incomingRefreshToken) {
    let temp = new ApiError(401, "Unauthorized request");
    return res.status(401).json({ ...temp, message: temp.message });
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      let temp = new ApiError(401, "Invalid refresh token");
      return res.status(401).json({ ...temp, message: temp.message });
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      let temp = new ApiError(401, "Refresh token is expired or used");
      return res.status(401).json({ ...temp, message: temp.message });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshToken(
      user._id
    );

    const data = {
      _id: user?._id,
      email: user?.email,
      createdAt: user?.createdAt,
      updatedAt: user?.updatedAt,
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse(200, data, "User logged In Successfully"));
  } catch (error) {
    const temp = new ApiError(401, error?.message || "Invalid refresh token");
    return res.status(401).json({ ...temp, message: temp.message });
  }
});

export { registerUser, loginUser, logoutUser, userProfile, refreshAccessToken };
