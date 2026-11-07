import { Button, Input, Message } from "@arco-design/web-react";
import {
  IconArrowDown,
  IconCloudDownload,
  IconEmail,
  IconSafe,
  IconStamp,
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
  ATTACHMENT_ACCEPT,
  ATTACHMENT_LIMITS,
  LAW_CATEGORIES,
  LAW_GUIDE,
  type LawCategory,
} from "./data";
import "./law.css";

interface LawFormValues {
  category: LawCategory;
  agency: string;
  officer: string;
  country: string;
  officialEmail: string;
  phone: string;
  caseRef: string;
  deadline: string;
  legalBasis: string;
  addresses: string;
  request: string;
}

const INITIAL_VALUES: LawFormValues = {
  category: LAW_CATEGORIES[0],
  agency: "",
  officer: "",
  country: "",
  officialEmail: "",
  phone: "",
  caseRef: "",
  deadline: "",
  legalBasis: "",
  addresses: "",
  request: "",
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

export function LawEnforcementPage() {
  const [values, setValues] = useState<LawFormValues>(INITIAL_VALUES);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const needsAttachments = values.category !== "Emergency";
  const canSubmit =
    values.agency.trim().length > 0 &&
    values.officer.trim().length > 0 &&
    values.country.trim().length > 0 &&
    values.officialEmail.trim().includes("@") &&
    values.phone.trim().length > 0 &&
    values.legalBasis.trim().length > 0 &&
    values.request.trim().length >= 20 &&
    (!needsAttachments || files.length > 0);

  function update<K extends keyof LawFormValues>(key: K, value: LawFormValues[K]) {
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
              <IconStamp />
            </span>
            <span>Law Enforcement Requests</span>
          </>
        }
        subtitle={
          <span className="report-page__subtitle-inner">
            For law enforcement, judicial and government authorities submitting formal requests for
            data preservation, disclosure or a payout hold.
            <a className="report-page__jump" href="#report-form">
              <IconArrowDown aria-hidden="true" />
              Go to the form
            </a>
          </span>
        }
      >
        <div className="report-page__body">
          <aside className="report-guide">
            {LAW_GUIDE.map((section) => (
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
              <div className="report-cats" role="group" aria-label="Request category">
                {LAW_CATEGORIES.map((category) => (
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
                <FieldLabel htmlFor="rp-agency" required>
                  Agency
                </FieldLabel>
                <Input
                  id="rp-agency"
                  autoComplete="off"
                  maxLength={300}
                  placeholder="e.g. National Cyber Crime Unit"
                  value={values.agency}
                  onChange={(value) => update("agency", value)}
                />
              </div>

              <div className="report-field report-field--half">
                <FieldLabel htmlFor="rp-officer" required>
                  Officer name and title
                </FieldLabel>
                <Input
                  id="rp-officer"
                  autoComplete="off"
                  maxLength={300}
                  placeholder="Name, title"
                  value={values.officer}
                  onChange={(value) => update("officer", value)}
                />
              </div>

              <div className="report-field report-field--half">
                <FieldLabel htmlFor="rp-country" required>
                  Country / jurisdiction
                </FieldLabel>
                <Input
                  id="rp-country"
                  autoComplete="off"
                  maxLength={300}
                  placeholder="e.g. Germany"
                  value={values.country}
                  onChange={(value) => update("country", value)}
                />
              </div>

              <div className="report-field report-field--half">
                <FieldLabel htmlFor="rp-contact" required>
                  Official email
                </FieldLabel>
                <Input
                  id="rp-contact"
                  type="email"
                  autoComplete="email"
                  maxLength={300}
                  placeholder="Agency email, used to verify you and reply"
                  value={values.officialEmail}
                  onChange={(value) => update("officialEmail", value)}
                />
              </div>

              <div className="report-field report-field--half">
                <FieldLabel htmlFor="rp-phone" required>
                  Office phone
                </FieldLabel>
                <Input
                  id="rp-phone"
                  type="tel"
                  autoComplete="off"
                  maxLength={300}
                  placeholder="A publicly verifiable number, used to verify you"
                  value={values.phone}
                  onChange={(value) => update("phone", value)}
                />
              </div>

              <div className="report-field report-field--half">
                <FieldLabel htmlFor="rp-caseRef">Case number</FieldLabel>
                <Input
                  id="rp-caseRef"
                  autoComplete="off"
                  maxLength={300}
                  placeholder="Optional"
                  value={values.caseRef}
                  onChange={(value) => update("caseRef", value)}
                />
              </div>

              <div className="report-field report-field--half">
                <FieldLabel htmlFor="rp-deadline">Deadline</FieldLabel>
                <Input
                  id="rp-deadline"
                  autoComplete="off"
                  maxLength={300}
                  placeholder="Optional — a date by which you need a reply"
                  value={values.deadline}
                  onChange={(value) => update("deadline", value)}
                />
              </div>

              <div className="report-field">
                <FieldLabel htmlFor="rp-legalBasis" required>
                  Legal basis
                </FieldLabel>
                <Input.TextArea
                  id="rp-legalBasis"
                  rows={3}
                  maxLength={10000}
                  spellCheck={false}
                  placeholder="Legal instrument, provision or authority relied on"
                  value={values.legalBasis}
                  onChange={(value) => update("legalBasis", value)}
                />
              </div>

              <div className="report-field">
                <FieldLabel htmlFor="rp-addresses">Wallet addresses to look up</FieldLabel>
                <Input.TextArea
                  id="rp-addresses"
                  className="mono"
                  rows={3}
                  maxLength={10000}
                  spellCheck={false}
                  placeholder="Optional, one per line"
                  value={values.addresses}
                  onChange={(value) => update("addresses", value)}
                />
              </div>

              <div className="report-field">
                <FieldLabel htmlFor="rp-body" required>
                  Request
                </FieldLabel>
                <Input.TextArea
                  id="rp-body"
                  rows={8}
                  maxLength={10000}
                  spellCheck={false}
                  placeholder="Describe what should be preserved, disclosed or held, the time range and the purpose"
                  value={values.request}
                  onChange={(value) => update("request", value)}
                />
                <span className="report-field__hint">
                  At least 20 characters. Paste logs or command lines directly; attach anything
                  longer as a file.
                </span>
              </div>
            </div>

            <div className="report-field">
              <span className="report-field__label">
                Attachments{" "}
                {needsAttachments ? (
                  <span className="report-field__req" aria-hidden="true">
                    *
                  </span>
                ) : null}
              </span>
              <span className="report-field__hint">
                Required: the formal request, the case filing document, officers’ identification and
                other supporting documents. Emergency requests may send these later.
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

            <p className="report-privacy">The content of this request is used only to handle it.</p>
          </form>
        </div>
      </PageShell>
    </div>
  );
}
