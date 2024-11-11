// lib/cors.js
import Cors from "cors";

// Initialize CORS middleware with specific settings
const cors = Cors({
  // Specify allowed HTTP methods; avoid using "*" to prevent unintended method access
  methods: ["GET", "POST", "OPTIONS", "DELETE", "PUT", "PATCH"],
  // Set allowed origin; in production, replace "*" with the actual frontend URL (e.g., "http://your-frontend-url.com")
  origin: process.env.NODE_ENV === "production" ? "http://localhost:3000" : "*",
  // Optional: you can also specify allowed headers if needed
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Enable if you need to send cookies or authentication headers
});

// Helper function to run middleware
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
