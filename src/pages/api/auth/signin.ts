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
    const body = {
      username: req.body.username || "pam",
      password: req.body.password || "123456",
    };

    const date = new Date();
    date.setDate(date.getDate() + 1);

    const bodyUser = {
      ...body,
      expired: date,
      token: uuidv4(),
      name: body.username,
      email: `${body.username}@gmail.com`,
    };

    const user = await fetch(
      "https://641031d1864814e5b649fc8e.mockapi.io/api/auth",
      {
        method: "POST",
        body: JSON.stringify(bodyUser),
        headers: { "content-type": "application/json" },
      }
    ).then((res) => res.json());

    const domain = Object.keys(process.env).filter((item) =>
      item.startsWith("NEXT_PUBLIC_DOMAIN")
    );

    const a = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_2}/api/auth/trigger`,
      {
        method: "POST",
        body: JSON.stringify({
          token: bodyUser.token,
        }),
        headers: {
          "content-type": "application/json",
          token: bodyUser.token,
        },
      }
    ).then((res) => res.json());
    console.log('"a', a);

    const b = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_1}/api/auth/trigger`,
      {
        method: "POST",
        body: JSON.stringify({
          token: bodyUser.token,
        }),
        headers: {
          "content-type": "application/json",
          token: bodyUser.token,
        },
      }
    ).then((res) => res.json());

    console.log('"ab', b);
    const serializedCookie = serialize(
      "accessToken",
      user.token,
      config.cookieConfig
    );

    res.setHeader("Set-Cookie", serializedCookie);

    return res.status(200).json({
      user,
      accessToken: user.token,
    });
  }
}
