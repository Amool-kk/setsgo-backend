import { Service } from "../models/service.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllServices = asyncHandler(async (req, res) => {
  try {
    const data = await Service.find({ team: req.user._id });

    res.status(200).json(new ApiResponse(200, data, "All Service"));
  } catch (error) {}
});

const updateService = asyncHandler(async (req, res) => {});

const changeHiddenState = asyncHandler(async (req, res) => {});

const addService = asyncHandler(async (req, res) => {
  const { title, icon, description, duration, bufferTime, cost, hidden } =
    req.body;

  if (!title || !icon || !description || !duration || !bufferTime || !cost) {
    const temp = new ApiError(500, "Invalid Inputs");
    return res.status(500).json({ ...temp, message: temp.message });
  }

  const service = await Service.create({
    title,
    icon,
    description,
    duration,
    bufferTime,
    cost,
    team: req.user._id,
    hidden,
  });

  if (!service._id) {
    let temp = new ApiError(400);
    return res.status(400).json(temp);
  }

  res.status(201).json(new ApiResponse(200, service, "Service Created"));
});

export { getAllServices, addService, updateService, changeHiddenState };
