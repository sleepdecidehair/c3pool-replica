import { Button, Input, Message } from "@arco-design/web-react";
import {
  IconArrowDown,
  IconCloudDownload,
  IconEmail,
  IconExclamationPolygonFill,
  IconSafe,
} from "@arco-design/web-react/icon";
import {
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { PageShell } from "../../components/PageShell";
import {
  ABUSE_CATEGORIES,
  ABUSE_GUIDE,
  ATTACHMENT_ACCEPT,
  ATTACHMENT_LIMITS,
  type AbuseCategory,
} from "./data";
import "./abuse.css";

interface AbuseFormValues {
  category: AbuseCategory;
  addresses: string;
  worker: string;
  firstSeen: string;
  hosts: string;
  description: string;
  name: string;
  organisation: string;
  contactEmail: string;
}

const INITIAL_VALUES: AbuseFormValues = {
  category: ABUSE_CATEGORIES[0],
  addresses: "",
  worker: "",
  firstSeen: "",
  hosts: "",
  description: "",
  name: "",
  organisation: "",
  contactEmail: "",
};

function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor}>
      {children}{" "}
      {required ? (
        <span className="report-field__req" aria-hidden="true">
          *
        </span>
      ) : null}
    </label>
  );
}

export function AbuseReportPage() {
  const [values, setValues] = useState<AbuseFormValues>(INITIAL_VALUES);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const canSubmit =
    values.addresses.trim().length > 0 &&
    values.description.trim().length >= 20 &&
    values.contactEmail.trim().includes("@");

  function update<K extends keyof AbuseFormValues>(key: K, value: AbuseFormValues[K]) {
    setValues((previous) => ({ ...previous, [key]: value }));
  }

  function assignFiles(list: FileList | null) {
    setFiles(list ? Array.from(list).slice(0, 5) : []);
  }

  function handleFileInput(event: ChangeEvent<HTMLInputElement>) {
    assignFiles(event.target.files);
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    assignFiles(event.dataTransfer.files);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    Message.success("已记录（本地复刻）");
    setValues(INITIAL_VALUES);
    setFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div className="report-page">
      <PageShell
        title={
          <>
            <span className="report-page__icon" aria-hidden="true">
              <IconExclamationPolygonFill />
            </span>
            <span>Report Abuse</span>
          </>
        }
        subtitle={
          <span className="report-page__subtitle-inner">
            Found a botnet, a compromised server or devices used without permission mining to
            C3Pool? Tell us here and we will investigate.
            <a className="report-page__jump" href="#report-form">
              <IconArrowDown aria-hidden="true" />
              Go to the form
            </a>
          </span>
        }
      >
        <div className="report-page__body">
          <aside className="report-guide">
            {ABUSE_GUIDE.map((section) => (
              <section key={section.title} className="report-guide__section">
                <h2>{section.title}</h2>
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
            <p className="report-guide__mail">
              <IconEmail aria-hidden="true" />
              <span>You can also email</span>
              <a href="mailto:abuse@c3pool.com">abuse@c3pool.com</a>
            </p>
          </aside>

          <form id="report-form" className="report-form" onSubmit={handleSubmit}>
            <div className="report-field">
              <label>Category</label>
              <div className="report-cats" role="group" aria-label="Abuse category">
                {ABUSE_CATEGORIES.map((category) => (
                  <Button
                    key={category}
                    type={values.category === category ? "primary" : "default"}
                    shape="round"
                    htmlType="button"
                    aria-pressed={values.category === category}
                    onClick={() => update("category", category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="report-grid">
              <div className="report-field">
                <FieldLabel htmlFor="rp-addresses" required>
                  Wallet addresses
                </FieldLabel>
                <Input.TextArea
                  id="rp-addresses"
                  className="mono"
                  rows={4}
                  maxLength={10000}
                  spellCheck={false}
                  placeholder="One address per line"
                  value={values.addresses}
                  onChange={(value) => update("addresses", value)}
                />
              </div>

              <div className="report-field report-field--half">
                <FieldLabel htmlFor="rp-workers">Worker name</FieldLabel>
                <Input
                  id="rp-workers"
                  autoComplete="off"
                  maxLength={300}
                  placeholder="e.g. rig01"
                  value={values.worker}
                  onChange={(value) => update("worker", value)}
                />
              </div>

              <div className="report-field report-field--half">
                <FieldLabel htmlFor="rp-firstSeen">First seen</FieldLabel>
                <Input
                  id="rp-firstSeen"
                  autoComplete="off"
                  maxLength={300}
                  placeholder="e.g. 2026-11-01 08:00 UTC"
                  value={values.firstSeen}
                  onChange={(value) => update("firstSeen", value)}
                />
              </div>

              <div className="report-field">
                <FieldLabel htmlFor="rp-hosts">Infected host IPs / hostnames</FieldLabel>
                <Input.TextArea
                  id="rp-hosts"
                  className="mono"
                  rows={3}
                  maxLength={10000}
                  spellCheck={false}
                  placeholder="One per line: IP, range or hostname"
                  value={values.hosts}
                  onChange={(value) => update("hosts", value)}
                />
              </div>

              <div className="report-field">
                <FieldLabel htmlFor="rp-body" required>
                  Description and evidence
                </FieldLabel>
                <Input.TextArea
                  id="rp-body"
                  rows={8}
                  maxLength={10000}
                  spellCheck={false}
                  placeholder="Describe what you found and paste relevant logs, command lines or links"
                  value={values.description}
                  onChange={(value) => update("description", value)}
                />
                <span className="report-field__hint">
                  At least 20 characters. Paste logs or command lines directly; attach anything
                  longer as a file.
                </span>
              </div>

              <div className="report-field report-field--half">
                <FieldLabel htmlFor="rp-name">Your name</FieldLabel>
                <Input
                  id="rp-name"
                  autoComplete="off"
                  maxLength={300}
                  placeholder="Optional"
                  value={values.name}
                  onChange={(value) => update("name", value)}
                />
              </div>

              <div className="report-field report-field--half">
                <FieldLabel htmlFor="rp-org">Organisation</FieldLabel>
                <Input
                  id="rp-org"
                  autoComplete="off"
                  maxLength={300}
                  placeholder="Optional — company, CERT or security team"
                  value={values.organisation}
                  onChange={(value) => update("organisation", value)}
                />
              </div>

              <div className="report-field">
                <FieldLabel htmlFor="rp-contact" required>
                  Contact email
                </FieldLabel>
                <Input
                  id="rp-contact"
                  type="email"
                  autoComplete="email"
                  maxLength={300}
                  placeholder="For the confirmation and any follow-up"
                  value={values.contactEmail}
                  onChange={(value) => update("contactEmail", value)}
                />
              </div>
            </div>

            <div className="report-field">
              <span className="report-field__label">Attachments</span>
              <span className="report-field__hint">
                Optional: screenshots, configuration files, logs, or samples in an encrypted
                archive.
              </span>
              <label
                className="report-drop"
                onDrop={handleDrop}
                onDragOver={(event) => event.preventDefault()}
              >
                <input
                  ref={fileInputRef}
                  id="rp-files"
                  type="file"
                  multiple
                  accept={ATTACHMENT_ACCEPT}
                  onChange={handleFileInput}
                />
                <IconCloudDownload className="report-drop__icon" aria-hidden="true" />
                <span className="report-drop__title">Click to choose files, or drop them here</span>
                <span className="report-drop__limits">{ATTACHMENT_LIMITS}</span>
              </label>
              {files.length > 0 ? (
                <ul className="report-files">
                  {files.map((file) => (
                    <li key={`${file.name}-${file.size}-${file.lastModified}`}>{file.name}</li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div className="report-captcha">
              <IconSafe aria-hidden="true" />
              <div className="report-captcha__text">
                <span className="report-captcha__label">Human check</span>
                <span className="report-captcha__state">Runs automatically before you submit.</span>
              </div>
            </div>

            <Button
              className="report-submit"
              type="primary"
              htmlType="submit"
              disabled={!canSubmit}
            >
              Submit
            </Button>

            <p className="report-privacy">
              Reporter details are used only to handle this report and follow up on it, and are
              never disclosed to the reported party.
            </p>
          </form>
        </div>
      </PageShell>
    </div>
  );
}
