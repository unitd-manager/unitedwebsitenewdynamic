import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

const TermsOfService = () => {
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
                Terms of Service
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-heading text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
              Terms of{" "}
              <span className="text-[#00A8FF]">
                Service
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#91A4BF] sm:text-base">
              These Terms of Service explain the terms and conditions that
              apply when you access or use our website, software products,
              technology solutions, and IT services.
            </p>

            {/* Effective date */}
            <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.25em] text-[#60708A]">
              Effective Date: July 2026
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          TERMS CONTENT
      ========================================================= */}
      <main className="bg-[#060A14] py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl space-y-5">

            {/* 01 */}
            <TermsCard
              number="01"
              title="Acceptance of Terms"
            >
              <p>
                By accessing our website, using our software products,
                requesting our services, or entering into an agreement with
                United Technologies, you acknowledge that you have read,
                understood, and agreed to these Terms of Service.
              </p>

              <p>
                If you do not agree with these terms, please do not use our
                website, products, or services.
              </p>
            </TermsCard>

            {/* 02 */}
            <TermsCard
              number="02"
              title="Our Services"
            >
              <p>
                United Technologies provides technology and IT-related
                services to businesses and organizations.
              </p>

              <p>
                Our services may include, but are not limited to:
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>Website design and website development</li>
                <li>Software development and application development</li>
                <li>Mobile application development</li>
                <li>CRM solutions and customer management systems</li>
                <li>ERP solutions and business management systems</li>
                <li>Project and business management software</li>
                <li>Cloud hosting and cloud-related services</li>
                <li>Digital marketing and SEO services</li>
                <li>Cybersecurity and technology solutions</li>
                <li>IT consulting and technical support</li>
                <li>Custom business automation and software solutions</li>
              </ul>

              <p>
                The exact scope of a service will depend on the proposal,
                quotation, statement of work, subscription plan, or separate
                agreement applicable to that service.
              </p>
            </TermsCard>

            {/* 03 */}
            <TermsCard
              number="03"
              title="Use of Our Website and Services"
            >
              <p>
                You agree to use our website, software, platforms, and
                services only for lawful and legitimate business purposes.
              </p>

              <p>
                You must not use our services to conduct fraudulent,
                deceptive, abusive, unlawful, or unauthorized activities.
              </p>

              <p>
                You are responsible for ensuring that your use of our
                services complies with applicable laws, regulations, and
                third-party requirements.
              </p>
            </TermsCard>

            {/* 04 */}
            <TermsCard
              number="04"
              title="Accounts and User Responsibilities"
            >
              <p>
                Certain software products and services may require you to
                create an account or provide information to access the
                service.
              </p>

              <p>
                You are responsible for providing accurate and up-to-date
                information when creating or using an account.
              </p>

              <p>
                You are also responsible for maintaining the confidentiality
                of your account credentials and for activities performed
                through your account.
              </p>

              <p>
                If you believe that your account has been accessed without
                authorization, you should notify us as soon as reasonably
                possible.
              </p>
            </TermsCard>

            {/* 05 */}
            <TermsCard
              number="05"
              title="Software Products and Licensing"
            >
              <p>
                Some of our services may include access to proprietary
                software, applications, platforms, dashboards, CRM systems,
                ERP systems, or other technology products.
              </p>

              <p>
                Unless otherwise stated in a separate agreement, access to
                such software is provided as a limited, non-exclusive,
                non-transferable right to use the software for its intended
                business purpose.
              </p>

              <p>
                You may not copy, modify, reverse engineer, resell,
                redistribute, sublicense, or otherwise exploit our software
                or technology without our prior written permission.
              </p>
            </TermsCard>

            {/* 06 */}
            <TermsCard
              number="06"
              title="Client Content and Data"
            >
              <p>
                When you provide information, documents, files, images,
                business data, customer information, or other content to us
                for the purpose of delivering a service, you remain
                responsible for that content.
              </p>

              <p>
                You confirm that you have the necessary rights and
                permissions to provide such content and authorize us to use
                it for the purpose of providing the agreed services.
              </p>

              <p>
                We will handle personal information in accordance with our
                Privacy Policy and any applicable agreement with the client.
              </p>
            </TermsCard>

            {/* 07 */}
            <TermsCard
              number="07"
              title="Project Development and Delivery"
            >
              <p>
                For custom software, website, mobile application, CRM, ERP,
                or other development projects, project requirements,
                timelines, deliverables, pricing, and responsibilities may
                be defined in a separate proposal, quotation, or statement of
                work.
              </p>

              <p>
                Project timelines may change when requirements are modified,
                additional features are requested, approvals are delayed, or
                information required from the client is not provided on
                time.
              </p>

              <p>
                Any additional work outside the agreed scope may be subject
                to additional charges and a revised delivery timeline.
              </p>
            </TermsCard>

            {/* 08 */}
            <TermsCard
              number="08"
              title="Payments and Fees"
            >
              <p>
                Fees for our products and services will be communicated
                through applicable quotations, proposals, invoices,
                subscription plans, or service agreements.
              </p>

              <p>
                Clients are responsible for making payments according to the
                agreed payment schedule.
              </p>

              <p>
                Failure to make required payments may result in suspension
                or termination of services, subject to the applicable
                agreement.
              </p>

              <p>
                Third-party costs, licenses, hosting charges, domain
                registration fees, software subscriptions, advertising
                budgets, or other external costs may be billed separately
                where applicable.
              </p>
            </TermsCard>

            {/* 09 */}
            <TermsCard
              number="09"
              title="Third-Party Services"
            >
              <p>
                Some of our solutions may integrate with third-party
                services, platforms, APIs, hosting providers, payment
                providers, communication services, analytics tools, or other
                external technologies.
              </p>

              <p>
                Third-party services may have their own terms, policies, and
                privacy requirements.
              </p>

              <p>
                We are not responsible for changes, interruptions, outages,
                or limitations caused by third-party services that are
                outside our reasonable control.
              </p>
            </TermsCard>

            {/* 10 */}
            <TermsCard
              number="10"
              title="Intellectual Property"
            >
              <p>
                Unless otherwise agreed in writing, the website, branding,
                logos, software, source code, designs, documentation,
                content, processes, and other materials developed or owned
                by United Technologies remain our intellectual property.
              </p>

              <p>
                Client-specific deliverables and ownership rights will be
                governed by the applicable project agreement or statement of
                work.
              </p>

              <p>
                You may not reproduce, distribute, modify, or commercially
                exploit our proprietary materials without appropriate
                authorization.
              </p>
            </TermsCard>

            {/* 11 */}
            <TermsCard
              number="11"
              title="Prohibited Activities"
            >
              <p>
                You must not use our website, software, or services to:
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Violate any applicable law or regulation.
                </li>

                <li>
                  Attempt to gain unauthorized access to systems,
                  accounts, networks, or data.
                </li>

                <li>
                  Introduce malicious software, harmful code, or security
                  threats.
                </li>

                <li>
                  Interfere with or disrupt our website, applications,
                  servers, or services.
                </li>

                <li>
                  Misuse our services for fraudulent or deceptive purposes.
                </li>

                <li>
                  Infringe the intellectual property or other rights of
                  United Technologies or third parties.
                </li>
              </ul>
            </TermsCard>

            {/* 12 */}
            <TermsCard
              number="12"
              title="Service Availability and Changes"
            >
              <p>
                We make reasonable efforts to keep our website, software,
                and services available and functional.
              </p>

              <p>
                However, temporary interruptions may occur because of
                maintenance, upgrades, technical issues, hosting problems,
                security incidents, third-party service interruptions, or
                circumstances beyond our reasonable control.
              </p>

              <p>
                We may update, improve, modify, suspend, or discontinue
                portions of our services when reasonably necessary.
              </p>
            </TermsCard>

            {/* 13 */}
            <TermsCard
              number="13"
              title="Confidentiality"
            >
              <p>
                We understand that IT projects may involve confidential
                business information, technical information, credentials,
                project documentation, and other sensitive business
                materials.
              </p>

              <p>
                We will take reasonable measures to protect confidential
                information shared with us for the purpose of providing our
                services.
              </p>

              <p>
                Specific confidentiality obligations may also be governed by
                a separate Non-Disclosure Agreement or service agreement.
              </p>
            </TermsCard>

            {/* 14 */}
            <TermsCard
              number="14"
              title="Warranties and Disclaimers"
            >
              <p>
                We aim to provide our services with reasonable care and
                professional standards.
              </p>

              <p>
                However, unless expressly stated in a written agreement, we
                do not guarantee that every service, website, application,
                software product, or third-party integration will operate
                without interruption or error at all times.
              </p>

              <p>
                Specific warranties, service levels, support commitments, or
                performance requirements may be defined separately for
                individual projects or services.
              </p>
            </TermsCard>

            {/* 15 */}
            <TermsCard
              number="15"
              title="Limitation of Liability"
            >
              <p>
                To the maximum extent permitted by applicable law, United
                Technologies will not be responsible for indirect,
                incidental, special, consequential, or business losses
                resulting from the use of our website, software, products,
                or services.
              </p>

              <p>
                This may include loss of profits, business interruption,
                data loss, or loss of business opportunities, except where
                such limitation is not permitted by applicable law.
              </p>

              <p>
                Any specific liability limitations agreed in a written
                contract with a client will take precedence where applicable.
              </p>
            </TermsCard>

            {/* 16 */}
            <TermsCard
              number="16"
              title="Termination"
            >
              <p>
                Either party may terminate a service or project according to
                the terms of the applicable agreement.
              </p>

              <p>
                We may suspend or terminate access to our services if a user
                or client materially violates these Terms of Service,
                engages in unlawful activity, fails to make required
                payments, or creates a significant security or operational
                risk.
              </p>

              <p>
                Termination does not automatically remove obligations that
                are intended to continue after termination, including
                applicable payment, confidentiality, intellectual property,
                and liability provisions.
              </p>
            </TermsCard>

            {/* 17 */}
            <TermsCard
              number="17"
              title="Changes to These Terms"
            >
              <p>
                We may update these Terms of Service from time to time to
                reflect changes to our services, technology, business
                practices, or legal requirements.
              </p>

              <p>
                When significant changes are made, we may provide appropriate
                notice through our website, application, or other available
                communication methods.
              </p>

              <p>
                Your continued use of our services after updated terms
                become effective indicates acceptance of the revised terms,
                subject to applicable law.
              </p>
            </TermsCard>

            {/* 18 */}
            <TermsCard
              number="18"
              title="Governing Law"
            >
              <p>
                These Terms of Service will be interpreted and governed in
                accordance with the applicable laws of the jurisdiction in
                which United Technologies operates, unless a separate written
                agreement with a client specifies otherwise.
              </p>

              <p>
                Any disputes will be handled in accordance with applicable
                legal procedures and any dispute-resolution terms contained
                in the relevant service agreement.
              </p>
            </TermsCard>

            {/* 19 */}
            <TermsCard
              number="19"
              title="Contact Information"
            >
              <p>
                If you have questions about these Terms of Service, our
                products, or our services, please contact us.
              </p>

              <p>
                <span className="font-medium text-white">
                  Email:
                </span>{" "}
                <a
                  href="mailto:info@unitdtechnologies.com"
                  className="text-[#00A8FF] transition-colors hover:text-cyan-300"
                >
                  info@unitdtechnologies.com
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
            </TermsCard>

            {/* =====================================================
                CONTACT CALLOUT
            ===================================================== */}
            <div className="mt-10 rounded-2xl border border-[#00A8FF]/20 bg-[#09111F] px-6 py-10 text-center md:px-10">
              <div className="mx-auto max-w-2xl">

                <h2 className="font-heading text-xl font-semibold text-white md:text-2xl">
                  Questions about these Terms?
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#91A4BF]">
                  If you have any questions regarding our services or these
                  Terms of Service, please contact our team.
                </p>

                <a
                  href="contact"
                  className="mt-5 inline-flex items-center justify-center rounded-full border border-[#00A8FF] px-5 py-2.5 text-sm font-medium text-[#00A8FF] transition-all duration-300 hover:bg-[#00A8FF] hover:text-white"
                >
                  Contact Us
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


/* =============================================================
   TERMS CARD COMPONENT
============================================================= */

interface TermsCardProps {
  number: string;
  title: string;
  children: React.ReactNode;
}

const TermsCard = ({
  number,
  title,
  children,
}: TermsCardProps) => {
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

export default TermsOfService;