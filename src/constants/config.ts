const config = {
  cookieConfig: {
    path: "/",
    domain:
      process.env.NODE_ENV === "development"
        ? "localhost"
        : PROCESS.ENV.NEXT_DOMAIN || ".vercel.app",
    httpOnly: false,
  },
};

export default config;
