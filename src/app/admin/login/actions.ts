"use server";

import { redirect } from "next/navigation";
import { createAdminSession, verifyAdminCredentials } from "@/lib/admin-auth";

export interface LoginActionState {
  error?: string;
}

export async function loginAdminAction(
  _previousState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();

  if (!email || !password) {
    return { error: "Enter both email and password." };
  }

  try {
    const isValid = await verifyAdminCredentials(email, password);

    if (!isValid) {
      return { error: "That account is not allowed to publish here." };
    }

    await createAdminSession(email);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Admin access could not be configured.",
    };
  }

  redirect("/admin/blog");
}
