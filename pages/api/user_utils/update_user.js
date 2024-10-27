import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function updateUser(req) {
  const id = req?.query["id"];
  const { name, email, password } = req.body;
  try {
    return await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        password,
      },
    });
  } catch (error) {
    throw new Error("Failed to update thesis");
  } finally {
    await prisma.$disconnect();
  }
}
