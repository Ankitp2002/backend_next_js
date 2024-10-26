import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function getUser() {
  try {
    const thesis = await prisma.user.findMany({});
    return thesis;
  } catch (error) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
}
