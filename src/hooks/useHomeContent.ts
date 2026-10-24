import { useCmsItem } from "@/hooks/useCmsContent";

export type HomeListItem = {
  title: string;
  href?: string;
  description?: string;
};

export type HomeContent = {
  eyebrow?: string;
  headingPrefix?: string;
  headingHighlight?: string;
  headingSuffix?: string;
  description?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaHref?: string;
  stats?: Array<{ value: string; label: string }>;
  sections?: {
    businessSolutions?: {
      eyebrow?: string;
      heading?: string;
      description?: string;
      developmentEyebrow?: string;
      developmentHeading?: string;
      developmentServices?: HomeListItem[];
      marketingEyebrow?: string;
      marketingHeading?: string;
      marketingServices?: HomeListItem[];
    };
    aiDigital?: {
      eyebrow?: string;
      heading?: string;
      description?: string;
      aiEyebrow?: string;
      aiHeading?: string;
      aiServices?: HomeListItem[];
      digitalEyebrow?: string;
      digitalHeading?: string;
      digitalServices?: HomeListItem[];
    };
    testimonials?: {
      eyebrow?: string;
      heading?: string;
      logos?: Array<{ src: string; alt: string }>;
    };
    services?: { eyebrow?: string; heading?: string };
    testimonialCarousel?: {
      eyebrow?: string;
      heading?: string;
      description?: string;
    };
    whyChooseUs?: {
      eyebrow?: string;
      heading?: string;
      description?: string;
      reasons?: Array<{ title: string; description: string }>;
    };
    counters?: { stats?: Array<{ value: string; label: string }> };
    blogs?: {
      eyebrow?: string;
      heading?: string;
      description?: string;
      readMoreLabel?: string;
    };
    footer?: {
      description?: string;
      servicesHeading?: string;
      links?: Array<{ label: string; href: string }>;
      socialLinks?: Array<{ label: string; href: string }>;
      contactHeading?: string;
      email?: string;
      copyrightPrefix?: string;
      copyright?: string;
      termsLabel?: string;
      termsHref?: string;
      privacyLabel?: string;
      privacyHref?: string;
    };
    brand?: {
      logo?: string;
      logoAlt?: string;
      menuToggleLabel?: string;
    };
  };
};

export function useHomeContent() {
  const query = useCmsItem("page", "home");
  return {
    ...query,
    content: query.data?.content as HomeContent | undefined,
  };
}
