import Cors from "cors";
import { serialize, parse } from "cookie";
import { getCookie } from "cookies-next";

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  const accessToken = req.headers.accesstoken || req.headers.accessToken;

  // Parse the cookie header into an object
  const hasUser = await fetch(
    `https://641031d1864814e5b649fc8e.mockapi.io/api/auth?limit=1&page=1`,
    {
      method: "GET",
    }
  ).then((res) => res.json());

  const user = hasUser?.[0];

  res.status(200).json({ user: user || {} });
}
