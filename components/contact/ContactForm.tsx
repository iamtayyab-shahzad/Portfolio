"use client";

import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import { useState, type FormEvent } from "react";

type FormState = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  projectType: "",
  budget: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // TODO: Connect this form to a real endpoint (Formspree, Resend, API route, etc.).
    // Example: POST JSON to `/api/contact` or a form service URL, then handle errors.
    setStatus("submitted");
  }

  if (status === "submitted") {
    return (
      <div
        role="status"
        className="rounded-lg border border-line bg-surface p-6 text-sm leading-relaxed text-muted"
      >
        This form is UI-only for now. Replace the submit handler in{" "}
        <code className="font-mono text-xs text-ink">components/contact/ContactForm.tsx</code>{" "}
        to send messages to your email or a form service.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          autoComplete="name"
          required
          value={form.name}
          onChange={(value) => setForm((current) => ({ ...current, name: value }))}
        />
        <Field
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          required
          value={form.email}
          onChange={(value) => setForm((current) => ({ ...current, email: value }))}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="projectType" className="mb-2 block text-sm text-ink">
            Project type
          </label>
          <select
            id="projectType"
            name="projectType"
            required
            value={form.projectType}
            onChange={(event) =>
              setForm((current) => ({ ...current, projectType: event.target.value }))
            }
            className="min-h-11 w-full rounded-lg border border-white/10 bg-elevated px-3 text-sm text-ink outline-none transition-colors focus:border-accent"
          >
            <option value="" disabled>
              Select a type
            </option>
            {siteConfig.contact.projectTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <Field
          id="budget"
          label="Budget (optional)"
          placeholder="Optional"
          value={form.budget}
          onChange={(value) => setForm((current) => ({ ...current, budget: value }))}
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={form.message}
          onChange={(event) =>
            setForm((current) => ({ ...current, message: event.target.value }))
          }
          className="w-full rounded-lg border border-white/10 bg-elevated px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-accent"
        />
      </div>
      <Button type="submit">Send message</Button>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  required,
  autoComplete,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-ink">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-11 w-full rounded-lg border border-white/10 bg-elevated px-3 text-sm text-ink outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}
