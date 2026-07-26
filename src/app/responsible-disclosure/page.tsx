import type { Metadata } from "next";
import { SimplePage } from "@/components/simple-page";
import { Reveal } from "@/components/motion";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Responsible Disclosure",
  description:
    "Pedumo's responsible disclosure policy: how to report a security vulnerability safely and what to expect from our team.",
  alternates: { canonical: "/responsible-disclosure" },
};

const sections = [
  {
    heading: "How to report",
    body: (
      <>
        <p>
          If you believe you have found a security vulnerability in any Pedumo product,
          website or infrastructure, please report it responsibly by emailing{" "}
          <a className="text-brand-500" href={`mailto:${siteConfig.securityEmail}`}>
            {siteConfig.securityEmail}
          </a>
          . You can also reference our published{" "}
          <a className="text-brand-500" href="/.well-known/security.txt">
            security.txt
          </a>
          .
        </p>
      </>
    ),
  },
  {
    heading: "What to include",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>A clear description of the vulnerability and its potential impact.</li>
        <li>Detailed steps to reproduce, including any proof-of-concept code or screenshots.</li>
        <li>The affected URL, endpoint, service or component.</li>
        <li>Any relevant request/response samples, with sensitive data redacted.</li>
      </ul>
    ),
  },
  {
    heading: "What we ask of you",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>Do not access, modify or exfiltrate data that is not your own.</li>
        <li>Do not perform destructive testing or denial-of-service attacks.</li>
        <li>Do not publicly disclose the issue until we have had time to remediate.</li>
        <li>Act in good faith and avoid privacy violations.</li>
      </ul>
    ),
  },
  {
    heading: "What you can expect from us",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>Acknowledgement of your report within one business day.</li>
        <li>A transparent timeline for investigation and remediation.</li>
        <li>Credit in our changelog or release notes if you would like it.</li>
        <li>No legal action against researchers acting in good faith.</li>
      </ul>
    ),
  },
];

export default function ResponsibleDisclosurePage() {
  return (
    <SimplePage
      eyebrow="Security"
      title="Responsible Disclosure"
      description="We take security seriously and welcome reports from the community. Here is how to share a finding safely and what we commit to in return."
    >
      <div className="space-y-10">
        {sections.map((s, i) => (
          <Reveal key={s.heading} delay={i * 0.04}>
            <div>
              <h2 className="text-xl font-semibold">{s.heading}</h2>
              <div className="mt-3 space-y-3 text-base leading-relaxed text-[var(--muted)]">
                {s.body}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </SimplePage>
  );
}
