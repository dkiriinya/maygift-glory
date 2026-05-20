"use client";

import { useState, useRef } from "react";
import { submitContact } from "@/app/actions/contact";

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    const formData = new FormData(event.currentTarget);

    try {
      const res = await submitContact(formData);
      if (res.success) {
        setSuccess(true);
        formRef.current?.reset();
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    } catch (err) {
      console.error("Form submission failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-[1.2rem] w-full">
      <div className="flex flex-col gap-1">
        <label
          className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[rgba(242,226,226,0.4)]"
          htmlFor="name"
        >
          Full Name
        </label>
        <input
          className="bg-[rgba(242,226,226,0.06)] border border-[rgba(242,226,226,0.15)] text-bg font-sans text-[0.9rem] font-light p-[0.9rem_1.2rem] outline-none transition-all duration-250 w-full rounded-none focus:border-rose focus:bg-[rgba(209,152,168,0.07)]"
          type="text"
          id="name"
          name="name"
          placeholder="Your name"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[rgba(242,226,226,0.4)]"
          htmlFor="email"
        >
          Email Address
        </label>
        <input
          className="bg-[rgba(242,226,226,0.06)] border border-[rgba(242,226,226,0.15)] text-bg font-sans text-[0.9rem] font-light p-[0.9rem_1.2rem] outline-none transition-all duration-250 w-full rounded-none focus:border-rose focus:bg-[rgba(209,152,168,0.07)]"
          type="email"
          id="email"
          name="email"
          placeholder="your@email.com"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[rgba(242,226,226,0.4)]"
          htmlFor="subject"
        >
          Subject
        </label>
        <input
          className="bg-[rgba(242,226,226,0.06)] border border-[rgba(242,226,226,0.15)] text-bg font-sans text-[0.9rem] font-light p-[0.9rem_1.2rem] outline-none transition-all duration-250 w-full rounded-none focus:border-rose focus:bg-[rgba(209,152,168,0.07)]"
          type="text"
          id="subject"
          name="subject"
          placeholder="How can I help?"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[rgba(242,226,226,0.4)]"
          htmlFor="message"
        >
          Message
        </label>
        <textarea
          className="bg-[rgba(242,226,226,0.06)] border border-[rgba(242,226,226,0.15)] text-bg font-sans text-[0.9rem] font-light p-[0.9rem_1.2rem] outline-none transition-all duration-250 w-full rounded-none focus:border-rose focus:bg-[rgba(209,152,168,0.07)] h-[130px] resize-none"
          id="message"
          name="message"
          placeholder="Tell me about your needs…"
          required
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={`font-sans text-[0.78rem] font-semibold tracking-[0.12em] uppercase p-[1rem_2rem] border-none cursor-pointer transition-all duration-250 self-start select-none rounded-none
          ${
            success
              ? "bg-accent text-white"
              : "bg-accent text-white hover:bg-rose hover:-translate-y-0.5"
          }
          ${submitting ? "opacity-70 cursor-not-allowed" : ""}
        `}
      >
        {submitting ? "Sending..." : success ? "Message Sent ✓" : "Send Message →"}
      </button>
    </form>
  );
}
