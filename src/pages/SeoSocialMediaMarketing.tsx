import React from "react";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/alexander-shatov-mr4JG4SYOF8-unsplash.webp";
import image2 from "../assets/milad-fakurian-pP5gt6Qbzig-unsplash.webp";
import image3 from "../assets/boliviainteligente-FnWQJfyB-TA-unsplash.webp";
import image4 from "../assets/dusan-osmokrovic-oQjCLJYOQsE-unsplash.webp";
import image5 from "../assets/city-church-ca-NKS1k-3fX0U-unsplash.webp";
import image6 from "../assets/aman-pal-15r9RAOy38Q-unsplash.webp";
import image7 from "../assets/boliviainteligente-pDYtprm28Lc-unsplash.webp";
import image8 from "../assets/manas-rb-NmZ3SDzSYio-unsplash.webp";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import { ServicePageStatus } from "@/components/ServicePageStatus";
import {
  Users,
  TrendingUp,
  MessageCircle,
  Image as ImageIcon,
  Video,
  Mail,
  Target,
  CheckCircle2,
  Globe2,
  Heart,
  DollarSign,
  Share2,
  Zap,
  Compass,
  Layers,
  PenTool,
  Radio,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import {
  getServicePageData,
  serviceArray,
  serviceText,
  useServicePage,
} from "@/hooks/useServicePage";

/* ---------- shared bits ---------- */

const Eyebrow = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-400/20 border border-cyan-400/30 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-cyan-300 uppercase">
    {children}
  </span>
);

const SectionHeading = ({ eyebrow, title, sub = undefined, align = "center" }: { eyebrow?: React.ReactNode; title: React.ReactNode; sub?: React.ReactNode; align?: string }) => (
  <div
    className={`max-w-2xl ${
      align === "center" ? "mx-auto text-center" : "text-left"
    } mb-14`}
  >
    {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
    <h2 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
      {title}
    </h2>
    {sub && <p className="mt-4 text-slate-400 leading-relaxed">{sub}</p>}
  </div>
);

const Panel = ({ children, className = "" }) => (
  <div
    className={`rounded-2xl border border-white/10 bg-white/[0.03] p-7 md:p-9 backdrop-blur-sm ${className}`}
  >
    {children}
  </div>
);

const IconTile = ({ icon: Icon }) => (
  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-blue-500/20">
    <Icon className="h-5 w-5 text-white" strokeWidth={2} />
  </div>
);

const StepPanel = ({ step, number }) => (
  <Panel className="relative h-full overflow-hidden">
    <span className="absolute -top-6 -right-2 text-8xl font-extrabold text-white/[0.03]">
      {String(number).padStart(2, "0")}
    </span>
   <div className="relative">
         {step.image ? (
           <img
             src={step.image}
             alt={step.title}
             className="mb-6 h-56 w-full rounded-2xl object-cover md:h-64"
           />
         ) : (
           /* Drop your own image in this placeholder */
           <div className="mb-6 flex h-56 w-full items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] md:h-64">
             <div className="flex flex-col items-center gap-2 text-slate-600">
               <ImageIcon className="h-6 w-6" strokeWidth={1.5} />
               <span className="text-[10px] uppercase tracking-widest">
                 Add image
               </span>
             </div>
           </div>
         )}
   
         <h3 className="mb-4 text-left text-xl font-bold text-white">
           {step.title}
         </h3>
         {step.paragraphs.map((p, j) => (
           <p
             key={j}
             className={`text-left text-slate-400 leading-relaxed ${
               j > 0 ? "mt-4" : ""
             }`}
           >
             {p}
           </p>
         ))}
       </div>
  </Panel>
);

const StrategyCarousel = ({ steps }) => {
  const entries = steps.map((step, i) => ({ step, number: i + 1 }));
  const slides = [];
  for (let k = 0; k < entries.length; k += 2) {
    slides.push(entries.slice(k, k + 2));
  }
  // if the last slide is left with a single item, pair it with the first
  // item so every slide shows two
  if (slides.length > 1 && slides[slides.length - 1].length === 1) {
    slides[slides.length - 1] = [
      ...slides[slides.length - 1],
      entries[0],
    ];
  }
  const total = slides.length;
  // append a clone of the first slide so the track can always advance
  // forward and snap back invisibly, instead of animating backward
  const track = [...slides, slides[0]];

  const [index, setIndex] = React.useState(0);
  const [animate, setAnimate] = React.useState(true);

  const advance = () => setIndex((i) => i + 1);
  const goTo = (i) => {
    setAnimate(true);
    setIndex(i);
  };

  React.useEffect(() => {
    const timer = setInterval(advance, 5000);
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    if (index === total) {
      const id = setTimeout(() => {
        setAnimate(false);
        setIndex(0);
      }, 500);
      return () => clearTimeout(id);
    }
  }, [index, total]);

  React.useEffect(() => {
    if (!animate) {
      const id = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(id);
    }
  }, [animate]);

  return (
    <div>
      <div className="overflow-hidden">
        <div
          className={`flex ${
            animate ? "transition-transform duration-500 ease-out" : ""
          }`}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {track.map((slide, si) => (
            <div key={si} className="w-full flex-shrink-0">
              <div
                className={`grid gap-6 px-1 ${
                  slide.length === 2
                    ? "md:grid-cols-2"
                    : "mx-auto md:max-w-xl"
                }`}
              >
                {slide.map(({ step, number }, pi) => (
                  <StepPanel
                    key={`${si}-${step.title}-${pi}`}
                    step={step}
                    number={number}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-5">
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to set ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === index % total ? "w-6 bg-cyan-400" : "w-2 bg-white/20"
              }`}
            />
          ))}
        </div>
       
      </div>
    </div>
  );
};

/* ---------- content data (verbatim) ---------- */

const introParagraphs = [
  "Social media marketing is a rapidly growing field that involves promoting businesses, products, or services on various social media platforms. This form of marketing utilizes channels like YouTube, Facebook, Instagram, and more to reach and engage with a targeted audience.",
  "For instance, imagine being an author in 2002, excited about releasing a book and starting a blog. However, reaching the right audience was a challenge, as traditional advertising options were limited, expensive, and lacked accurate performance measurement. Nowadays, digital marketing has emerged as a more cost-effective and versatile solution, enabling marketers to reach their audiences through search engines, websites, social media platforms, emails, and other digital channels.",
  "Within digital marketing, social media marketing stands out as a powerful tool. It allows marketers to leverage social media platforms to promote content to a highly targeted audience. By using social media, authors can increase their book's visibility, interact with their audience, and gain valuable insights into audience preferences.",
  "To embark on a social media marketing journey, individuals often take certification courses to learn the best practices. Understanding the types of content suitable for social media, such as images, videos, polls, and posts, is essential for success.",
  "However, organic reach may not be sufficient to reach a wide audience, necessitating the use of social media advertising options provided by platforms like Facebook, YouTube, Instagram, and Twitter. These advertising options offer various formats and targeting capabilities to optimize reach and engagement with the desired audience. Social media marketing provides an effective and cost-efficient means to build a brand, engage with customers, and drive business growth in the digital age.",
];

const adTypes = [
  {
    icon: ImageIcon,
    title: "Image Ads",
    paragraphs: [
      "Social media ads leverage attractive images, ensuring the right balance of text to capture attention effectively. They incorporate compelling calls-to-action, encouraging user interaction. For instance, an author promoting their book can use captivating images related to the story or its characters. These ads may direct users to websites selling the book, enticing potential readers to make a purchase. Through engaging visuals and effective calls-to-action, social media ads boost brand awareness, foster user interaction, and drive sales, making them a vital part of successful digital marketing strategies for authors and businesses alike.",
    ],
  },
  {
    icon: PenTool,
    title: "Text Ads and Post Ads",
    paragraphs: [
      "Social media ads can effectively promote posts featuring excerpts from your blog or book, generating additional interest from a curious and engaged audience. By showcasing intriguing snippets of content, these ads entice potential readers or customers to explore more. This strategy sparks curiosity and encourages users to click on the ad or follow a call-to-action, leading them to read the full blog post or consider purchasing the book. Utilizing social media ads to highlight captivating excerpts is an excellent way to build anticipation, attract new followers, and increase overall engagement with your content.",
    ],
  },
  {
    icon: Video,
    title: "Video Ads",
    paragraphs: [
      "In addition to using images and text, video ads can be a powerful tool to promote your books. These video ads can feature favorable reviews and customer testimonials, providing social proof and building trust with potential readers. By showcasing positive feedback from satisfied customers or prominent reviewers, video ads create a sense of credibility and reliability around your book. Seeing and hearing real people praise your work can sway undecided audiences and encourage them to take action, such as visiting your website or making a purchase. Video ads offer a dynamic and engaging way to share your book's value and appeal, making them a valuable addition to your social media marketing strategy. With the right combination of images, text, and video, you can effectively capture the attention of your target audience and drive meaningful interactions and conversions for your book.",
    ],
  },
  {
    icon: Mail,
    title: "Lead Ads",
    paragraphs: [
      "Through lead ads, you can gather information from users who express interest in receiving weekly newsletters or regular updates from your blogs, allowing you to build a loyal audience and maintain regular communication with them.",
    ],
  },
];

const bridgeParagraphs = [
  "But social media marketing offers even more possibilities. It enables you to establish and promote your personal brand, capturing audience interest and engaging with them through unique and compelling content. By creating a distinct identity and consistently sharing engaging posts, you can nurture a loyal following that identifies with your brand and its values.",
  "Additionally, social media platforms provide powerful targeting options, allowing you to reach specific audiences based on demographics such as age, location, gender, and more. As your social media presence grows, you will likely observe an increase in the number of viewers on your page, consequently driving more traffic to your blog. This extended reach and engagement can lead to a significant increase in book sales, significantly expanding your audience. Overall, social media marketing is a versatile and invaluable tool to build your brand, connect with your target audience, and drive continuous growth in your readership and book sales.",
];

const advantages = [
  {
    icon: Zap,
    title: "Easy Accessibility to Customers",
    text: "Social media marketing provides a direct channel to reach potential customers, making them readily available for engagement.",
  },
  {
    icon: PenTool,
    title: "Simple Advertisement Method",
    text: "It offers a straightforward approach to promote products and services, allowing businesses to showcase their offerings effectively.",
  },
  {
    icon: TrendingUp,
    title: "Increased Website Traffic",
    text: "By leveraging social media platforms, businesses can drive more traffic to their websites, boosting online visibility and potential conversions.",
  },
  {
    icon: MessageCircle,
    title: "Customer Satisfaction",
    text: "Social media marketing facilitates direct communication with customers, enabling businesses to address their needs promptly and enhance satisfaction levels.",
  },
  {
    icon: Layers,
    title: "Integration with SEO Marketing",
    text: "Social media marketing and SEO strategies can complement each other, resulting in a more comprehensive and impactful digital marketing approach.",
  },
  {
    icon: Target,
    title: "Higher Conversion Rates",
    text: "Utilizing social media marketing techniques can lead to improved conversion rates, as targeted audiences are more likely to engage with relevant content.",
  },
  {
    icon: DollarSign,
    title: "Sales Opportunity",
    text: "Social media platforms offer opportunities for businesses to promote and sell products or services directly, facilitating sales and revenue generation.",
  },
  {
    icon: Share2,
    title: "Cost-Effective Marketing",
    text: "By using social media channels, businesses can save on traditional marketing infrastructure costs, making it a cost-efficient advertising method.",
  },
  {
    icon: Globe2,
    title: "Wider Audience Reach",
    text: "Social media marketing enables businesses to reach a vast and diverse audience, expanding their brand's visibility and potential customer base.",
  },
  {
    icon: Heart,
    title: "Building Brand Authenticity",
    text: "Through a social business page, companies can establish brand authenticity by sharing valuable content, engaging with users, and showcasing their values.",
  },
  {
    icon: Users,
    title: "Direct Audience Connection",
    text: "Social media marketing fosters a direct and personal connection with the audience, leading to stronger customer relationships and loyalty.",
  },
];

const strategyIntro =
  "Starting where you are is crucial in social media marketing. Conducting a comprehensive social media audit is vital to assess the current activity on platforms like Facebook, Instagram, Twitter, YouTube, and others. This audit helps identify strengths and weaknesses in your social media strategy, enabling you to understand what works and what needs improvement. During the audit, review and analyze your online presence, ensuring consistency across all channels. Pay attention to your competitors, both established and emerging ones, to gain insights into their strategies and identify potential opportunities for improvement. Evaluate your SEO results as well, as search engine optimization plays a significant role in driving traffic to your social media profiles and website. By collecting and analyzing this data, you'll have a clearer understanding of your current standing and areas where you can enhance your social media marketing efforts. Once you have gathered all the information, take the time to reflect on the findings and consider how you can optimize your social media strategy to align with your goals and target audience. Implement changes and adjustments as needed to improve your online presence and drive better results in your social media marketing endeavors.";

const strategySteps = [
  {
    image: image4,
    icon: Target,
    title: "Define Your Objectives",
    paragraphs: [
      "Your objectives in social media marketing should align with your organization's priorities. Begin by understanding your organization's core values and mission. Then, delve into the overall marketing plan to ensure consistency across all channels. Develop a robust social media strategy that complements the broader marketing efforts. Create a content strategy that aligns with your social media plan.",
      "With a comprehensive framework in place, you can now establish specific and measurable objectives. These objectives should be both qualitative and quantitative, reflecting the goals you aim to achieve. Make sure they are achievable and relevant to your organization's overall growth and success. Lastly, set a timeframe for achieving these objectives, providing a clear sense of direction and accountability for your social media marketing efforts. By setting SMART objectives (Specific, Measurable, Achievable, Relevant, and Time-framed), you can effectively measure your progress and success in social media marketing.",
    ],
  },
  {
    image: image5,
    icon: Users,
    title: "Identify Your Audience",
    paragraphs: [
      "Understanding your audience and their demographics, interests, motivations, and preferred communication channels is essential in social media marketing. Utilize any existing data you have, such as customer information or market research. Engage with your current customers to gain insights into their preferences and needs. Conduct thorough online research to further enhance your understanding.",
      "Once you have gathered all the data, create personas that go beyond mere demographic descriptions. Bring these personas to life by crafting real-life characters and telling their stories. Dive deep into their lives, understanding what drives them, their passions, interests, and thought processes.",
      "By developing these detailed personas, you will gain a more profound and empathetic understanding of your target audience. This knowledge will enable you to tailor your social media marketing content and messaging to resonate with your audience, creating stronger connections and driving higher engagement with your brand.",
    ],
  },
  {
    image: image6,
    icon: Compass,
    title: "Choose the Right Channel",
    paragraphs: [
      "Avoid the temptation of joining every social media channel simply because others are present. Opting for the right channels and a suitable number of channels is essential for effective and efficient social media marketing. Take time to consider what aligns with your organization's purpose and who your target audience is.",
      "Delve into the type of content that best represents your organization and resonates with your audience. Consider what content you are capable of creating consistently and how it aligns with your brand identity. Also, factor in the costs associated with maintaining a presence on each platform.",
      "By carefully selecting the most appropriate social media channels for your organization, you can optimize your marketing efforts, build authentic connections with your audience, and achieve better results in the long run. Remember, quality and relevance matter more than quantity when it comes to social media marketing.",
    ],
  },
  {
    image: image7,
    icon: Layers,
    title: "Create Great Content",
    paragraphs: [
      "In the ever-growing digital landscape, good content alone is not sufficient to stand out. To truly make an impact and rise above the noise and vast amount of content, you must strive for greatness. Understanding the different content categories, such as creation, curation, and co-creation, along with various content formats, becomes crucial in this pursuit.",
      "Your content should aim to entertain, educate, or inspire your audience, regardless of its type. Adding value to your audience's lives should be the central focus of your content strategy. Whether you are creating original content, curating relevant information, or collaborating with your audience for co-creation, the key is to deliver content that resonates and offers something meaningful to your target audience.",
      "By consistently providing high-quality content that brings value to your audience, you can effectively cut through the noise, foster genuine engagement, and build lasting connections with your followers. Striving for greatness in your content will set your brand apart and establish you as a credible and authoritative presence in your industry.",
    ],
  },
  {
    image: image8,
    icon: Radio,
    title: "Be Social",
    paragraphs: [
      "Social media is aptly named because how you engage with your audience can significantly impact their levels of engagement. Interacting with your followers is crucial to building strong relationships. Identify potential collaborations with other brands or influencers to expand your reach and relevance.",
      "Moreover, actively engage with people who view and comment on your content. Being social and responsive will foster a deeper connection with your audience and help you build a loyal following. Social media has become a powerful tool for businesses, both small and large. The ever-evolving landscape and technology offer immense opportunities, but also present challenges.",
      "Companies that effectively use social media enjoy substantial benefits, while some might face negative consequences if not managed well. Social media is no longer optional, especially for businesses that deal directly with customers. It has become a necessity to maintain a competitive edge.",
      "Embracing social media opens doors to various opportunities, but organizations must also prepare themselves to navigate the challenges it brings. With the right approach and strategy, social media can be a game-changer for businesses, allowing them to thrive in the dynamic digital world.",
    ],
  },
];

/* ---------- page ---------- */

export default function SocialMediaMarketing() {
  const navigate = useNavigate();
  const serviceQuery = useServicePage("social-media-marketing");
  if (serviceQuery.isPending) {
    return <ServicePageStatus message="Loading social media marketing content..." />;
  }
  if (serviceQuery.isError) {
    return <ServicePageStatus message={`Social media marketing content could not be loaded: ${serviceQuery.error.message}`} />;
  }
  const pageData = getServicePageData(serviceQuery.data?.content);
  if (!pageData) {
    return <ServicePageStatus message="Social media marketing content is not available." />;
  }
  type ParagraphCard = { title: string; paragraphs: string[]; icon: string };
  type StrategyStep = { title: string; paragraphs: string[]; image: string; icon: string };
  const iconByName: Record<string, LucideIcon> = {
    ImageIcon, PenTool, Video, Mail, Target, Users, Compass, Layers, Radio,
  };
  const introParagraphs = serviceArray<string>(pageData, "introParagraphs");
  const adTypes = serviceArray<ParagraphCard>(pageData, "adTypes").map((item) => ({
    ...item,
    icon: iconByName[item.icon] || ImageIcon,
  }));
  const bridgeParagraphs = serviceArray<string>(pageData, "bridgeParagraphs");
  const advantages = serviceArray<{ title: string; text: string }>(pageData, "advantages");
  const strategyIntro = serviceText(pageData, "strategyIntro");
  const strategySteps = serviceArray<StrategyStep>(pageData, "strategySteps").map((item) => ({
    ...item,
    icon: iconByName[item.icon] || Target,
  }));
  
  return (
    <div className="min-h-screen bg-[#05060f] text-white antialiased selection:bg-blue-500/30">
      <Navbar />
      {/* background ambience */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-cyan-600/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-[24rem] w-[24rem] rounded-full bg-blue-800/10 blur-[120px]" />
      </div>

      <div className="relative">
        {/* ---------------- HERO ---------------- */}
        <header className="mx-auto max-w-6xl px-6 pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="grid items-center gap-14 md:grid-cols-2">
            <div>
              <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
                {serviceText(pageData, "heroTitle")}{" "}
                <span className="bg-gradient-to-r from-sky-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  {serviceText(pageData, "heroAccent")}
                </span>
              </h1>
              <p className="mt-6 text-slate-400 text-lg leading-relaxed max-w-lg">
                {serviceText(pageData, "heroDescription")}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button 
                onClick={() => navigate("/enquiryNow")}
                className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-transform hover:scale-105">
                  {serviceText(pageData, "ctaLabel")}
                </button>
               
              </div>
            </div>

            <div className="relative mx-auto flex h-72 w-72 items-center justify-center overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm md:h-96 md:w-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-400/20 blur-2xl" />
              <img
                src={serviceText(pageData, "heroImage")}
                alt={serviceText(pageData, "heroImageAlt")}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* ---------------- INTRO (full text) ---------------- */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <SectionHeading
            eyebrow={serviceText(pageData, "overviewEyebrow")}
            title={serviceText(pageData, "overviewTitle")}
          />
          <Panel>
            {introParagraphs.map((p, i) => (
              <p
                key={i}
                className={`text-slate-300 leading-relaxed ${
                  i > 0 ? "mt-5" : ""
                }`}
              >
                {p}
              </p>
            ))}
          </Panel>
        </section>

        {/* ---------------- AD TYPES (full text) ---------------- */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <SectionHeading
            eyebrow={serviceText(pageData, "adTypesEyebrow")}
            title={serviceText(pageData, "adTypesTitle")}
          />
          <div className="grid gap-6 md:grid-cols-2">
            {adTypes.map((a) => (
              <Panel key={a.title}>
                <IconTile icon={a.icon} />
                <h3 className="text-white font-semibold text-lg mb-3">
                  {a.title}
                </h3>
                {a.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className={`text-sm text-slate-400 leading-relaxed ${
                      i > 0 ? "mt-3" : ""
                    }`}
                  >
                    {p}
                  </p>
                ))}
              </Panel>
            ))}
          </div>
        </section>

        {/* ---------------- BRIDGE PARAGRAPHS (full text) ---------------- */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="text-left">
              <Eyebrow>{serviceText(pageData, "bridgeEyebrow")}</Eyebrow>
              <h2 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {serviceText(pageData, "bridgeTitle")}
              </h2>
              {bridgeParagraphs.map((p, i) => (
                <p
                  key={i}
                  className={`text-slate-400 leading-relaxed ${
                    i === 0 ? "mt-5" : "mt-5"
                  }`}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Drop your own image in this placeholder */}
         <div className="relative mx-auto flex h-80 w-full max-w-[28rem] items-center justify-center overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm md:h-[28rem] md:w-full">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-400/20 blur-2xl" />
              <img
                src={serviceText(pageData, "bridgeImage")}
                alt={serviceText(pageData, "bridgeImageAlt")}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* ---------------- ADVANTAGES (timeline, full text) ---------------- */}
        <section className="border-y border-white/10 bg-white/[0.02] py-24">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading
              eyebrow={serviceText(pageData, "advantagesEyebrow")}
              title={serviceText(pageData, "advantagesTitle")}
            />

            {/* mobile: single-column rail */}
            <div className="relative md:hidden">
              <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400/60 via-blue-500/40 to-cyan-400/60" />
              <div className="space-y-8">
                {advantages.map((a, i) => (
                  <div key={a.title} className="relative pl-12">
                    <div className="absolute left-0 top-0 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-cyan-400 bg-[#05060f] shadow-[0_0_14px_rgba(34,211,238,0.5)]">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                      <div className="flex items-center gap-2.5">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-[11px] font-bold text-cyan-400">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h4 className="font-semibold text-white">
                          {a.title}
                        </h4>
                      </div>
                      <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                        {a.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* desktop: alternating timeline */}
            <div className="relative hidden md:block">
              <div className="absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-gradient-to-b from-cyan-400/60 via-blue-500/40 to-cyan-400/60" />
              <div className="space-y-10">
                {advantages.map((a, i) => {
                  const card = (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-cyan-400">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h4 className="font-bold text-white">{a.title}</h4>
                      </div>
                      <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                        {a.text}
                      </p>
                    </div>
                  );
                  return (
                    <div
                      key={a.title}
                      className="grid grid-cols-[1fr_56px_1fr] items-center gap-6"
                    >
                      {i % 2 === 0 ? card : <div />}
                      <div className="relative z-10 flex justify-center">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-cyan-400 bg-[#05060f] shadow-[0_0_16px_rgba(34,211,238,0.55)]">
                          <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                        </div>
                      </div>
                      {i % 2 === 1 ? card : <div />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- STRATEGY INTRO (full text) ---------------- */}
        <section className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeading
            eyebrow={serviceText(pageData, "strategyEyebrow")}
            title={serviceText(pageData, "strategyTitle")}
          />
          <div className="grid items-center gap-12 md:grid-cols-2">
            <p className="text-left text-slate-300 leading-relaxed">
              {strategyIntro}
            </p>

            {/* Drop your own image in this placeholder */}
           <div className="relative mx-auto flex h-72 w-72 items-center justify-center overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm md:h-96 md:w-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-400/20 blur-2xl" />
              <img
                src={serviceText(pageData, "strategyImage")}
                alt={serviceText(pageData, "strategyImageAlt")}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* ---------------- STRATEGY STEPS (slideshow, 3 sets of full text) ---------------- */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <StrategyCarousel steps={strategySteps} />
        </section>

        {/* ---------------- CTA ---------------- */}
        <section className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            {serviceText(pageData, "ctaTitle")}
          </h2>
          <p className="mt-4 text-slate-400">
            {serviceText(pageData, "ctaDescription")}
          </p>
          <button 
          onClick={() => navigate("/enquiryNow")}
          className="mt-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-transform hover:scale-105">
            {serviceText(pageData, "ctaLabel")}
          </button>
        </section>

        {/* ---------------- FOOTER ---------------- */}
       
      </div>
      <FooterSection />
    </div>
  );
}