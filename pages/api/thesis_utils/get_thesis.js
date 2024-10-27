import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function get_author_thesis_status() {
  return await prisma.thesis.findMany({
    where: {
      status: {
        in: ["submitted", "reviewed"],
      },
    },
    include: {
      author: true,
      reviewer: true,
    },
  });
}

export async function getThesis(req) {
  try {
    let thesis;
    if (req?.query["status"] == "excluded") {
      thesis = get_author_thesis_status();
    } else {
      thesis = await prisma.thesis.findMany({
        include: {
          author: true,
          reviewer: true,
        },
      });
    }
    return thesis;
  } catch (error) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
}
