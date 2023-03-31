import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";
import Cors from "cors";

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(req: NextRequest, res: NextResponse) {
  await runMiddleware(req, res, cors);
  const token = req.headers.token;

  const hasUser = await fetch(
    `https://641031d1864814e5b649fc8e.mockapi.io/api/auth?token=${token}&limit=1&page=1`,
    {
      method: "GET",
    }
  ).then((res) => res.json());

  const user = hasUser?.[0];

  res.status(200).json({ user });
}
