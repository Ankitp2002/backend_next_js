import { Prisma } from "@prisma/client";

export async function updateUser(req) {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const thesis = await Prisma.thesis.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        password,
      },
    });
    return thesis;
  } catch (error) {
    throw new Error("Failed to update thesis");
  } finally {
    await Prisma.$disconnect();
  }
}
