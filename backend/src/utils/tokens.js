import jwt from "jsonwebtoken";

export function signAccessToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      role: user.role.name,
    },
    process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    },
  );
}

export function signRefreshToken(user) {
  return jwt.sign(
    {
      sub: user.id,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.REFRESH_EXPIRES_IN || "30d",
    },
  );
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
}
