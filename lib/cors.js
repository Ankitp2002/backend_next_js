// lib/cors.js
import Cors from "cors";

// Initialize CORS middleware
const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
  origin: "*", // Change this to your frontend URL in production
});

// Helper method to wait for a middleware to execute before continuing
export function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default cors;
