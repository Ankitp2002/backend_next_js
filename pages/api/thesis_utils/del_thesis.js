import { Prisma } from "@prisma/client";

export async function delThesis(id) {
  try {
    const thesis = await Prisma.thesis.delete({
      where: { id: parseInt(id) },
    });
    return thesis;
  } catch (error) {
    throw new Error("Failed to del thesis");
  } finally {
    await Prisma.$disconnect();
  }
}
