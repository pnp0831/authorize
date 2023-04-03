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
    console.log("signin");
    const hasUsers = await fetch(
      `https://641031d1864814e5b649fc8e.mockapi.io/api/auth`,
      {
        method: "GET",
      }
    ).then((res) => res.json());

    const promise = hasUsers.map((item) =>
      fetch(`https://641031d1864814e5b649fc8e.mockapi.io/api/auth/${item.id}`, {
        method: "DELETE",
      })
    );

    await Promise.all(promise);

    const bodyUser = {
      name: req.body.name,
      email: req.body.email,
      userId: req.body.userId,
      id: req.body.userId,
      accessToken: req.body.accessToken,
      expired: req.body.expired,
      deviceId: req.body.deviceId,
      image: req.body.image,
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
