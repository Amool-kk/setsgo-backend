import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefereshToken = async (userId) => {
  try {
    const user = await User.findOne({ _id: userId });
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500);
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
    let temp = new ApiError(401, "User is not exists");
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

  const options = {
    httpOnly: true,
    secure: true,
  };

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
      $set: { refreshToken: undefined },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", options)
    .cookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

export { registerUser, loginUser, logoutUser };
