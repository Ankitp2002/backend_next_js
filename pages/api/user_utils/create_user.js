import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUser(req) {
  const { name, email, role, password } = req.body;
  console.log(req.body);
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        role,
        password,
      },
    });
    return user;
  } catch (error) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
}
