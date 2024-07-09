-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roleName" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "see_self" BOOLEAN NOT NULL,
    "summary_table" BOOLEAN NOT NULL,
    "departures" BOOLEAN NOT NULL,
    "salary_reports_himself" BOOLEAN NOT NULL,
    "salary_reports_common" BOOLEAN NOT NULL,
    "salary_reports_sellers" BOOLEAN NOT NULL,
    "finances" BOOLEAN NOT NULL,
    "my_sales" BOOLEAN NOT NULL,
    "common_sales" BOOLEAN NOT NULL,
    "suppliers" BOOLEAN NOT NULL,
    "procurements" BOOLEAN NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleName_fkey" FOREIGN KEY ("roleName") REFERENCES "Role"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
