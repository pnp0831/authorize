import Cors from "cors";
import DeviceDetector from "device-detector-js";

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

const parseUserAgent = (userAgent) => {
  const deviceDetector = new DeviceDetector();

  const device = deviceDetector.parse(userAgent);

  return device;
};

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  const accessToken = req.headers.accesstoken || req.headers.accessToken;
  const deviceId = req.headers.deviceid || req.headers.deviceId;

  let url = `https://641031d1864814e5b649fc8e.mockapi.io/api/auth?limit=1&page=1&deviceId=${deviceId}`;

  if (accessToken) {
    url = `${url}&accessToken=${accessToken}`;
  }

  // Parse the cookie header into an object
  const hasUser = await fetch(url, {
    method: "GET",
  }).then((res) => res.json());

  const user = hasUser?.[0];

  res.status(200).json({ user: user || {} });
}
