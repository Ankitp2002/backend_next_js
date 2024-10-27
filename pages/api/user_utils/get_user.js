import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function get_user_by_role(req) {
  return await prisma.user.findMany({
    where: { role: req.query["role"] },
  });
}
export async function getUser(req) {
  try {
    let user;
    if (req?.query["role"]) {
      user = get_user_by_role(req);
    } else {
      user = await prisma.user.findMany({});
    }
    return user;
  } catch (error) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
}
