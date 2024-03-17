import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";
// ====== CREATE JOB ======
export const createJobController = async (req, res, next) => {
    const { company, position } = req.body;
    if (!company || !position) {
      next("Please Provide All Fields");
    }
    req.body.createdBy = req.user.userId;
    const job = await jobsModel.create(req.body);
    res.status(201).json({ job });
  };