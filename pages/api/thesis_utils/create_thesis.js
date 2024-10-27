import { PrismaClient } from "@prisma/client";
import { upload } from "../../../lib/multerConfig";
import path from "path";
import fs from "fs";
const prisma = new PrismaClient();
function file_upload(filename, base64Data) {
  // Decode Base64 string to binary data
  const buffer = Buffer.from(base64Data, "base64");

  // Set the storage path
  const storagePath = path.join("public", filename);

  // Write the binary data to the file
  fs.writeFile(storagePath, buffer, (err) => {
    if (err) {
      console.error("Error saving file:", err);
    } else {
      console.log("File saved successfully:", storagePath);
    }
  });
}
function parseFormData(rawData) {
  // Split the data using the boundary defined in the input (the random part)
  const boundary = rawData.split("\n")[0].trim(); // Get the boundary
  const parts = rawData.split(boundary).slice(1, -1); // split and remove first and last empty parts

  const parsedData = {};

  parts.forEach((part) => {
    const nameMatch = part.match(/name="(.+?)"/);
    const valueMatch = part.match(/\r?\n\r?\n([\s\S]*)$/);

    if (nameMatch && valueMatch) {
      const name = nameMatch[1].trim();
      let value = valueMatch[1].trim();

      if (value == "null") {
        value = null;
      }
      if (name == "authorId" || name == "reviewerId") {
        if (value == "null") {
          value = null;
        } else {
          value = parseInt(value);
        }
      }
      parsedData[name] = value;
    }
  });

  return parsedData;
}

export async function createThesis(req) {
  const data = parseFormData(req.body);
  // upload.single("document");
  file_upload(data["filename"], data["file"]);
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
  } = data;

  try {
    const thesis = await prisma.thesis.create({
      data: {
        title,
        abstract,
        contributorAuthors,
        references,
        publishYear,
        keyword,
        document: data.filename,
        status,
        author: {
          connect: { id: 1 }, // Connect to the existing author by ID
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
