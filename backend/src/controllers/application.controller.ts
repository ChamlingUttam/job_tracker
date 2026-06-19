import { Request,Response } from "express"
import {prisma} from "../lib/prisma"
import { Prisma } from "@prisma/client"

const JOB_TYPES = ['Internship', 'Full_time', 'Part_time']
const STATUS = ['Applied','Interviewing','Offer','Rejected']


//create the job
export const createJob = async(req:Request,res:Response)=>{
    const {companyName,jobTitle,jobType,status,appliedDate} = req.body


    try {

        if(!companyName || !jobTitle || !status || !jobType || !appliedDate){
           return res.status(400).json({message:"all field are required"})
        }

        if(!JOB_TYPES.includes(jobType)){
            return res.status(400).json({message:`job type must be ${JOB_TYPES.join(", ")} `})
        }

        if(!STATUS.includes(status)){
            return res.status(400).json({message:`status of job must be ${STATUS.join(", ")}`})
        }

        const result = await prisma.job.create({
            data:{
                companyName,
                jobTitle,
                jobType,
                appliedDate:new Date(appliedDate),
                status
            }
        })

        return res.status(201).json(result)
        
    } catch (error:unknown) {
        if(error instanceof Error){
            res.status(500).json({message:error.message})
        }else{
            res.status(500).json({message:"something went wrong with creating"})
        }
        
    }
}



//get all the job
export const getJob = async (req:Request,res:Response)=>{
    try {
        const result  = await prisma.job.findMany()

        res.status(200).json({data:{
            result
        }})
    } catch (error:unknown) {
          if(error instanceof Error){
            res.status(500).json({message:error.message})
        }else{
            res.status(500).json({message:"something went wrong with creating"})
        }
        
    }
}


//get job by status and jobType and companyName

export const getJobByTypeStatus = async(req:Request,res:Response)=>{

    try {

        const {jobType,status,companyName}= req.query
        const where:any={}

        if(jobType && !JOB_TYPES.includes(jobType as string)){
            return res.status(400).json({message:`job type must be ${JOB_TYPES.join(", ")}`})
        }

        if(status && !STATUS.includes(status as string)){
            return res.status(400).json({message:`status must be ${STATUS.join(", ")}`})
        }

        if(jobType){
            where.jobType = jobType
        }

        if(status){
            where.status = status
        }

        if(companyName){
            where.companyName = {
                contains: companyName as string,mode:"insensitive"
            }
        }
        const result = await prisma.job.findMany({
            where,
            orderBy:{
                appliedDate:"desc"
            }
        })

        if (result.length === 0) {
    return res.status(404).json({ message: "no jobs found matching the given criteria" })
}
        return res.status(200).json({
            data:result
        })
        
    } catch (error:unknown) {
         if(error instanceof Error){
            res.status(500).json({message:error.message})
        }else{
            res.status(500).json({message:"something went wrong with creating"})
        }
    }
}



//delete the job Application 

export const jobDelete = async (req:Request,res:Response)=>{

    try {
    
        const { id }= req.params
        const checkJob = await prisma.job.findUnique({where:{ id  }})

        if(!checkJob){
            return  res.status(404).json({message:"job not found"})
        }

        await prisma.job.delete({where:{id}})

        return res.status(200).json("deleted successfully")


    } catch (error:unknown) {
         if(error instanceof Error){
            res.status(500).json({message:error.message})
        }else{
            res.status(500).json({message:"something went wrong with creating"})
        }
    }
}


//update the application 
// update the job application
export const updateJob = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { companyName, jobTitle, jobType, status, appliedDate } = req.body

        if (!id) {
            return res.status(400).json({ message: "id is required" })
        }

        const checkJob = await prisma.job.findUnique({ where: { id } })

        if (!checkJob) {
            return res.status(404).json({ message: "job not found" })
        }

        if (jobType && !JOB_TYPES.includes(jobType)) {
            return res.status(400).json({ message: `job type must be ${JOB_TYPES.join(", ")}` })
        }

        if (status && !STATUS.includes(status)) {
            return res.status(400).json({ message: `status of job must be ${STATUS.join(", ")}` })
        }

        const data: Prisma.JobUpdateInput = {}

        if (companyName !== undefined) data.companyName = companyName
        if (jobTitle !== undefined) data.jobTitle = jobTitle
        if (jobType !== undefined) data.jobType = jobType
        if (status !== undefined) data.status = status
        if (appliedDate !== undefined) data.appliedDate = new Date(appliedDate)

        if (Object.keys(data).length === 0) {
            return res.status(400).json({ message: "no fields provided to update" })
        }

        const result = await prisma.job.update({
            where: { id },
            data
        })

        return res.status(200).json({ data: result })

    } catch (error: unknown) {
         if(error instanceof Error){
            res.status(500).json({message:error.message})
        }else{
            res.status(500).json({message:"something went wrong with creating"})
        }
    }
}