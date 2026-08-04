"use client";

import type { FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import styles from "./page.module.css";

export default function JoinForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const read = (name: string) => String(data.get(name) ?? "").trim();
    const message = [
      "Hello, I would like to join the next chapter of IWLC.",
      "",
      `Name: ${read("name")}`,
      `WhatsApp number: ${read("phone")}`,
      `Email: ${read("email") || "Not provided"}`,
      `City: ${read("city")}`,
      `My goal: ${read("goal") || "I would like to learn more about the challenge."}`,
    ].join("\n");

    window.location.assign(
      `https://wa.me/919398944938?text=${encodeURIComponent(message)}`,
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formIntro}>
        <span>Your details</span>
        <p>Complete the form and continue the conversation with the IWLC team.</p>
      </div>

      <div className={styles.fields}>
        <label>
          <span>Full name</span>
          <input autoComplete="name" name="name" required type="text" />
        </label>

        <label>
          <span>WhatsApp number</span>
          <input autoComplete="tel" inputMode="tel" name="phone" required type="tel" />
        </label>

        <label>
          <span>Email <small>Optional</small></span>
          <input autoComplete="email" name="email" type="email" />
        </label>

        <label>
          <span>City</span>
          <input autoComplete="address-level2" name="city" required type="text" />
        </label>

        <label className={styles.fullWidth}>
          <span>What would you like to change? <small>Optional</small></span>
          <textarea name="goal" rows={4} />
        </label>

        <label className={`${styles.consent} ${styles.fullWidth}`}>
          <input name="consent" required type="checkbox" />
          <span>I agree to be contacted about the next India Weight Loss Challenge.</span>
        </label>
      </div>

      <div className={styles.formFooter}>
        <small>Your details remain in WhatsApp until you choose to send them.</small>
        <button type="submit">
          Continue on WhatsApp
          <ArrowUpRight aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
