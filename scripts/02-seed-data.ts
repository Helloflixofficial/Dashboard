import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@novacrm.com" },
    update: {},
    create: {
      email: "admin@novacrm.com",
      name: "Admin User",
      role: "ADMIN",
    },
  })

  // Create sample employees
  const employees = await Promise.all([
    prisma.user.upsert({
      where: { email: "john.doe@novacrm.com" },
      update: {},
      create: {
        email: "john.doe@novacrm.com",
        name: "John Doe",
        role: "USER",
        employeeProfile: {
          create: {
            employeeId: "EMP001",
            department: "Engineering",
            position: "Senior Developer",
            salary: 85000,
            joinDate: new Date("2023-01-15"),
            status: "ACTIVE",
            performanceScore: 4.5,
            performanceGrade: "A",
          },
        },
      },
    }),
    prisma.user.upsert({
      where: { email: "jane.smith@novacrm.com" },
      update: {},
      create: {
        email: "jane.smith@novacrm.com",
        name: "Jane Smith",
        role: "MANAGER",
        employeeProfile: {
          create: {
            employeeId: "EMP002",
            department: "Design",
            position: "Design Lead",
            salary: 78000,
            joinDate: new Date("2022-08-20"),
            status: "ACTIVE",
            performanceScore: 4.8,
            performanceGrade: "A+",
          },
        },
      },
    }),
    prisma.user.upsert({
      where: { email: "mike.johnson@novacrm.com" },
      update: {},
      create: {
        email: "mike.johnson@novacrm.com",
        name: "Mike Johnson",
        role: "USER",
        employeeProfile: {
          create: {
            employeeId: "EMP003",
            department: "Operations",
            position: "Operations Manager",
            salary: 72000,
            joinDate: new Date("2023-03-10"),
            status: "ACTIVE",
            performanceScore: 4.2,
            performanceGrade: "B+",
          },
        },
      },
    }),
  ])

  // Create sample projects
  const project1 = await prisma.project.create({
    data: {
      name: "Website Redesign",
      description: "Complete redesign of the company website",
      status: "IN_PROGRESS",
      priority: "HIGH",
      progress: 65,
      budget: 50000,
      spent: 32500,
      startDate: new Date("2024-01-01"),
      dueDate: new Date("2024-03-31"),
      creatorId: adminUser.id,
      assignments: {
        create: [{ userId: employees[0].id }, { userId: employees[1].id }],
      },
    },
  })

  // Create sample invoices
  await prisma.invoice.createMany({
    data: [
      {
        invoiceId: "INV-2024-001",
        clientName: "Acme Corp",
        clientEmail: "billing@acme.com",
        amount: 15000,
        status: "PAID",
        issuedAt: new Date("2024-01-15"),
        dueDate: new Date("2024-02-15"),
        paidAt: new Date("2024-02-10"),
      },
      {
        invoiceId: "INV-2024-002",
        clientName: "TechStart Inc",
        clientEmail: "finance@techstart.com",
        amount: 8500,
        status: "PENDING",
        issuedAt: new Date("2024-02-01"),
        dueDate: new Date("2024-03-01"),
      },
    ],
  })

  // Create sample job openings
  await prisma.jobOpening.create({
    data: {
      title: "Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "FULL_TIME",
      description: "We are looking for a skilled Frontend Developer...",
      requirements: "React, TypeScript, 3+ years experience",
      salary: "$70,000 - $90,000",
      status: "OPEN",
      candidates: {
        create: [
          {
            name: "Alice Cooper",
            email: "alice@example.com",
            phone: "+1-555-0123",
            status: "INTERVIEW",
          },
          {
            name: "Bob Wilson",
            email: "bob@example.com",
            phone: "+1-555-0124",
            status: "SCREENING",
          },
        ],
      },
    },
  })

  // Create sample shortened links
  await prisma.link.createMany({
    data: [
      {
        originalUrl: "https://www.example.com/very-long-url-that-needs-shortening",
        shortCode: "abc123",
        title: "Example Website",
        clicks: 42,
        userId: adminUser.id,
        countdownSeconds: 5,
      },
      {
        originalUrl: "https://github.com/vercel/next.js",
        shortCode: "nextjs",
        title: "Next.js Repository",
        clicks: 128,
        userId: employees[0].id,
        countdownSeconds: 3,
      },
    ],
  })

  console.log("✅ Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
