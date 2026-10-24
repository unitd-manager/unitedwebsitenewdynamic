import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import PlatformCapabilitiesCarousel from "@/components/PlatformCapabilitiesCarousel";
import { getPublicContentItem } from "@/lib/cmsApi";

type ProductDetailPageProps = {
  slug: string;
};

type ProductStat = {
  value: string;
  label: string;
};

type ProductFeature = {
  title: string;
  description: string;
  image: string;
};

type ProductFaq = {
  question: string;
  answer: string;
};

function text(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function records<T extends object>(value: unknown): T[] {
  return Array.isArray(value)
    ? value.filter(
        (item): item is T =>
          Boolean(item) && typeof item === "object" && !Array.isArray(item),
      )
    : [];
}

function ProductPageMessage({ message }: { message: string }) {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-[#00121a] px-5 text-center text-white">
      <p role="status" className="max-w-xl text-lg text-[#9bb8c6]">{message}</p>
    </main>
  );
}

export default function ProductDetailPage({ slug }: ProductDetailPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const productQuery = useQuery({
    queryKey: ["public-content", "product", slug],
    queryFn: () => getPublicContentItem("product", slug),
  });

  if (productQuery.isPending) {
    return <ProductPageMessage message="Loading product information..." />;
  }
  if (productQuery.isError) {
    return (
      <ProductPageMessage
        message={`Product information could not be loaded: ${productQuery.error.message}`}
      />
    );
  }
  if (!productQuery.data) {
    return <ProductPageMessage message="This product is not currently available." />;
  }

  const { content, title } = productQuery.data;
  const stats = records<ProductStat>(content.stats);
  const features = records<ProductFeature>(content.features);
  const faqs = records<ProductFaq>(content.faqs);
  const consultationItems = Array.isArray(content.consultationItems)
    ? content.consultationItems.filter(
        (item): item is string => typeof item === "string" && item.length > 0,
      )
    : [];
  const heroImage = text(content.heroImage);
  const email = text(content.contactEmail);
  const consultationHref = text(content.consultationHref) || `mailto:${email}`;

  return (
    <main className="min-h-screen bg-[#00121a] px-5 py-16 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1540px] overflow-hidden rounded-xl bg-[#00141d] shadow-[0_0_0_1px_rgba(0,212,255,0.05),0_32px_110px_rgba(0,0,0,0.45)]">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:px-0 lg:py-20">
          <section className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <span className="inline-flex items-center rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-cyan-300 shadow-[0_0_18px_rgba(0,221,255,0.12)]">
                {text(content.heroEyebrow)}
              </span>
              <h1 className="mt-8 max-w-[620px] text-[46px] font-black leading-[1.04] tracking-normal text-white sm:text-[50px] lg:text-[52px] 2xl:text-[60px]">
                {text(content.heroTitle)}{" "}
                <span className="text-cyan-300">{text(content.heroAccent)}</span>
                {text(content.heroSuffix) && (
                  <>
                    <br />
                    {text(content.heroSuffix)}
                  </>
                )}
              </h1>
              <p className="mt-8 max-w-[560px] text-lg font-medium leading-8 text-[#7fa2b3]">
                {text(content.heroDescription)}
              </p>
              {stats.length > 0 && (
                <div className="mt-12 grid max-w-[430px] grid-cols-3 gap-7">
                  {stats.map((stat, index) => (
                    <div key={`${stat.label}-${index}`}>
                      <div className="text-3xl font-black leading-none text-white sm:text-4xl">
                        {stat.value}
                      </div>
                      <div className="mt-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#6f94a7]">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {heroImage && (
              <div className="rounded-[22px] shadow-[0_0_80px_rgba(0,221,255,0.18)]">
                <img
                  src={heroImage}
                  alt={text(content.heroImageAlt) || title}
                  className="aspect-[748/526] w-full rounded-[22px] object-cover"
                />
              </div>
            )}
          </section>

          {(text(content.overviewTitle) || text(content.overviewDescription)) && (
            <section className="mt-12 rounded-[28px] border border-cyan-100/10 bg-[#071d27] px-8 py-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:px-10 lg:px-12 lg:py-12">
              <div className="mb-8 flex items-center gap-4">
                <span className="rounded-full bg-cyan-500/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.08em] text-cyan-300">
                  {text(content.overviewEyebrow)}
                </span>
                <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[#668898]">
                  {text(content.overviewLabel)}
                </span>
              </div>
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.96fr]">
                <h2 className="max-w-[590px] text-4xl font-black leading-tight tracking-normal text-white sm:text-[42px]">
                  {text(content.overviewTitle)}
                </h2>
                <p className="max-w-[610px] text-lg font-medium leading-8 text-[#7fa2b3]">
                  {text(content.overviewDescription)}
                </p>
              </div>
            </section>
          )}

          {features.length > 0 && (
            <PlatformCapabilitiesCarousel
              cards={features}
              title={text(content.featuresTitle)}
            />
          )}

          {faqs.length > 0 && (
            <section className="mt-12 rounded-[28px] border border-cyan-100/10 bg-[#071d27] px-6 py-11 sm:px-10 lg:px-12">
              <div className="text-center">
                <span className="rounded-full bg-cyan-500/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.08em] text-cyan-300">
                  {text(content.faqEyebrow)}
                </span>
                <h2 className="mt-8 text-4xl font-black tracking-normal text-white sm:text-[42px]">
                  {text(content.faqTitle)}
                </h2>
              </div>
              <div className="mt-10 grid gap-4 lg:grid-cols-2">
                {faqs.map((faq, index) => (
                  <div key={`${faq.question}-${index}`}>
                    <button
                      type="button"
                      aria-expanded={openFaq === index}
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="flex min-h-14 w-full items-center justify-between rounded-2xl border border-cyan-100/10 bg-[#031620] px-5 text-left text-sm font-black text-white transition-colors hover:border-cyan-300/40"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-cyan-300 transition-transform ${openFaq === index ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openFaq === index && (
                      <div className="mt-2 rounded-2xl border border-cyan-100/10 bg-[#031620] px-5 py-4 text-base font-medium leading-7 text-[#7fa2b3]">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {(text(content.consultationTitle) || text(content.consultationDescription)) && (
            <section className="mt-12 rounded-[28px] border border-cyan-100/10 bg-[#071d27] px-8 py-10 sm:px-10 lg:px-12 lg:py-12">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <span className="rounded-full bg-cyan-500/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.08em] text-cyan-300">
                    {text(content.consultationEyebrow)}
                  </span>
                  <h2 className="mt-12 text-4xl font-black tracking-normal text-white sm:text-[42px]">
                    {text(content.consultationTitle)}
                  </h2>
                  <p className="mt-6 max-w-[760px] text-lg font-medium leading-8 text-[#7fa2b3]">
                    {text(content.consultationDescription)}
                  </p>
                </div>
                <div className="lg:pt-1 lg:text-right">
                  {consultationHref && (
                    <a
                      href={consultationHref}
                      className="inline-flex rounded-full bg-cyan-300 px-8 py-4 text-sm font-black text-[#00141d] transition-transform hover:scale-105"
                    >
                      {text(content.consultationButton)}
                    </a>
                  )}
                  {email && (
                    <p className="mt-4 text-sm font-medium text-[#6f94a7]">
                      or email {email}
                    </p>
                  )}
                </div>
              </div>
              {consultationItems.length > 0 && (
                <div className="mt-9 grid max-w-[690px] gap-x-20 gap-y-4 sm:grid-cols-2">
                  {consultationItems.map((item, index) => (
                    <div key={`${item}-${index}`} className="flex items-center gap-3 text-base font-semibold text-white">
                      <span className="h-2 w-2 rounded-full bg-cyan-300" />
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
