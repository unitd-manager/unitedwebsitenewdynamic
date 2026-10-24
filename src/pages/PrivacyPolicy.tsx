import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#060A14] text-white">
      <Navbar />

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#080D19] pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="container relative mx-auto px-6 md:px-10 lg:px-16">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#00A8FF]/30 bg-[#00A8FF]/5 px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00A8FF]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00A8FF]">
                Privacy Policy
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-heading text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
              Your Privacy{" "}
              <span className="text-[#00A8FF]">Matters to Us</span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#91A4BF] sm:text-base">
              We respect your privacy and are committed to protecting the
              information you share with us. Please read this Privacy Policy
              to understand how we collect, use, and protect your information.
            </p>

            {/* Date */}
            <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.25em] text-[#60708A]">
              Effective Date: July 2026
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          PRIVACY POLICY CONTENT
      ========================================================= */}
      <main className="bg-[#060A14] py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl space-y-5">

            {/* 1 */}
            <PolicyCard
              number="01"
              title="Introduction"
            >
              <p>
                Welcome to UniverseHr ("App"), a professional time-tracking
                solution designed to help users efficiently log work hours for
                various projects. By using this App, you agree to comply with
                our policies, terms, and conditions.
              </p>

              <p>
                This app is developed and published by UNITD Technologies,
                the entity listed on the Google Play Store.
              </p>
            </PolicyCard>

            {/* 2 */}
            <PolicyCard
              number="02"
              title="Content Policy"
            >
              <p>
                The App must be used for legal and professional purposes only.
              </p>

              <p>
                Users must not upload or share any offensive, misleading, or
                fraudulent information.
              </p>

              <p>
                Any user-generated content, such as project details or notes,
                must adhere to professional standards.
              </p>
            </PolicyCard>

            {/* 3 */}
            <PolicyCard
              number="03"
              title="Privacy Policy & Data Collection"
            >
              <p>
                UniverseHr collects and processes data in accordance with
                this Privacy Policy.
              </p>

              <p>
                We collect email and password for user authentication and
                login.
              </p>

              <p>
                Other data collected may include name, work hours, and
                project details, solely for time-tracking purposes.
              </p>

              <p>
                No sensitive data will be shared with third parties without
                user consent.
              </p>

              <p>
                The App follows Google Play's User Data Policy to ensure
                secure data handling.
              </p>
            </PolicyCard>

            {/* 4 */}
            <PolicyCard
              number="04"
              title="Account Deletion Policy"
            >
              <p>
                Users have the right to delete their UniverseHr accounts at
                any time.
              </p>

              <p>To delete an account, users can:</p>

              <p>
                Navigate to Settings &gt; Account &gt; Delete Account within
                the app, or
              </p>

              <p>
                Send a request to our support team at{" "}
                <a
                  href="mailto:utsappcreate@gmail.com"
                  className="font-medium text-[#00A8FF] transition-colors hover:text-cyan-300"
                >
                  utsappcreate@gmail.com
                </a>
              </p>

              <p>Upon account deletion:</p>

              <p>
                All personal data, including email, password, and work logs,
                will be permanently erased from our servers within 30 days.
              </p>

              <p>
                Users will lose access to their saved time-tracking data.
              </p>

              <p>
                Some anonymized or aggregated data may be retained for
                analytics and compliance.
              </p>
            </PolicyCard>

            {/* 5 */}
            <PolicyCard
              number="05"
              title="Permissions & API Usage"
            >
              <p>
                The App only requests permissions necessary for time tracking
                and project management.
              </p>

              <p>
                If location tracking is enabled for project time
                verification, users will be informed and given control.
              </p>

              <p>
                Any third-party APIs used comply with Google Play policies.
              </p>
            </PolicyCard>

            {/* 6 */}
            <PolicyCard
              number="06"
              title="Advertising & Monetization"
            >
              <p>
                The App does not contain misleading or intrusive
                advertisements.
              </p>

              <p>
                If applicable, in-app purchases or subscriptions will be
                clearly disclosed with pricing and billing details.
              </p>
            </PolicyCard>

            {/* 7 */}
            <PolicyCard
              number="07"
              title="User Responsibilities"
            >
              <p>
                Provide accurate information regarding work hours and
                projects.
              </p>

              <p>
                Do not misuse or manipulate time-tracking records.
              </p>

              <p>
                Ensure compliance with workplace policies when using the App.
              </p>
            </PolicyCard>

            {/* 8 */}
            <PolicyCard
              number="08"
              title="Child Safety & Age Restrictions"
            >
              <p>
                UniverseHr is designed for professionals and business use.
                Users must be at least 18 years old.
              </p>
            </PolicyCard>

            {/* 9 */}
            <PolicyCard
              number="09"
              title="Prohibited Activities"
            >
              <p>Falsifying time-tracking records.</p>

              <p>
                Engaging in fraudulent, deceptive, or unauthorized
                activities.
              </p>

              <p>
                Violating intellectual property rights of UniverseHr or third
                parties.
              </p>
            </PolicyCard>

            {/* 10 */}
            <PolicyCard
              number="10"
              title="App Updates & Maintenance"
            >
              <p>
                We may release updates to enhance security, functionality, or
                user experience. Users are encouraged to keep the App updated.
              </p>
            </PolicyCard>

            {/* 11 */}
            <PolicyCard
              number="11"
              title="Termination & Policy Changes"
            >
              <p>
                Accounts violating this policy may be suspended or removed.
              </p>

              <p>
                We reserve the right to modify this policy, with users
                notified of significant changes.
              </p>
            </PolicyCard>

            {/* 12 */}
            <PolicyCard
              number="12"
              title="Contact Information"
            >
              <p>
                For inquiries or support, contact us:
              </p>

              <p>
                <span className="font-medium text-white">
                  Email:
                </span>{" "}
                <a
                  href="mailto:utsappcreate@gmail.com"
                  className="text-[#00A8FF] transition-colors hover:text-cyan-300"
                >
                  utsappcreate@gmail.com
                </a>
              </p>

              <p>
                <span className="font-medium text-white">
                  Website:
                </span>{" "}
                <a
                  href="https://www.unitdtechnologies.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00A8FF] transition-colors hover:text-cyan-300"
                >
                  www.unitdtechnologies.com
                </a>
              </p>
            </PolicyCard>

            {/* =====================================================
                CONTACT CALLOUT
            ===================================================== */}
            <div className="mt-10 rounded-2xl border border-[#00A8FF]/20 bg-[#09111F] px-6 py-10 text-center md:px-10">
              <div className="mx-auto max-w-2xl">
                <h2 className="font-heading text-xl font-semibold text-white md:text-2xl">
                  Questions about this Privacy Policy?
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#91A4BF]">
                  If you have any questions or concerns, please contact us
                  using the information provided above.
                </p>

                <a
                  href="Contact"
                  className="mt-5 inline-flex items-center justify-center rounded-full border border-[#00A8FF] px-5 py-2.5 text-sm font-medium text-[#00A8FF] transition-all duration-300 hover:bg-[#00A8FF] hover:text-white"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

interface PolicyCardProps {
  number: string;
  title: string;
  children: React.ReactNode;
}

const PolicyCard = ({
  number,
  title,
  children,
}: PolicyCardProps) => {
  return (
    <section className="group rounded-2xl border border-[#1B2536] bg-[#0A0F1B] p-6 transition-all duration-300 hover:border-[#00A8FF]/30 md:p-7 lg:p-8">
      <div className="flex gap-5 md:gap-7">
        {/* Number */}
        <div className="hidden shrink-0 pt-0.5 sm:block">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#1B2536] bg-[#0D1422] text-xs font-semibold text-[#00A8FF] transition-colors duration-300 group-hover:border-[#00A8FF]/40">
            {number}
          </div>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <h2 className="font-heading text-lg font-semibold text-white md:text-xl">
            {title}
          </h2>

          <div className="mt-4 space-y-3 text-sm leading-7 text-[#91A4BF] md:text-[15px]">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;