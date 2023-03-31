import { v4 as uuidv4 } from "uuid";
import { NextApiResponse, NextApiRequest } from "next";
import config from "../../../constants/config";
import { setCookie } from "cookies-next";

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

    const promises = Object.keys(process.env)
      .filter((item) => item.startsWith("NEXT_PUBLIC_DOMAIN"))
      .map(async (item) => {
        return await fetch(`${process.env[item]}/api/auth/trigger`, {
          method: "POST",
          body: JSON.stringify({
            token: bodyUser.token,
          }),
          headers: { "content-type": "application/json" },
        }).then((res) => res.json());
      });

    console.log("[r", process.env.NODE_ENV);
    setCookie("accessToken", bodyUser.token, {
      req,
      res,
      ...config.cookieConfig,
    });

    res.status(200).json({
      user,
      accessToken: user.token,
    });
  }
}
