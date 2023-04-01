const config = {
  cookieConfig: {
    path: "/",
    domain:
      process.env.NODE_ENV === "development"
        ? "localhost"
        : process.ENV.NEXT_DOMAIN || ".vercel.app",
    httpOnly: false,
  },
};

export default config;
