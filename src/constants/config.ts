const config = {
  cookieConfig: {
    path: "/",
    domain:
      process.env.NODE_ENV === "development" ? "localhost" : `.vercel.app`,
    maxAge: 60 * 6 * 24,
  },
};

export default config;
