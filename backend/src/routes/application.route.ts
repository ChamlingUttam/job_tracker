import {Router} from "express"
import { createJob, getJob, getJobByTypeStatus, jobDelete, updateJob } from "../controllers/application.controller"

const applicationRouter = Router()

applicationRouter.post('/create',createJob)
applicationRouter.get("/getJob",getJob)
applicationRouter.get("/getJobByTypeStatus",getJobByTypeStatus)
applicationRouter.delete("/jobDelete/:id",jobDelete)
applicationRouter.patch("/updateJob/:id",updateJob)

export default applicationRouter