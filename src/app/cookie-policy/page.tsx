import type { Metadata } from "next";
import { SimplePage } from "@/components/simple-page";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How Pedumo uses cookies and similar technologies on its website, and how you can control them.",
  alternates: { canonical: "/cookie-policy" },
};

const sections = [
  {
    heading: "What cookies are",
    body: (
      <p>
        Cookies are small text files stored on your device when you visit a website. They
        are widely used to make websites work, to improve the experience, and to provide
        information to the site owner.
      </p>
    ),
  },
  {
    heading: "How we use cookies",
    body: (
      <>
        <p>
          Pedumo uses a minimal set of cookies and similar technologies for the following
          purposes:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <strong>Essential.</strong> Required for the site to function (for example,
            remembering your theme preference). These do not require consent.
          </li>
          <li>
            <strong>Analytics (optional).</strong> Only with your consent, we may use
            privacy-respecting analytics to understand how the site is used and improve it.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "Your choices",
    body: (
      <p>
        When you first visit, we ask for your consent before setting any non-essential
        cookies. You can change your mind at any time using the cookie preferences control
        in the site footer. You can also delete or block cookies via your browser settings,
        though this may affect some functionality.
      </p>
    ),
  },
  {
    heading: "Third parties",
    body: (
      <p>
        If you consent to analytics, pseudonymous data may be processed by the analytics
        provider we configure. We do not sell cookie data, and we do not use it for
        advertising.
      </p>
    ),
  },
];

export default function CookiePolicyPage() {
  return (
    <SimplePage
      eyebrow="Legal"
      title="Cookie Policy"
      description="A clear explanation of the cookies and similar technologies used on this site, and how you stay in control."
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
