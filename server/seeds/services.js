function image(filename) {
  const assetPath = `src/assets/${filename}`;
  return `/api/media?path=${encodeURIComponent(assetPath)}`;
}

function service({
  slug,
  title,
  eyebrow,
  heroTitle,
  heroAccent,
  heroDescription,
  heroImage,
  sections,
}) {
  return {
    type: "service",
    slug,
    title,
    content: {
      serviceSeedVersion: 1,
      eyebrow,
      heroTitle,
      heroAccent,
      heroDescription,
      heroImage: image(heroImage),
      sections: sections.map((section) => ({
        ...section,
        image: section.image ? image(section.image) : undefined,
        cards: section.cards?.map((card) => ({
          ...card,
          image: card.image ? image(card.image) : undefined,
        })),
      })),
      ctaTitle: `Ready to grow with ${title}?`,
      ctaDescription: "Talk with our team about your goals and get a practical plan tailored to your business.",
      ctaLabel: "Enquiry Now",
      ctaHref: "/enquiryNow",
    },
  };
}

const serviceSeeds = [
  service({
    slug: "seo-optimization",
    title: "Search Engine Optimization",
    eyebrow: "Search Engine Optimization",
    heroTitle: "Search Engine",
    heroAccent: "Optimisation",
    heroDescription: "Boost your online visibility, attract qualified traffic, and outrank competitors with data-driven SEO strategies designed for sustainable business growth.",
    heroImage: "seooptimisation1.jfif",
    sections: [
      {
        eyebrow: "SEO Score Check",
        title: "Check Your Website SEO Score And Get 2x More Traffic Per Day",
        paragraphs: ["SEO is an essential aspect of every website, as it enhances visibility on search engines. By optimizing your website, search engines can easily identify and index your content, making your products or services more accessible to the public. This increased visibility leads to better online exposure, helping you reach a broader audience and establish familiarity with your offerings."],
        cards: [
          { title: "Why We Need SEO?", text: "Search engine optimization helps people find your business when they search for relevant products and services. A useful SEO strategy improves visibility, attracts qualified visitors, and builds long-term organic growth." },
          { title: "On-Page Optimization", text: "We improve page structure, content, metadata, internal links, and technical signals so visitors and search engines can understand your website." },
          { title: "Off-Page Optimization", text: "We strengthen authority with a measured approach to relevant links, brand mentions, and trusted online references." },
        ],
      },
      {
        eyebrow: "Our Approach",
        title: "A proven 4-step workflow",
        cards: [
          { title: "Discover", text: "Understand your business, audience, competitors, and current search performance." },
          { title: "Plan", text: "Prioritize technical improvements, keywords, and content opportunities around your goals." },
          { title: "Optimize", text: "Improve your site pages and publish useful content that meets search intent." },
          { title: "Measure", text: "Track rankings, traffic, and conversions, then refine the strategy using performance data." },
        ],
      },
      {
        eyebrow: "Sustainable Growth",
        title: "Built for sustained, compounding growth",
        paragraphs: ["SEO is an ongoing investment. We focus on durable improvements that grow qualified traffic over time, rather than short-term tactics that put your visibility at risk."],
        image: "seo.webp",
      },
      {
        eyebrow: "Where clients discover you online",
        title: "Be visible across the search journey",
        cards: [
          { title: "Organic results", text: "Reach people researching products, services, and answers related to your business." },
          { title: "Local search", text: "Help nearby customers discover your business and take the next step." },
          { title: "Helpful content", text: "Build trust by answering the questions your potential customers are already asking." },
        ],
      },
    ],
  }),
  service({
    slug: "search-engine-marketing",
    title: "Search Engine Marketing",
    eyebrow: "Search Engine Marketing",
    heroTitle: "Search Engine",
    heroAccent: "Marketing",
    heroDescription: "Creating paid advertising campaigns that appear in search engine results — targeting the right keywords, in the right locations, to put your brand at the top of the page.",
    heroImage: "Mastering Search Engine Optimization and Data Analytics.webp",
    sections: [
      {
        eyebrow: "Overview",
        title: "What Is Search Engine Marketing?",
        paragraphs: [
          "Search Engine Marketing (SEM) involves creating paid advertising campaigns that appear in search engine results, while Search Engine Optimization (SEO) aims to achieve organic results. In SEM, advertisers pay to target specific keywords based on potential customers' search terms. These paid placements help advertisers drive potential customers to their websites, ultimately generating revenue.",
          "When someone searches Google, the top ad is a result of search engine marketing. Businesses use these placements to attract potential clients to their websites through paid advertisements.",
          "The positioning of your promotion on the search engine results page is determined by your bid for specific keywords and your ad's quality score in relation to others.",
          "SEM is a powerful way to boost visibility and drive relevant traffic by strategically targeting search terms and potential customers.",
        ],
      },
      {
        eyebrow: "Know The Difference",
        title: "Search Engine Marketing (SEM) vs Search Engine Optimization (SEO)",
        cards: [
          { title: "SEO", image: "How to Hire SEO Agency for Higher Website Traffic.webp", text: "Search Engine Optimization improves a website's visibility and ranking within search engines like Google and Bing. It focuses on organic traffic by naturally appearing in search results. By optimizing your website and its content, you attract people searching for relevant information or products." },
          { title: "SEM", image: "sem.webp", text: "Search Engine Marketing combines organic search optimization and paid advertising. PPC campaigns let businesses display targeted ads to users and invest in placements that drive traffic and help achieve marketing goals." },
        ],
      },
      {
        eyebrow: "The Benefits",
        title: "What Are The Benefits Of Search Engine Marketing",
        cards: [
          { title: "Location-Based Ads", text: "Target people by location, choose languages, and display ads in a country, city, or specific area to reach relevant potential customers." },
          { title: "Small Business Guide", text: "SEM helps small businesses reach their audience, acquire customers, boost revenue, and compete in the digital space with focused campaigns." },
          { title: "Brand Awareness", text: "Paid placements can build visibility while organic search and social strategies develop over time." },
          { title: "Pay Per Click", text: "Paid search ads can earn exposure without a charge for each impression; you are charged when someone clicks your ad." },
          { title: "Reach the top of search", text: "Prominent placements help people associate your brand with the needs and queries they are searching for." },
        ],
      },
    ],
  }),
  service({
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    eyebrow: "Social Media Marketing",
    heroTitle: "Social Media",
    heroAccent: "Marketing",
    heroDescription: "Build meaningful connections with your audience and grow your brand through thoughtful social media strategy, creative content, and targeted campaigns.",
    heroImage: "alexander-shatov-mr4JG4SYOF8-unsplash.webp",
    sections: [
      {
        eyebrow: "Overview",
        title: "Social media that supports your business goals",
        paragraphs: [
          "Social platforms give businesses a direct way to connect with customers, share useful content, and build brand awareness. A clear strategy helps every post and campaign support a wider business objective.",
          "We help plan consistent social activity, create content for the right audience, and use campaign performance to improve future decisions.",
        ],
      },
      {
        eyebrow: "Social Advertising",
        title: "Choose the right campaign for your goals",
        cards: [
          { title: "Awareness campaigns", image: "milad-fakurian-pP5gt6Qbzig-unsplash.webp", text: "Introduce your brand and offerings to relevant audiences across the platforms they use." },
          { title: "Traffic campaigns", image: "boliviainteligente-FnWQJfyB-TA-unsplash.webp", text: "Encourage interested users to visit your website, landing page, or online store." },
          { title: "Lead generation", image: "dusan-osmokrovic-oQjCLJYOQsE-unsplash.webp", text: "Use targeted campaigns to connect with potential customers and build a pipeline of enquiries." },
          { title: "Remarketing", image: "city-church-ca-NKS1k-3fX0U-unsplash.webp", text: "Reconnect with people who have already interacted with your business or content." },
        ],
      },
      {
        eyebrow: "Why Social Media",
        title: "Advantages of a considered social strategy",
        cards: [
          { title: "Audience insight", text: "Learn what your audience responds to and use that insight to make better content decisions." },
          { title: "Brand consistency", text: "Present a recognizable voice and visual identity across your social channels." },
          { title: "Community building", text: "Create opportunities for customers to engage with your business and each other." },
          { title: "Measurable campaigns", text: "Review reach, engagement, traffic, and conversions to refine your social activity." },
        ],
      },
    ],
  }),
  service({
    slug: "website-development",
    title: "Website Development",
    eyebrow: "Website Development — Ecommerce Development",
    heroTitle: "Website",
    heroAccent: "Development",
    heroDescription: "From simple informational sites to sophisticated e-commerce platforms — a decade of experience building websites that communicate your message clearly and effectively.",
    heroImage: "website.webp",
    sections: [
      {
        eyebrow: "Overview",
        title: "Website Development — Ecommerce Development",
        paragraphs: [
          "In today's digital world, having a strong online presence is essential. Therefore, placing significant emphasis on web design and web development is crucial before implementation. An effective web design should be simple, with a theme that clearly conveys the intended message to the users.",
          "With a decade of experience, we have successfully created numerous websites, spanning from simple informational sites to sophisticated e-commerce platforms. Explore our portfolio to see our expertise and capabilities.",
        ],
      },
      {
        eyebrow: "Before You Begin",
        title: "Factors That Contribute to a Successful Website",
        paragraphs: ["Before diving into web design and development, it's crucial to consider various factors that contribute to the success of your website."],
        cards: [
          { title: "Purpose of the Site", image: "download.webp", text: "The website's design should serve its purpose effectively. Ensure that users can easily find all the information they need about your products or services. Focus on providing value to visitors rather than just making the website visually attractive." },
          { title: "Usability", image: "Productivity Workspace UI.webp", text: "A user-friendly design is paramount. Navigation should be intuitive, allowing users to move seamlessly throughout the site." },
          { title: "Quality Content", image: "Cyber security dashboard.webp", text: "Website content should be informative, original, and easy to understand, with essential information about your services readily available." },
        ],
      },
      {
        eyebrow: "Our Work",
        title: "Discover Some of Our Web Design Projects",
        paragraphs: ["These projects showcase our dedication to creating visually appealing and user-friendly websites that effectively communicate our clients' messages."],
        cards: [
          { title: "Web design project", image: "web1 (1).webp", text: "A selection from our website design portfolio." },
          { title: "E-commerce project", image: "web2.webp", text: "A selection from our e-commerce development portfolio." },
        ],
      },
    ],
  }),
  service({
    slug: "mobileapp-development",
    title: "Mobile App Development",
    eyebrow: "Mobile App Development",
    heroTitle: "Mobile App",
    heroAccent: "Development",
    heroDescription: "We develop mobile experiences that help businesses serve customers, streamline operations, and make useful services available wherever people are.",
    heroImage: "AI2.webp",
    sections: [
      {
        eyebrow: "Overview",
        title: "Mobile apps for a connected world",
        paragraphs: ["The advent of smartphones has ushered in a new era of user experience. With users relying heavily on their devices, there has been a surge in mobile app development. Apps have become an essential platform for businesses and individuals to engage with their audience and provide valuable services on the go."],
      },
      {
        eyebrow: "Business Benefits",
        title: "How mobile apps support business growth",
        cards: [
          { title: "Enhancing User Experience", image: "AI.webp", text: "Mobile apps provide focused, valuable experiences for users. Seamless interactions and content tailored to user needs create a compelling reason to engage with an app." },
          { title: "Boosting Business Growth", image: "download (1).webp", text: "A dedicated app creates a direct line of communication with customers. Business updates and promotions can reach users based on their interests, helping foster stronger relationships and growth." },
        ],
      },
      {
        eyebrow: "App Types",
        title: "Choose the right app approach",
        cards: [
          { title: "Native App", image: "img1 (1).webp", text: "Native apps are designed for specific platforms and can use device features to deliver a seamless, optimized experience." },
          { title: "Hybrid App", image: "img1 (2).webp", text: "Hybrid apps combine native and web technologies to provide a versatile user experience across platforms." },
          { title: "Web App", image: "img1 (3).webp", text: "Web apps run in a browser and offer cross-platform access on devices with an internet browser." },
        ],
      },
      {
        eyebrow: "Selected Projects",
        title: "Mobile apps we've built",
        cards: [
          { title: "Smartcon", image: "smart.webp", text: "Mobile app project." },
          { title: "PMS", image: "pms1.webp", text: "Mobile app project." },
          { title: "HR", image: "hr1.webp", text: "Mobile app project." },
          { title: "ADMC", image: "admc.webp", text: "Mobile app project." },
          { title: "Saif Sports Club-Booking", image: "sai1.webp", text: "Mobile app project." },
        ],
      },
    ],
  }),
  service({
    slug: "cloud-hosting",
    title: "Cloud Hosting",
    eyebrow: "Cloud Hosting",
    heroTitle: "Cloud",
    heroAccent: "Hosting",
    heroDescription: "Reliable cloud, VPS, dedicated server, and email hosting solutions to keep your business connected and your applications available.",
    heroImage: "cloud1.webp",
    sections: [
      {
        eyebrow: "Overview",
        title: "Cloud hosting built for reliability and scale",
        paragraphs: ["Cloud hosting runs applications across multiple servers to distribute workloads and support high availability. If one server fails, work can shift to other servers, helping reduce downtime and maintain service."],
      },
      {
        eyebrow: "Cloud Hosting Benefits",
        title: "A flexible hosting foundation",
        cards: [
          { title: "High Reliability", image: "IoT Developments Shaping the Future of Connected Technology.webp", text: "Distributing applications across multiple servers reduces the risk of complete downtime and helps maintain availability when a server fails." },
          { title: "Scalability", image: "Techsodise builds digital growth systems_.webp", text: "Scale resources up or down as demand changes to support optimal performance." },
          { title: "Cost-Efficiency", image: "cost.webp", text: "A pay-as-you-go model helps align spending with the resources you use." },
          { title: "Data Redundancy", image: "data.webp", text: "Backup and replication across locations help reduce the risk of data loss." },
          { title: "Global Reach", image: "global.webp", text: "Deploy applications in data centers around the world for improved access across regions." },
          { title: "Flexibility", image: "cloud1.webp", text: "Configure cloud services and tools to suit your application requirements." },
        ],
      },
      {
        eyebrow: "Dedicated Servers",
        title: "Dedicated resources for demanding workloads",
        cards: [
          { title: "Abundant Resources", image: "Affordable Dedicated Servers in Phoenix, USA – Atalnetworks.webp", text: "Get CPU, RAM, and storage dedicated to your applications, without resource contention from other users." },
          { title: "High Security", text: "Operate in an isolated environment with control over firewalls, security patches, and access permissions." },
          { title: "Reliable Performance", text: "Enjoy consistent performance with server resources that are not shared with other customers." },
          { title: "Cost-Efficiency", text: "Get predictable pricing for a powerful hosting solution without managing on-premise hardware." },
        ],
      },
      {
        eyebrow: "Email and Applications",
        title: "More ways to keep your business connected",
        cards: [
          { title: "WordPress Hosting", text: "Managed WordPress environments optimized for speed, security, and straightforward content updates." },
          { title: "Google Workspace Integration", image: "email.webp", text: "Connect your domain with Google Workspace for professional email, calendars, and collaboration tools." },
          { title: "Email Migration", text: "Move mailboxes and data from Outlook to Google Workspace with a guided process designed to minimize downtime." },
        ],
      },
    ],
  }),
];

export default serviceSeeds;
