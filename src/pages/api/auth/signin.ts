import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
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

    res.status(200).json({
      user,
      accessToken: user.token,
    });
  }
}
