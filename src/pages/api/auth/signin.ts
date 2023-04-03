import { v4 as uuidv4 } from "uuid";
import { NextApiResponse, NextApiRequest } from "next";
import config from "../../../constants/config";
import { setCookie } from "cookies-next";
import { serialize } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const bodyUser = {
      name: req.body.name,
      email: req.body.email,
      userId: req.body.userId,
      accessToken: req.body.accessToken,
      username: req.body.name,
    };

    const user = await fetch(
      "https://641031d1864814e5b649fc8e.mockapi.io/api/auth",
      {
        method: "POST",
        body: JSON.stringify(bodyUser),
        headers: { "content-type": "application/json" },
      }
    ).then((res) => res.json());

    return res.status(200).json(user);
  }
}
