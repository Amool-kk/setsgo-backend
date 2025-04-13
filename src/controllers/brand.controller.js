import { Brand } from "../models/brand.model.js";
import { VerifyToken } from "../models/verify-token.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";

const getBrand = asyncHandler(async (req, res) => {
  try {
    const brand = await Brand.find({ admin: req.user._id });

    res.status(200).json(new ApiResponse(200, brand, "Ok"));
  } catch (error) {
    let temp = new ApiError(400);
    return res.status(400).json(temp);
  }
});

const createBrand = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      phoneNumber,
      description,
      timeZone,
      currency,
      logoURL,
      brandURL,
      brandColor,
      industry,
      location,
      business_hours,
    } = req.body;

    if (!name || !phoneNumber || !brandURL) {
      const temp = new ApiError(500, "Invalid Inputs");
      return res.status(500).json({ ...temp, message: temp.message });
    }

    const existBrand = await Brand.find({ admin: req.user._id });

    if (existBrand.length > 0) {
      console.log("testing");
      return res
        .status(400)
        .json(new ApiResponse(400, [], "You already have a brand."));
    }

    const brand = await Brand.create({
      name,
      phoneNumber,
      description,
      admin: req.user._id,
      team: req.user._id,
      timeZone,
      currency,
      logoURL,
      brandURL,
      brandColor,
      industry,
      location,
      business_hours,
    });

    res.status(201).json(new ApiResponse(200, brand, "Brand Created"));
  } catch (error) {
    let temp = new ApiError(400);
    return res.status(500).json({ ...temp, message: error.message });
  }
});

const updateBrand = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      phoneNumber,
      description,
      timeZone,
      currency,
      logoURL,
      brandURL,
      brandColor,
      industry,
      location,
      business_hours,
    } = req.body;

    const existBrand = await Brand.find({ admin: req.user._id });

    if (!existBrand) {
      return res.status(404).json(new ApiResponse(404, [], "Not Found"));
    }

    existBrand.name = name || existBrand.name;
    existBrand.phoneNumber = phoneNumber || existBrand.phoneNumber;
    existBrand.description = description || existBrand.description;
    existBrand.timeZone = timeZone || existBrand.timeZone;
    existBrand.currency = currency || existBrand.currency;
    existBrand.logoURL = logoURL || existBrand.logoURL;
    existBrand.brandURL = brandURL || existBrand.brandURL;
    existBrand.brandColor = brandColor || existBrand.brandColor;
    existBrand.industry = industry || existBrand.industry;
    existBrand.location = location || existBrand.location;
    existBrand.business_hours = business_hours || existBrand.business_hours;

    const updatedBrand = await existBrand.save();
    res
      .status(200)
      .json(new ApiResponse(200, updatedBrand, "Brand updated successfully"));
  } catch (error) {
    let temp = new ApiError(400);
    return res.status(500).json({ ...temp, message: error.message });
  }
});

const inviteVerify = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const existToken = await VerifyToken.findOne({ token });

  if (!existToken) {
    let temp = new ApiError(400, "Invalid link or expired");
    return res.status(400).json({ ...temp, message: temp.message });
  }

  res.status(200).json(new ApiResponse(200, existToken, "Verify Token"));
});

const updateBrandTeam = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const existToken = await VerifyToken.findOne({
    token,
  });

  if (!existToken) {
    let temp = new ApiError(400, "Invalid link or expired");
    return res.status(400).json({ ...temp, message: temp.message });
  }

  res.status(200).json(new ApiResponse(200, existToken, "Team updated"));
});

const sendTeamInvite = asyncHandler(async (req, res) => {
  try {
    const { teamEmail } = req.body;

    if (!teamEmail) {
      return res
        .status(500)
        .json(new ApiResponse(500, [], "Email is required"));
    }

    let data = await new VerifyToken({
      email: teamEmail,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const link = `${process.env.BASE_URL}/api/v1/brand/verify/${data.token}`;

    await sendEmail(teamEmail, "Team Invite", link);

    res
      .status(200)
      .json(
        new ApiResponse(200, [], "Team Invite sent to the given email account")
      );
  } catch (error) {
    let temp = new ApiError(400);
    return res.status(500).json(temp);
  }
});

export {
  getBrand,
  createBrand,
  updateBrand,
  updateBrandTeam,
  sendTeamInvite,
  inviteVerify,
};
