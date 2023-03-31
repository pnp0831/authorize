export default async function handler(req, res) {
  const token = req.headers.token;

  const hasUser = await fetch(
    `https://641031d1864814e5b649fc8e.mockapi.io/api/auth?token=${token}&limit=1&page=1`,
    {
      method: "GET",
    }
  ).then((res) => res.json());

  const user = hasUser?.[0];

  if (user) {
    await fetch(
      `https://641031d1864814e5b649fc8e.mockapi.io/api/auth/${user.id}`,
      {
        method: "DELETE",
      }
    );
  }

  res.status(200).json({ status: "ok" });
}
