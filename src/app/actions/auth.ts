"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import type { LoginCredentials, AuthResponse, User } from "@/types/auth";

const SECRET_KEY = process.env.JWT_SECRET || "super-secret-key"; // in .env.local

const HARDCODED_CREDENTIALS = {
  email: "admin@rebuhr.com",
  password: "password123",
  name: "Admin User",
};

// --- LOGIN ---
export async function loginAction(credentials: LoginCredentials): Promise<AuthResponse<{ user: User; token: string }>> {
  try {
    if (
      credentials.email === HARDCODED_CREDENTIALS.email &&
      credentials.password === HARDCODED_CREDENTIALS.password
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
        data: {
          user: {
            email: HARDCODED_CREDENTIALS.email,
            name: HARDCODED_CREDENTIALS.name,
          },
          token,
        },
      };
    }

    return { success: false, error: "Invalid credentials" };
  } catch (error) {
    return { success: false, error: "Login failed due to server error" };
  }
}

// --- LOGOUT ---
export async function logoutAction(): Promise<AuthResponse> {
  try {
    (await cookies()).set("auth-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: "Logout failed due to server error" };
  }
}

// --- GET CURRENT USER ---
export async function getUserAction(): Promise<AuthResponse<User>> {
  try {
    const token = (await cookies()).get("auth-token")?.value;

    if (!token) {
      return { success: false, error: "Not authenticated" };
    }

    const decoded = jwt.verify(token, SECRET_KEY);

    if (typeof decoded === "object") {
      const user: User = {
        email: decoded.email as string,
        name: decoded.name as string,
      };
      return { success: true, data: user };
    }

    return { success: false, error: "Invalid token payload" };
  } catch {
    return { success: false, error: "Authentication check failed" };
  }
}