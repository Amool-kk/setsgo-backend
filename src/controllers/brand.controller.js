import { Brand } from "../models/brand.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler.js";

const getBrand = asyncHandler(async (req, res) => {});

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

    console.log(req.user._id);

    if (!name || !phoneNumber || !brandURL) {
      const temp = new ApiError(500, "Invalid Inputs");
      return res.status(500).json({ ...temp, message: temp.message });
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
    return res.status(500).json(temp);
  }
});

const updateBrand = asyncHandler(async (req, res) => {});

const updateBrandTeam = asyncHandler(async (req, res) => {});

export { getBrand, createBrand, updateBrand, updateBrandTeam };
