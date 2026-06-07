import { BrandLogo } from "@/components/brand-logo";
import { MarketingFooter } from "@/components/marketing-footer";
import { BRAND_NAME, SUPPORT_EMAIL } from "@/lib/brand";

const lastUpdated = "07 June 2026";

const customerContentTypes = [
  "Photographs",
  "Images",
  "Videos",
  "Logos",
  "Text",
  "Music",
  "Supplier materials",
  "Any other uploaded content"
];

const thirdPartyProviders = ["Stripe", "Resend", "OpenAI", "Supabase", "Vercel"];

const forceMajeureExamples = [
  "Natural disasters",
  "Internet outages",
  "Government action",
  "Cyber attacks",
  "Labour disputes",
  "Public health emergencies"
];

function TermsSection({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-2xl text-[#1f1d1a]">{title}</h2>
      <div className="mt-3 space-y-4 text-base leading-7 text-[#5f564e]">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#faf7f2_0%,#f3ece2_55%,#e8ddd0_100%)] text-[#1f1d1a]">
      <section className="mx-auto w-full max-w-4xl px-6 pb-10 pt-14 lg:px-8">
        <div className="rounded-[2rem] border border-black/6 bg-white/88 p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10">
          <BrandLogo subtitle="Terms" />
          <div className="mt-8 space-y-8 text-[#5f564e]">
            <div>
              <h1 className="text-4xl leading-none text-[#1f1d1a] sm:text-5xl">
                Crafted Wedding Sites – Terms &amp; Conditions
              </h1>
              <p className="mt-4 text-sm uppercase tracking-[0.2em] text-[#9a7d64]">
                Last updated: {lastUpdated}
              </p>
            </div>

            <TermsSection title="1. Introduction">
              <p>
                These Terms and Conditions govern the use of the {BRAND_NAME} website and the
                services provided by {BRAND_NAME} (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;).
              </p>
              <p>
                By purchasing our services, submitting an enquiry, or using a wedding website
                created by us, you agree to be bound by these Terms and Conditions.
              </p>
              <p>If you do not agree to these Terms, you should not use our services.</p>
            </TermsSection>

            <TermsSection title="2. About Our Services">
              <p>
                {BRAND_NAME} provides bespoke wedding websites and related services, including but
                not limited to:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Custom wedding website creation</li>
                <li>RSVP management functionality</li>
                <li>Wedding information pages</li>
                <li>Digital invitations</li>
                <li>Guest communication tools</li>
                <li>AI-assisted wedding concierge functionality</li>
                <li>Website hosting</li>
                <li>Website maintenance during the agreed service period</li>
              </ul>
              <p>
                Each wedding website is customised based on information supplied by the customer.
              </p>
            </TermsSection>

            <TermsSection title="3. Customer Responsibilities">
              <p>Customers agree to:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Provide accurate and complete information.</li>
                <li>Supply content in a timely manner.</li>
                <li>Review all website content before publication.</li>
                <li>Ensure all information provided is lawful and accurate.</li>
                <li>Obtain all necessary permissions for any content supplied.</li>
              </ul>
              <p>
                Customers are solely responsible for ensuring they have the right to use the
                following:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                {customerContentTypes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                {BRAND_NAME} accepts no responsibility for copyright infringement arising from
                customer-supplied content.
              </p>
            </TermsSection>

            <TermsSection title="4. Website Creation Process">
              <p>Following payment and receipt of the required information:</p>
              <ol className="list-decimal space-y-2 pl-6">
                <li>We will begin work on the customer&apos;s wedding website.</li>
                <li>
                  Draft content may be created using customer information and AI-assisted tools
                  where appropriate.
                </li>
                <li>Customers will have the opportunity to review website content.</li>
                <li>Customers are responsible for checking all information before publication.</li>
              </ol>
              <p>
                Publication of the website indicates acceptance of the website content and
                structure.
              </p>
            </TermsSection>

            <TermsSection title="5. AI-Assisted Features">
              <p>Certain features may utilise artificial intelligence technologies.</p>
              <p>These features may include:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Content drafting assistance</li>
                <li>Wedding concierge functionality</li>
                <li>Information retrieval tools</li>
              </ul>
              <p>
                While reasonable efforts are made to ensure accuracy, AI-generated content may
                contain errors.
              </p>
              <p>
                Customers remain responsible for reviewing all published content before
                distribution to guests.
              </p>
              <p>
                {BRAND_NAME} does not guarantee the accuracy, completeness or suitability of
                AI-generated content.
              </p>
            </TermsSection>

            <TermsSection title="6. Website Hosting">
              <p>
                Wedding websites are hosted by {BRAND_NAME} using third-party hosting providers.
              </p>
              <p>We use reasonable efforts to maintain website availability.</p>
              <p>However, we do not guarantee uninterrupted service and shall not be liable for:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Hosting outages</li>
                <li>Server failures</li>
                <li>Third-party service interruptions</li>
                <li>Internet connectivity issues</li>
                <li>Cybersecurity incidents beyond our reasonable control</li>
              </ul>
            </TermsSection>

            <TermsSection title="7. Website Availability Period">
              <p>Unless otherwise agreed in writing:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Wedding websites remain active until one month after the wedding date.</li>
                <li>Following this period, websites may be archived, suspended or permanently deleted.</li>
              </ul>
              <p>
                Customers are responsible for downloading any content they wish to retain before
                website removal.
              </p>
            </TermsSection>

            <TermsSection title="8. Payments">
              <p>All prices are displayed in Euro (&euro;).</p>
              <p>Payment must be made using approved payment methods made available through the website.</p>
              <p>Work may not commence until payment has been received.</p>
              <p>
                {BRAND_NAME} reserves the right to suspend or refuse services where payment has not
                been completed.
              </p>
            </TermsSection>

            <TermsSection title="9. Refunds">
              <p>Refunds are governed by our Refund Policy.</p>
              <p>
                Because our services involve personalised digital work and manual customisation,
                customers acknowledge that work may begin shortly after purchase.
              </p>
              <p>
                Once work has commenced on a bespoke wedding website, refunds are generally
                unavailable except where required by applicable law.
              </p>
            </TermsSection>

            <TermsSection title="10. Intellectual Property">
              <div>
                <h3 className="text-xl text-[#1f1d1a]">Customer Content</h3>
                <p className="mt-2">
                  Customers retain ownership of photographs, text, wedding information, guest
                  information, and uploaded content.
                </p>
              </div>
              <div>
                <h3 className="text-xl text-[#1f1d1a]">{BRAND_NAME} Content</h3>
                <p className="mt-2">
                  {BRAND_NAME} retains ownership of software, templates, website framework, design
                  systems, branding, business processes, and proprietary tools.
                </p>
                <p className="mt-2">
                  Customers receive a licence to use the completed wedding website during the
                  agreed service period.
                </p>
                <p className="mt-2">No ownership rights in the underlying platform are transferred.</p>
              </div>
            </TermsSection>

            <TermsSection title="11. Guest Data">
              <p>Where RSVP functionality is used:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Guest information remains the responsibility of the customer.</li>
                <li>
                  Customers confirm they have an appropriate basis for collecting and providing
                  guest information.
                </li>
                <li>
                  {BRAND_NAME} acts solely as a service provider facilitating website
                  functionality.
                </li>
              </ul>
            </TermsSection>

            <TermsSection title="12. Portfolio Use">
              <p>
                {BRAND_NAME} may only use completed wedding websites, screenshots or project
                materials for marketing or portfolio purposes where the customer has provided prior
                permission.
              </p>
            </TermsSection>

            <TermsSection title="13. Limitation of Liability">
              <p>To the fullest extent permitted by law:</p>
              <p>{BRAND_NAME} shall not be liable for:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Loss of profits</li>
                <li>Loss of business opportunities</li>
                <li>Indirect losses</li>
                <li>Consequential losses</li>
                <li>Guest non-attendance</li>
                <li>RSVP errors caused by customer input</li>
                <li>Email delivery failures</li>
                <li>Third-party platform failures</li>
                <li>Hosting interruptions</li>
              </ul>
              <p>
                Our total liability arising from any claim shall not exceed the amount paid by the
                customer for the relevant service.
              </p>
              <p>
                Nothing in these Terms limits liability where such limitation is prohibited by law.
              </p>
            </TermsSection>

            <TermsSection title="14. Third-Party Services">
              <p>
                Our services may rely on third-party providers including but not limited to:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                {thirdPartyProviders.map((provider) => (
                  <li key={provider}>{provider}</li>
                ))}
              </ul>
              <p>
                We are not responsible for interruptions, failures or errors caused by
                third-party providers.
              </p>
            </TermsSection>

            <TermsSection title="15. Force Majeure">
              <p>
                {BRAND_NAME} shall not be liable for delays or failures caused by events beyond our
                reasonable control including:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                {forceMajeureExamples.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </TermsSection>

            <TermsSection title="16. Changes to Services">
              <p>We reserve the right to:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Modify services</li>
                <li>Update website functionality</li>
                <li>Improve features</li>
                <li>Discontinue features</li>
              </ul>
              <p>where reasonably necessary to operate the business.</p>
            </TermsSection>

            <TermsSection title="17. Governing Law">
              <p>These Terms and Conditions shall be governed by the laws of Ireland.</p>
              <p>
                Any dispute arising in connection with these Terms shall be subject to the
                exclusive jurisdiction of the Irish courts.
              </p>
            </TermsSection>

            <TermsSection title="18. Contact Information">
              <p>For legal or contractual enquiries:</p>
              <p>
                <span className="font-medium text-[#1f1d1a]">Email:</span>{" "}
                <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[#184b38] underline underline-offset-2">
                  {SUPPORT_EMAIL}
                </a>
              </p>
              <p>
                <span className="font-medium text-[#1f1d1a]">Location:</span> Cork, Ireland
              </p>
            </TermsSection>
          </div>
        </div>
      </section>
      <MarketingFooter />
    </main>
  );
}
