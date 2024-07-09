import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const rolesData = [
    {
      name: 'Директор',
      see_self: true,
      summary_table: true,
      departures: true,
      salary_reports_himself: true,
      salary_reports_common: true,
      salary_reports_sellers: false,
      finances: true,
      my_sales: false,
      common_sales: true,
      suppliers: true,
      procurements: true,
    },
    {
      name: 'Бухгалтер',
      see_self: true,
      summary_table: false,
      departures: true,
      salary_reports_himself: true,
      salary_reports_common: true,
      salary_reports_sellers: false,
      finances: false,
      my_sales: true,
      common_sales: false,
      suppliers: false,
      procurements: false,
    },
    {
      name: 'РОП',
      see_self: true,
      summary_table: true,
      departures: true,
      salary_reports_himself: true,
      salary_reports_common: false,
      salary_reports_sellers: true,
      finances: false,
      my_sales: true,
      common_sales: false,
      suppliers: false,
      procurements: false,
    },
    {
      name: 'Закупщик',
      see_self: true,
      summary_table: false,
      departures: true,
      salary_reports_himself: true,
      salary_reports_common: false,
      salary_reports_sellers: false,
      finances: false,
      my_sales: true,
      common_sales: false,
      suppliers: false,
      procurements: false,
    },
    {
      name: 'Логист',
      see_self: true,
      summary_table: false,
      departures: true,
      salary_reports_himself: true,
      salary_reports_common: false,
      salary_reports_sellers: false,
      finances: false,
      my_sales: true,
      common_sales: false,
      suppliers: false,
      procurements: false,
    },
    {
      name: 'Менеджер',
      see_self: true,
      summary_table: false,
      departures: true,
      salary_reports_himself: true,
      salary_reports_common: false,
      salary_reports_sellers: false,
      finances: false,
      my_sales: true,
      common_sales: false,
      suppliers: false,
      procurements: false,
    },
  ];

  await prisma.role.createMany({ data: rolesData, skipDuplicates: true });

  console.log('Roles created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
