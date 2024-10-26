import { Prisma } from "@prisma/client";

export async function updateThesis(req) {
  const { id } = req.params;
  const {
    title,
    abstract,
    contributorAuthors,
    references,
    publishYear,
    keyword,
    document,
    status,
    authorId,
    reviewerId,
  } = req.body;
  try {
    const thesis = await Prisma.thesis.update({
      where: { id: parseInt(id) },
      data: {
        title,
        abstract,
        contributorAuthors,
        references,
        publishYear,
        keyword,
        document,
        status,
        authorId,
        reviewerId,
      },
    });
    return thesis;
  } catch (error) {
    throw new Error("Failed to update thesis");
  } finally {
    await Prisma.$disconnect();
  }
}
