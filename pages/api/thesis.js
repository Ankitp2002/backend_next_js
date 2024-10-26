import { createThesis } from "./thesis_utils/create_thesis";
import { delThesis } from "./thesis_utils/del_thesis";
import { getThesis } from "./thesis_utils/get_thesis";
import { updateThesis } from "./thesis_utils/update_thesis";

export default async function handler(req, res) {
  let thesis;
  try {
    //================================================================

    if (req.method == "GET") {
      thesis = await getThesis();
    }

    //================================================================

    if (req.method == "POST") {
      thesis = await createThesis(req);
    }

    //================================================================

    if (req.method == "PUT") {
      thesis = await updateThesis();
    }

    //================================================================

    if (req.method == "DELETE") {
      thesis = await delThesis();
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
