import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const ToDo = await prisma.ticketStatus.create({
    data: {
        id: 0,
        description: "To Do"
      },
  })
  const InProgress = await prisma.ticketStatus.create({
    data: {
        id: 1,
        description: "In Progress"
      },
  })
  const InReview = await prisma.ticketStatus.create({
    data: {
        id: 2,
        description: "In Review"
      },
  })
  const Done = await prisma.ticketStatus.create({
    data: {
        id: 3,
        description: "Done"
      },
  })
  console.log({ ToDo, InProgress, InReview, Done })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })