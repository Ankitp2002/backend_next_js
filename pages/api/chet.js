import corsMiddleware from "../../lib/cors";
import { createChet } from "./chet_utils/create_chet";
import { delChet } from "./chet_utils/del_chet";
import { getChet } from "./chet_utils/get_chet";
import { updateChet } from "./chet_utils/update_chet";

export default async function handler(req, res) {
  await corsMiddleware(req, res);

  let thesis;
  try {
    //================================================================
    if (req.method === "OPTIONS") {
      // Handle preflight request
      return res.status(200).end(); // Must respond to OPTIONS requests
    }

    if (req.method == "GET") {
      thesis = await getChet(req);
    }

    //================================================================

    if (req.method == "POST") {
      thesis = await createChet(req);
    }

    //================================================================

    if (req.method == "PUT") {
      thesis = await updateChet();
    }

    //================================================================

    if (req.method == "DELETE") {
      thesis = await delChet();
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
