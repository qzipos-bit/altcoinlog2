-- CreateEnum
CREATE TYPE "LeadSource" AS ENUM ('ANTISCAM_AUDIT', 'NEWSLETTER', 'REGISTRATION_INTEREST');

-- CreateTable
CREATE TABLE "MarketingLead" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "source" "LeadSource" NOT NULL,
    "message" TEXT,

    CONSTRAINT "MarketingLead_pkey" PRIMARY KEY ("id")
);
