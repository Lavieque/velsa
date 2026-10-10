"use client";

import { type FormEvent, useState } from "react";
import type { Content } from "@/lib/content";
import { AnimatedItem, AnimatedSection } from "./AnimatedSection";

const fieldClass =
  "rounded-lg border border-line bg-transparent px-4 py-3 text-parchment outline-none transition-colors focus:border-amber focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber";

export function Contact({
  contact,
  email,
  socials,
}: {
  contact: Content["contact"];
  email: string;
  socials: { label: string; href: string }[];
}) {
  const { form } = contact;
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [phone, setPhone] = useState("");
  const [projectType, setProjectType] = useState(contact.projectTypes[0]);
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = encodeURIComponent(`${form.mailSubject} — ${company || name}`);
    const body = encodeURIComponent(
      [
        `${form.mailLabels.name}: ${name}`,
        `${form.mailLabels.company}: ${company || "—"}`,
        `${form.mailLabels.email}: ${emailValue}`,
        `${form.mailLabels.phone}: ${phone || "—"}`,
        `${form.mailLabels.projectType}: ${projectType}`,
        "",
        message,
      ].join("\n"),
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  return (
    <AnimatedSection className="mx-auto max-w-[100rem] px-6 pb-28 sm:px-10 sm:pb-36" stagger={0.15}>
      <div className="grid gap-16 md:grid-cols-2 md:gap-20">
        <AnimatedItem>
          <p className="max-w-md leading-relaxed text-parchment-dim">{contact.subhead}</p>

          <a
            href={`mailto:${email}`}
            className="underline-draw mt-8 inline-block font-display text-2xl text-amber-soft sm:text-3xl"
          >
            {email}
          </a>

          <div className="mt-10 flex gap-6">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-draw text-sm text-parchment-dim hover:text-parchment"
              >
                {social.label}
              </a>
            ))}
          </div>
        </AnimatedItem>

        <AnimatedItem
          as="form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 rounded-2xl border border-line p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-parchment-dim">
              {form.name}
              <input
                required
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={fieldClass}
              />
            </label>

            <label className="flex flex-col gap-2 text-sm text-parchment-dim">
              {form.company}
              <input
                name="organization"
                autoComplete="organization"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className={fieldClass}
              />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-parchment-dim">
              {form.email}
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                className={fieldClass}
              />
            </label>

            <label className="flex flex-col gap-2 text-sm text-parchment-dim">
              {form.phone}
              <input
                type="tel"
                name="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={fieldClass}
              />
            </label>
          </div>

          <label className="flex flex-col gap-2 text-sm text-parchment-dim">
            {form.projectType}
            <select
              name="projectType"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className={`${fieldClass} bg-ink`}
            >
              {contact.projectTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm text-parchment-dim">
            {form.message}
            <textarea
              required
              rows={5}
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${fieldClass} resize-none`}
              placeholder={form.messagePlaceholder}
            />
          </label>

          <button
            type="submit"
            className="btn-glow mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
          >
            {form.submit} <span aria-hidden>→</span>
          </button>
        </AnimatedItem>
      </div>
    </AnimatedSection>
  );
}
