const config = {
  cookieConfig: {
    path: "/",
    domain:
      process.env.NODE_ENV === "development"
        ? "localhost"
        : process.env.NEXT_PUBLIC_AUTH_URL || ".vercel.app",
    httpOnly: false,
  },
};

export default config;
