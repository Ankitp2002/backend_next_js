import { PrismaClient } from "@prisma/client";
import { upload } from "../../../lib/multerConfig";

const prisma = new PrismaClient();

export async function createThesis(req) {
  upload.single("document");
  const {
    title,
    abstract,
    contributorAuthors,
    references,
    publishYear,
    keyword,
    status,
    authorId,
    reviewerId,
  } = req.body;
  console.log(req.body);
  try {
    // const document_path = req.file
    //   ? `../../../public/${req.file.filename}`
    //   : null;

    const thesis = await prisma.thesis.create({
      data: {
        title,
        abstract,
        contributorAuthors,
        references,
        publishYear,
        keyword,
        document: "document_path",
        status,
        author: {
          connect: { id: authorId }, // Connect to the existing author by ID
        },
        reviewer: reviewerId ? { connect: { id: reviewerId } } : undefined,
      },
    });
    return thesis;
  } catch (error) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
}
