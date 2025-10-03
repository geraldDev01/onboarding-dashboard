"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "super-secret-key"; // in .env.local

const HARDCODED_CREDENTIALS = {
  email: "admin@rebuhr.com",
  password: "password123",
  name: "Admin User",
};

// --- LOGIN ---
export async function loginAction(email: string, password: string) {
  if (
    email === HARDCODED_CREDENTIALS.email &&
    password === HARDCODED_CREDENTIALS.password
  ) {
    // Create a signed JWT token
    const token = jwt.sign(
      { email: HARDCODED_CREDENTIALS.email, name: HARDCODED_CREDENTIALS.name },
      SECRET_KEY,
      { expiresIn: "7d" }
    );

    (await cookies()).set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return {
      success: true,
      user: {
        email: HARDCODED_CREDENTIALS.email,
        name: HARDCODED_CREDENTIALS.name,
      },
    };
  }

  return { success: false, error: "Invalid credentials" };
}

// --- LOGOUT ---
export async function logoutAction() {
  (await cookies()).set("auth-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
  });

  return { success: true };
}

// --- GET CURRENT USER ---
export async function getUserAction() {
  const token = (await cookies()).get("auth-token")?.value;

  if (!token) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as {
      email: string;
      name: string;
    };

    return {
      success: true,
      user: { email: decoded.email, name: decoded.name },
    };
  } catch {
    return { success: false, error: "Invalid or expired token" };
  }
}