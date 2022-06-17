import { Request } from "express";
import jwt from "jsonwebtoken";

const TOKEN_DURATION = 60 * 60;

export const generateAccessToken = (data) => {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: TOKEN_DURATION,
  });
};

export const generateRefreshToken = (data) => {
  return jwt.sign(
    { ...data, scope: "refresh_token" },
    process.env.ACCESS_TOKEN_SECRET
  );
};

export const extractTokenFromRequest = (req: Request): string | undefined => {
  const authHeader = req.headers["authorization"];
  return authHeader && authHeader.split(" ")[1];
};

export const tokenMatchesUserId = (
  token: string | undefined,
  userId: string
): boolean => {
  if (!token) return false;
  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, {
      ignoreExpiration: true,
    });
    return user.id === userId;
  } catch {
    return false;
  }
};
