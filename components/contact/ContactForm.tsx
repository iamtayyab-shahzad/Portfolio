"use client";

import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { siteConfig } from "@/data/site";
import { useState, type FormEvent } from "react";

type FormState = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
};

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const initialState: FormState = {
  name: "",
  email: "",
  projectType: "",
  budget: "",
  message: "",
};

/** Formspree-compatible endpoint. Without it, the form opens the visitor's email app. */
const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

const inputClass =
  "min-h-11 w-full rounded-lg border border-white/10 bg-bg/70 px-3.5 text-sm text-ink placeholder:text-dim outline-none transition-colors focus:border-accent/70 focus:ring-2 focus:ring-accent/20";

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<Status>("idle");
  const [sentTo, setSentTo] = useState("");

  const projectLabel =
    siteConfig.contact.projectTypes.find((option) => option.value === form.projectType)?.label ??
    form.projectType;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!endpoint) {
      const subject = `Project inquiry: ${projectLabel || "New project"} — ${form.name}`;
      const body = [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Project type: ${projectLabel}`,
        form.budget ? `Budget: ${form.budget}` : "",
        "",
        form.message,
      ]
        .filter((line, index) => line !== "" || index === 4)
        .join("\n");
      window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, projectType: projectLabel }),
      });
      if (!response.ok) throw new Error(`Request failed with ${response.status}`);
      setSentTo(form.email);
      setStatus("sent");
      setForm(initialState);
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.06] p-7">
        <p className="text-base font-semibold text-ink">Thanks — your message has been sent.</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          I&apos;ll reply to {sentTo || "your email"} within 24 hours with questions and next
          steps.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-line bg-surface/80 p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Your name"
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
          <label htmlFor="projectType" className="mb-2 block text-sm font-medium text-ink">
            What do you need?
          </label>
          <select
            id="projectType"
            name="projectType"
            required
            value={form.projectType}
            onChange={(event) =>
              setForm((current) => ({ ...current, projectType: event.target.value }))
            }
            className={inputClass}
          >
            <option value="" disabled>
              Select a project type
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
          label="Budget range (optional)"
          placeholder="e.g. $500 – $2,000"
          value={form.budget}
          onChange={(value) => setForm((current) => ({ ...current, budget: value }))}
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
          Tell me about the project
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="What should it do, who will use it, and is there a deadline?"
          value={form.message}
          onChange={(event) =>
            setForm((current) => ({ ...current, message: event.target.value }))
          }
          className={`${inputClass} py-3`}
        />
      </div>

      {status === "error" ? (
        <p role="alert" className="text-sm text-red-300">
          Something went wrong sending your message. Please email me directly at{" "}
          <a className="underline" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
          .
        </p>
      ) : null}
      {status === "mailto" ? (
        <p role="status" className="text-sm text-muted">
          Your email app should open with the message ready to send. If it doesn&apos;t, email me
          at{" "}
          <a className="text-accent underline" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
          .
        </p>
      ) : null}

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send project details"}
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
        <p className="text-xs text-dim">I reply within 24 hours.</p>
      </div>
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
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
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
        className={inputClass}
      />
    </div>
  );
}
