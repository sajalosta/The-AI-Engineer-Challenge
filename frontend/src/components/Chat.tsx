"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./Chat.module.css";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://localhost:8000";

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = (await res.json()) as { reply?: string; detail?: string };

      if (!res.ok) {
        throw new Error(
          typeof data.detail === "string" ? data.detail : "Something went wrong."
        );
      }

      const reply = data.reply?.trim();
      if (!reply) {
        throw new Error("No reply received from the coach.");
      }

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: reply,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to reach the server.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={styles.chat} aria-label="Chat with mental coach">
      <div className={styles.messages}>
        {messages.length === 0 && !loading && !error && (
          <p className={styles.empty}>
            Share what is on your mind — stress, habits, motivation, or
            confidence. Your coach is here to help.
          </p>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.bubble} ${
              msg.role === "user" ? styles.user : styles.assistant
            }`}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <p className={styles.typing} aria-live="polite">
            Coach is thinking…
          </p>
        )}

        {error && (
          <p className={`${styles.bubble} ${styles.error}`} role="alert">
            {error}
          </p>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputRow}>
          <textarea
            className={styles.textarea}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void handleSubmit(e);
              }
            }}
            placeholder="Type your message… (Enter to send, Shift+Enter for new line)"
            rows={2}
            disabled={loading}
            aria-label="Your message"
          />
          <button
            type="submit"
            className={styles.sendBtn}
            disabled={loading || !input.trim()}
          >
            Send
          </button>
        </div>
        <p className={styles.hint}>Backend: {API_BASE}</p>
      </form>
    </section>
  );
}
