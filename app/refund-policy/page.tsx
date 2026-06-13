import { BrandLogo } from "@/components/brand-logo";
import { MarketingFooter } from "@/components/marketing-footer";
import { SUPPORT_EMAIL } from "@/lib/brand";

const sections = [
  {
    title: "1. Overview",
    body: [
      "At Crafted Wedding Sites, we provide bespoke digital services tailored specifically to each couple.",
      "Because our services involve personalised work, website creation, manual customisation, and ongoing support, refund eligibility depends on the stage of the project at the time the refund request is made.",
      "This Refund Policy should be read alongside our Terms & Conditions."
    ]
  },
  {
    title: "2. Before Work Has Commenced",
    body: ["Customers may request a full refund where:"],
    bullets: [
      "Payment has been made; and",
      "No work has commenced on the wedding website."
    ],
    footer: `Refund requests must be submitted to: ${SUPPORT_EMAIL}. We aim to process eligible refunds within 14 days of approval.`
  },
  {
    title: "3. Commencement of Work",
    body: ["Work is considered to have commenced when any of the following occurs:"],
    bullets: [
      "Review of customer-submitted information",
      "Creation of project files",
      "Website setup",
      "Design work",
      "Content drafting",
      "Website customisation",
      "Manual project administration",
      "Communication relating to website production beyond standard enquiries"
    ],
    footer:
      "Due to the bespoke nature of our services, once work has commenced, refunds are generally unavailable."
  },
  {
    title: "4. Personalised Digital Services",
    body: ["Customers acknowledge that:"],
    bullets: [
      "Wedding websites are created specifically for them.",
      "Services are personalised and tailored.",
      "Significant manual effort may begin shortly after payment.",
      "Resources are allocated specifically to each project."
    ],
    footer:
      "As a result, cancellation rights may be limited once service delivery has commenced, subject to applicable consumer protection laws."
  },
  {
    title: "5. After Website Delivery",
    body: [
      "Once a completed wedding website has been delivered or published, refunds will not be provided except where required by law.",
      "This includes situations where:"
    ],
    bullets: [
      "The customer changes their mind.",
      "The customer no longer requires the website.",
      "Wedding plans change.",
      "The wedding is postponed or cancelled.",
      "The customer chooses not to use the completed website."
    ]
  },
  {
    title: "6. Customer-Supplied Delays",
    body: ["Crafted Wedding Sites is not responsible for delays caused by:"],
    bullets: [
      "Missing information",
      "Late responses",
      "Failure to provide required content",
      "Failure to review website drafts",
      "Failure to approve requested changes"
    ],
    footer: "Refunds will not be issued due to delays caused by customer inaction."
  },
  {
    title: "7. Website Hosting and Service Period",
    body: [
      "Wedding websites remain active until one month after the wedding date unless otherwise agreed in writing.",
      "The expiration of the hosting period does not create a right to a refund.",
      "Customers are encouraged to retain copies of any content they wish to preserve before the website is removed or archived."
    ]
  },
  {
    title: "8. Technical Issues",
    body: [
      "If a genuine technical issue occurs that materially prevents delivery of the agreed service, Crafted Wedding Sites will use reasonable efforts to:"
    ],
    bullets: [
      "Correct the issue;",
      "Provide support;",
      "Restore service where possible."
    ],
    footer: "Refunds will only be considered where the issue cannot reasonably be resolved."
  },
  {
    title: "9. Third-Party Services",
    body: ["Our services rely on third-party providers including:"],
    bullets: [
      "Stripe",
      "Resend",
      "OpenAI",
      "Supabase",
      "Vercel"
    ],
    footer:
      "Temporary interruptions or failures of third-party services do not automatically entitle customers to a refund. We will make reasonable efforts to restore functionality where possible."
  },
  {
    title: "10. Exceptional Circumstances",
    body: [
      "We reserve the right, at our sole discretion, to provide a full or partial refund in exceptional circumstances.",
      "Providing a discretionary refund in one case does not create an obligation to provide refunds in future cases."
    ]
  },
  {
    title: "11. Chargebacks and Payment Disputes",
    body: [
      "Customers experiencing an issue with our services should contact us before initiating a payment dispute or chargeback.",
      "We will make reasonable efforts to resolve concerns directly.",
      "Where a chargeback is initiated after services have been delivered or work has commenced, we reserve the right to provide supporting documentation to the payment provider demonstrating the work completed."
    ]
  },
  {
    title: "12. Consumer Rights",
    body: [
      "Nothing in this Refund Policy limits or excludes any rights that customers may have under applicable Irish or European consumer protection laws.",
      "Where legislation provides mandatory rights, those rights will prevail."
    ]
  },
  {
    title: "13. Contact Us",
    body: [
      "For refund requests or billing enquiries:",
      `Email: ${SUPPORT_EMAIL}`,
      "Location: Cork, Ireland"
    ]
  }
] as const;

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#faf7f2_0%,#f3ece2_55%,#e8ddd0_100%)] text-[#1f1d1a]">
      <section className="mx-auto w-full max-w-4xl px-6 pb-10 pt-14 lg:px-8">
        <div className="rounded-[2rem] border border-black/6 bg-white/88 p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10">
          <BrandLogo subtitle="Refund policy" />
          <div className="mt-8 space-y-8 text-[#5f564e]">
            <div>
              <h1 className="text-4xl leading-none text-[#1f1d1a] sm:text-5xl">Refund Policy</h1>
              <p className="mt-4 text-sm uppercase tracking-[0.24em] text-[#9a7d64]">
                Last Updated: 13 June 2026
              </p>
            </div>

            {sections.map((section) => (
              <section key={section.title} className="space-y-4">
                <h2 className="text-2xl text-[#1f1d1a]">{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-7">
                    {paragraph}
                  </p>
                ))}
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
              </section>
            ))}
          </div>
        </div>
      </section>
      <MarketingFooter />
    </main>
  );
}
