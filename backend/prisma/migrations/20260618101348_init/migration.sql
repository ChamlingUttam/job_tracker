-- CreateEnum
CREATE TYPE "jobType" AS ENUM ('Internship', 'Full_time', 'Part_time');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Applied', 'Interviewing', 'Offer', 'Rejected');

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "jobType" "jobType" NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Applied',
    "appliedDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);
