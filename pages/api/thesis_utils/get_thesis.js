import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function getThesis() {
  try {
    const thesis = await prisma.thesis.findMany({
      include: {
        author: true,
        reviewer: true,
      },
    });
    return thesis;
  } catch (error) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
}
