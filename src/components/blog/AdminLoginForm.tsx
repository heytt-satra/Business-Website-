"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAdminAction, type LoginActionState } from "@/app/admin/login/actions";

const initialState: LoginActionState = {};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Checking access..." : "Enter admin"}
    </button>
  );
}

export default function AdminLoginForm() {
  const [state, formAction] = useActionState(loginAdminAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-primary">
          Team email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-primary outline-none transition-colors focus:border-accent"
          placeholder="team@yourcompany.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium text-primary">
          Team password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-primary outline-none transition-colors focus:border-accent"
          placeholder="Enter the shared publishing password"
        />
      </div>

      {state.error ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</p>
      ) : null}

      <SubmitButton />
    </form>
  );
}
