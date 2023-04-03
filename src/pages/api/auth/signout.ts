import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const accessToken = req.headers.accesstoken || req.headers.accessToken;
  const deviceId = req.body.deviceId;
  const userId = req.body.userId;

  const hasUsers = await fetch(
    `https://641031d1864814e5b649fc8e.mockapi.io/api/auth?limit=1&page=1&userId=${userId}&accessToken=${accessToken}&deviceId=${deviceId}`,
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

  res.status(200).json({ status: "ok", message: "success" });
}
