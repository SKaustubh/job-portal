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

// ====== Get JObs controller=======

export const getAllJobsController = async (req, res, next) => {
    const jobs = await jobsModel.find({ createdBy: req.user.userId });
    res.status(200).json({
        totalJobs: jobs.length,
        jobs
    })
}

// ======= update jobs ====

export const updateJobController = async (req, res, next) => {
    const { id } = req.params;
    const { company, position } = req.body

    // validation
    if (!company || !position) {
        next("Please provide all fields")
    }
    // find jobs
    const job = await jobsModel.findOne({ _id: id })
    // validation for job
    if (!job) {
        next(`no job found with this id ${id}`)
    }
    if (!req.user.userId === job.createdBy.toString()) {
        next("You are not authorized to update this job")
        return
    }
    const updateJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true // built in validators function
    })
    // res
    res.status(200).json({ updateJob })
}


// === deleteJob ===

export const deleteJobController =async (req, res,next) => {
    const {id} =req.params
    // find job by id
    const job = await jobsModel.findOne({_id:id})
    // validation
    if(!job){
        next(`no job found with this id ${id}`)
    }
    if(!req.user.userId === job.createdBy.toString()){
        next("You are not authorized to delete this job")
        return
    }
    await job.deleteOne()
    res.status(200).json({message:"Succes,Job deleted"})
}