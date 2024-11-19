-- CreateEnum
CREATE TYPE "Species" AS ENUM ('cat', 'dog');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('small', 'medium', 'large');

-- CreateEnum
CREATE TYPE "Coat" AS ENUM ('short', 'medium', 'long');

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "age" DOUBLE PRECISION,
    "species" "Species" NOT NULL,
    "breed" TEXT DEFAULT 'unknown',
    "size" "Size" NOT NULL,
    "color" TEXT NOT NULL,
    "coat" "Coat" NOT NULL,
    "city" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "org_id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
