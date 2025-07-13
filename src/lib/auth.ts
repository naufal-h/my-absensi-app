import { apiFetch } from "./api-auth";

export interface UserResponse {
  id: number;
  email: string;
  role: "admin" | "employee";
}

export async function login(
  email: string,
  password: string
): Promise<UserResponse> {
  return apiFetch("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function getUser() {
  return apiFetch("/me");
}

export async function logout() {
  return apiFetch("/logout", {
    method: "POST",
  });
}
