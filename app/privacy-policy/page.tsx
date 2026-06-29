import type { Metadata } from "next";
import { BrandLogo } from "@/components/brand-logo";
import { MarketingFooter } from "@/components/marketing-footer";
import { BRAND_NAME, SUPPORT_EMAIL } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Privacy Policy | ${BRAND_NAME}`,
  description:
    "Read the Crafted Wedding Sites privacy policy, including how personal data, RSVP details, payments, and hosted wedding website information are handled."
};

const sections = [
  {
    title: "1. Introduction",
    body: [
      `${BRAND_NAME} ("we", "our", "us") is committed to protecting your privacy and handling your personal data responsibly.`,
      "This Privacy Policy explains how we collect, use, store and protect personal information when you use our website, submit enquiries, purchase our services, create a wedding website, or interact with wedding websites hosted by us.",
      "By using our website or services, you acknowledge that you have read and understood this Privacy Policy."
    ]
  },
  {
    title: "2. Data Controller",
    body: [
      "For the purposes of applicable data protection legislation, including the General Data Protection Regulation (GDPR), Crafted Wedding Sites is the data controller of personal information collected through our website and services.",
      `Contact Email: ${SUPPORT_EMAIL}`,
      "Location: Cork, Ireland"
    ]
  },
  {
    title: "3. Information We Collect",
    subsections: [
      {
        title: "Information Provided by Couples",
        bullets: [
          "Names",
          "Email addresses",
          "Telephone numbers",
          "Wedding dates",
          "Wedding locations",
          "Wedding schedules",
          "Personal wedding stories",
          "Accommodation details",
          "Gift registry information",
          "Content submitted through enquiry forms",
          "Content supplied for website creation"
        ]
      },
      {
        title: "Guest Information",
        body: [
          "Where RSVP functionality is used, we may collect:"
        ],
        bullets: [
          "Guest names",
          "RSVP responses",
          "Dietary requirements",
          "Attendance preferences",
          "Additional information voluntarily submitted by guests"
        ],
        footer:
          "Customers are responsible for ensuring they have an appropriate legal basis to provide guest information to us."
      },
      {
        title: "Technical Information",
        body: ["We may automatically collect:"],
        bullets: [
          "IP addresses",
          "Browser type",
          "Device information",
          "Operating system information",
          "Website usage information",
          "Referring websites",
          "Pages visited",
          "Date and time of visits"
        ]
      },
      {
        title: "Cookies and Analytics",
        body: ["We may use cookies and analytics technologies to:"],
        bullets: [
          "Improve website functionality",
          "Measure website performance",
          "Understand user behaviour",
          "Improve customer experience"
        ],
        footer:
          "Where legally required, consent will be requested before non-essential cookies are used. Further information may be provided through a separate Cookie Policy."
      }
    ]
  },
  {
    title: "4. How We Use Personal Data",
    body: ["We use personal information to:"],
    bullets: [
      "Respond to enquiries",
      "Create wedding websites",
      "Provide customer support",
      "Process payments",
      "Manage RSVP functionality",
      "Deliver website features",
      "Communicate with customers",
      "Improve our services",
      "Prevent fraud and misuse",
      "Comply with legal obligations"
    ],
    footer:
      "We only process personal information where we have a lawful basis to do so."
  },
  {
    title: "5. Legal Basis for Processing",
    subsections: [
      {
        title: "Contract",
        body: ["To provide the services requested by customers."]
      },
      {
        title: "Legitimate Interests",
        body: ["To operate and improve our business, maintain website security and provide customer support."]
      },
      {
        title: "Consent",
        body: ["Where consent is required by law, including certain marketing communications and cookie technologies."]
      },
      {
        title: "Legal Obligations",
        body: ["Where processing is necessary to comply with legal or regulatory requirements."]
      }
    ]
  },
  {
    title: "6. Payments",
    body: [
      "Payments are processed by Stripe.",
      "Crafted Wedding Sites does not store full payment card details.",
      "Payment information is handled in accordance with Stripe's own privacy and security practices.",
      "Customers should review Stripe's privacy policy for further information."
    ]
  },
  {
    title: "7. Third-Party Service Providers",
    body: [
      "We use trusted third-party providers to operate our services.",
      "These may include:"
    ],
    bullets: [
      "Stripe (payments)",
      "Resend (email delivery)",
      "OpenAI (AI-assisted functionality)",
      "Supabase (database services)",
      "Vercel (hosting and deployment)",
      "Google Analytics or similar analytics providers"
    ],
    footer:
      "These providers may process personal information on our behalf. We take reasonable steps to ensure such providers maintain appropriate safeguards."
  },
  {
    title: "8. AI-Assisted Functionality",
    body: [
      "Crafted Wedding Sites may utilise artificial intelligence technologies to assist with certain features.",
      "Examples may include:"
    ],
    bullets: [
      "Content drafting",
      "Wedding concierge responses",
      "Information retrieval"
    ],
    footer:
      "AI-generated responses may not always be accurate or complete. Customers remain responsible for reviewing website content and information before publication. Personal data may be processed through AI systems where necessary to provide requested functionality."
  },
  {
    title: "9. Data Retention",
    body: [
      "We retain personal information only for as long as necessary to provide our services and fulfil legal obligations.",
      "Unless otherwise required:"
    ],
    bullets: [
      "Wedding websites remain active until one month after the wedding date.",
      "Website content may then be archived or permanently deleted.",
      "Certain records may be retained for accounting, legal or business purposes."
    ],
    footer: "Retention periods may vary depending on legal requirements."
  },
  {
    title: "10. Data Security",
    body: [
      "We implement reasonable technical and organisational measures designed to protect personal information against:"
    ],
    bullets: [
      "Unauthorised access",
      "Loss",
      "Destruction",
      "Misuse",
      "Alteration"
    ],
    footer:
      "However, no internet-based service can guarantee absolute security. Users submit information at their own risk."
  },
  {
    title: "11. International Transfers",
    body: [
      "Some service providers may process data outside Ireland or the European Economic Area.",
      "Where international transfers occur, we take reasonable steps to ensure appropriate safeguards are in place in accordance with applicable data protection laws."
    ]
  },
  {
    title: "12. Your GDPR Rights",
    body: ["Subject to applicable law, you may have the right to:"],
    bullets: [
      "Access your personal data",
      "Correct inaccurate data",
      "Request deletion of data",
      "Restrict processing",
      "Object to processing",
      "Request data portability",
      "Withdraw consent where consent is relied upon"
    ],
    footer: `Requests may be submitted to: ${SUPPORT_EMAIL}. We may request proof of identity before fulfilling certain requests.`
  },
  {
    title: "13. Complaints",
    body: [
      "If you believe your personal information has been processed unlawfully, you have the right to lodge a complaint with the Irish Data Protection Commission.",
      "Website: https://www.dataprotection.ie",
      "We encourage you to contact us first so that we can attempt to resolve any concerns."
    ]
  },
  {
    title: "14. Children's Privacy",
    body: [
      "Our services are intended for adults planning weddings.",
      "We do not knowingly collect personal information from children.",
      "If we become aware that personal information has been collected from a child without appropriate consent, we will take reasonable steps to remove it."
    ]
  },
  {
    title: "15. Changes to this Privacy Policy",
    body: [
      "We may update this Privacy Policy from time to time.",
      "Updated versions will be published on our website together with the revised effective date.",
      "Continued use of our services after changes are published constitutes acceptance of the updated Privacy Policy."
    ]
  },
  {
    title: "16. Contact Us",
    body: [
      "For privacy-related enquiries or GDPR requests:",
      `Email: ${SUPPORT_EMAIL}`,
      "Location: Cork, Ireland"
    ]
  }
] as const;

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#faf7f2_0%,#f3ece2_55%,#e8ddd0_100%)] text-[#1f1d1a]">
      <section className="mx-auto w-full max-w-4xl px-6 pb-10 pt-14 lg:px-8">
        <div className="rounded-[2rem] border border-black/6 bg-white/88 p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10">
          <BrandLogo subtitle="Privacy policy" />
          <div className="mt-8 space-y-8 text-[#5f564e]">
            <div>
              <h1 className="text-4xl leading-none text-[#1f1d1a] sm:text-5xl">Privacy Policy</h1>
              <p className="mt-4 text-sm uppercase tracking-[0.24em] text-[#9a7d64]">
                Last Updated: 13 June 2026
              </p>
            </div>

            {sections.map((section) => (
              <section key={section.title} className="space-y-4">
                <h2 className="text-2xl text-[#1f1d1a]">{section.title}</h2>
                {"body" in section && section.body
                  ? section.body.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-7">
                        {paragraph}
                      </p>
                    ))
                  : null}
                {"bullets" in section && section.bullets ? (
                  <ul className="list-disc space-y-2 pl-6 text-base leading-7">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {"footer" in section && section.footer ? (
                  <p className="text-base leading-7">{section.footer}</p>
                ) : null}
                {"subsections" in section && section.subsections
                  ? section.subsections.map((subsection) => (
                      <div key={subsection.title} className="space-y-3 pt-1">
                        <h3 className="text-xl text-[#1f1d1a]">{subsection.title}</h3>
                        {"body" in subsection && subsection.body
                          ? subsection.body.map((paragraph) => (
                              <p key={paragraph} className="text-base leading-7">
                                {paragraph}
                              </p>
                            ))
                          : null}
                        {"bullets" in subsection && subsection.bullets ? (
                          <ul className="list-disc space-y-2 pl-6 text-base leading-7">
                            {subsection.bullets.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        ) : null}
                        {"footer" in subsection && subsection.footer ? (
                          <p className="text-base leading-7">{subsection.footer}</p>
                        ) : null}
                      </div>
                    ))
                  : null}
              </section>
            ))}
          </div>
        </div>
      </section>
      <MarketingFooter />
    </main>
  );
}
