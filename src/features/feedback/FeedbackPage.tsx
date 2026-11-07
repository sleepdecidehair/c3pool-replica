import { Button, Form, Input, Message } from "@arco-design/web-react";
import { IconMessage, IconSafe } from "@arco-design/web-react/icon";
import { useState } from "react";
import { PageShell } from "../../components/PageShell";
import "./feedback.css";

const TOPICS = ["Something is broken", "Feature request", "Hard to use", "Other"] as const;

type Topic = (typeof TOPICS)[number];

export function FeedbackPage() {
  const [topic, setTopic] = useState<Topic>(TOPICS[0]);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const canSubmit = message.trim().length > 0;

  function handleSubmit() {
    if (!canSubmit) return;
    Message.success("已记录（本地复刻）");
    setMessage("");
    setEmail("");
    setAddress("");
    setTopic(TOPICS[0]);
  }

  return (
    <div className="feedback-page">
      <PageShell
        title={
          <>
            <span className="feedback-page__icon" aria-hidden="true">
              <IconMessage />
            </span>
            <span>Feedback &amp; Suggestions</span>
          </>
        }
        subtitle="Tell us what is broken, what is missing, or what would make C3Pool better."
      >
        <div className="feedback-page__body">
          <Form layout="vertical" className="feedback-form" onSubmit={handleSubmit}>
            <Form.Item label="What is this about?">
              <div className="feedback-types" role="group" aria-label="Feedback topic">
                {TOPICS.map((item) => (
                  <Button
                    key={item}
                    type={topic === item ? "primary" : "default"}
                    shape="round"
                    htmlType="button"
                    aria-pressed={topic === item}
                    onClick={() => setTopic(item)}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </Form.Item>

            <Form.Item label="Your message">
              <Input.TextArea
                rows={8}
                maxLength={5000}
                placeholder="What happened, what you expected, and how to reproduce it if you can."
                value={message}
                onChange={setMessage}
              />
            </Form.Item>

            <Form.Item label="Email (optional)">
              <Input
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={setEmail}
              />
              <span className="feedback-field__hint">
                Only used to reply to you. Leave it blank and your message stays fully anonymous.
              </span>
            </Form.Item>

            <Form.Item label="Mining address (optional)">
              <Input
                type="text"
                autoComplete="off"
                spellCheck={false}
                placeholder="Your mining address, if this is about your account"
                value={address}
                onChange={setAddress}
              />
            </Form.Item>

            <div className="feedback-captcha">
              <IconSafe aria-hidden="true" />
              <div className="feedback-captcha__text">
                <span className="feedback-captcha__label">Human check</span>
                <span className="feedback-captcha__state">
                  Runs automatically before you submit.
                </span>
              </div>
            </div>

            <Button
              className="feedback-submit"
              type="primary"
              htmlType="submit"
              disabled={!canSubmit}
            >
              Submit
            </Button>

            <p className="feedback-privacy">
              We store your message, the page you were on, and your browser version. We do not store
              your IP address.
            </p>
          </Form>
        </div>
      </PageShell>
    </div>
  );
}
