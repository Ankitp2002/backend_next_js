import { createUser } from "./user_utils/create_user";
import { delUser } from "./user_utils/del_user";
import { getUser } from "./user_utils/get_user";
import { updateUser } from "./user_utils/update_user";
import cors, { runMiddleware } from "../../lib/cors";

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  let thesis;
  try {
    //================================================================

    if (req.method == "GET") {
      thesis = await getUser(req);
    }

    //================================================================

    if (req.method == "POST") {
      thesis = await createUser(req);
    }

    //================================================================

    if (req.method == "PUT") {
      thesis = await updateUser(req);
    }

    //================================================================

    if (req.method == "DELETE") {
      thesis = await delUser(req);
    }

    //================================================================

    if (thesis) {
      res.status(200).json(thesis);
    } else {
      res.status(404).json({ error: thesis.error });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
