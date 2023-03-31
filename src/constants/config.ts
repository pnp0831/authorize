const config = {
  cookieConfig: {
    path: "/",
    domain:
      process.env.NODE_ENV === "development" ? "localhost" : `.vercal.app`,
    maxAge: 60 * 6 * 24,
  },
};

export default config;
