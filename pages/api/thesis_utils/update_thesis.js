import { PrismaClient } from "@prisma/client";
import { token_user_details } from "../user_utils/create_user";
import { createNotification } from "../notification_utils/create_notification";

const prisma = new PrismaClient();
export async function updateThesis(req) {
  const id = req?.query["id"];
  const { status, comment } = req.body;
  let publishYear = null;
  if (status == "published") {
    publishYear = `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
  }
  const token = req?.headers["authorization"]?.split(" ")[1];
  let user;
  if (token) {
    user = await token_user_details(token);
  } else {
  }

  try {
    const thesis = await prisma.thesis.update({
      where: { id: parseInt(id) },
      data: {
        status,
        reviewerId: user.user_id,
        publishYear,
        review_comment: comment,
      },
    });
    //Create Notification For Author
    const author = await prisma.user.findMany({
      where: {
        id: thesis.authorId, // Assuming the role is stored in the 'role' field
      },
    });
    const role = status == "published" ? "user" : "author";
    const message =
      role == "user"
        ? `New Thesis Published Title : ${thesis.title} by Author : ${author[0].name} Email : ${author[0].email}`
        : `Please Chack Thesis Status Title : ${thesis.title}`;

    createNotification(role, message, thesis.id);
    return { message: "Review status updated successfully" };
  } catch (error) {
    throw new Error("Failed to update thesis");
  } finally {
    await prisma.$disconnect();
  }
}
