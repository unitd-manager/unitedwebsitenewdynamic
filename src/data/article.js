// Shared article content for the blog detail pages.
// Each entry's `slug` must match the slug used in BlogPage.jsx

import technology1 from "../assets/technology1.webp";
import technology2 from "../assets/technology2.webp";
import technology3 from "../assets/technology3.webp";
import technology4 from "../assets/technology4.webp";
import technology5 from "../assets/technology5.webp";
import technology6 from "../assets/technology6.webp";

// Quantum Computing images
import quantum1 from "../assets/quantum1.webp";
import quantum2 from "../assets/quantum2.webp";
import quantum3 from "../assets/quantum3.webp";

// AI 2030 images
import AI1 from "../assets/AI1.webp";
import AI2 from "../assets/AI2.webp";
import AI3 from "../assets/AI3.webp";

// Ransomware / Cyber Security images
import cyber1 from "../assets/cyber1.webp";
import cyber2 from "../assets/cyber2.webp";
import cyber3 from "../assets/cyber3.webp";

// Software Development images
import software1 from "../assets/software1.webp";
import software2 from "../assets/software2.webp";
import software3 from "../assets/software3.webp";

// Cloud Computing images
import cloud1 from "../assets/cloud1.webp";
import cloud2 from "../assets/cloud2.webp";
import cloud3 from "../assets/cloud3.webp";

// AI Healthcare images
import health1 from "../assets/health1.webp";
import health2 from "../assets/health2.webp";
import health3 from "../assets/health3.webp";


export const articles = [
  {
    slug: "quantum-computing",
    title: "The Quantum Computing Revolution",
    category: "Technology",
    date: "12 May 2026",
    readTime: "9 min read",
    img: technology1,
    images: [quantum1, quantum2, quantum3],
    description:
      "Discover how quantum computing is transforming industries with next-generation processing power.",
    author: {
      name: "Maya Chen",
      role: "Senior Research Editor",
    }, 
    content: [
      {
        type: "paragraph",
        text: "Quantum computing is no longer confined to the realm of theoretical physics or science fiction. It's rapidly emerging as a game-changer in the tech world, promising unprecedented computational power and capabilities. In this article, we'll take a detailed look at the rise of quantum computing and what it means for the future of technology.",
      },
      {
        type: "heading",
        text: "Understanding Quantum Computing",
      },
      {
        type: "paragraph",
        text: "Quantum computing leverages the principles of quantum mechanics to process information in a fundamentally different way than classical computers. At the core of quantum computing are quantum bits or qubits, which can exist in multiple states simultaneously thanks to phenomena like superposition and entanglement. This enables quantum computers to perform parallel computations on a massive scale, potentially solving complex problems exponentially faster than classical computers.",
      },
      { type: "image", index: 0 },
      {
        type: "heading",
        text: "Applications and Potential",
      },
      {
        type: "paragraph",
        text: "The potential applications of quantum computing span a wide range of industries and fields. In finance, quantum computers could revolutionize portfolio optimization, risk analysis, and algorithmic trading by quickly analyzing vast amounts of data and identifying optimal strategies. In healthcare, quantum computing could accelerate drug discovery processes by simulating molecular interactions with unprecedented accuracy. Similarly, quantum computing holds promise in optimizing supply chains, weather forecasting, and cybersecurity.",
      },
      {
        type: "heading",
        text: "Challenges and Progress",
      },
      {
        type: "paragraph",
        text: "Despite its immense potential, quantum computing faces significant challenges. One major hurdle is qubit stability and error correction. Qubits are fragile and prone to decoherence, where they lose their quantum state due to interactions with the environment. Researchers are actively working on error correction techniques, quantum error correction codes, and developing more robust qubits. Companies like IBM, Google, and Rigetti are making strides in building scalable quantum architectures and achieving quantum supremacy milestones.",
      },
      { type: "image", index: 1 },
      {
        type: "heading",
        text: "Implications for Society",
      },
      {
        type: "paragraph",
        text: "The rise of quantum computing will have profound implications for society. It could lead to breakthroughs in AI and machine learning, enabling more powerful and efficient algorithms. Quantum computing's impact on cryptography is particularly noteworthy, as it could render current encryption methods vulnerable to quantum attacks, necessitating the development of quantum-safe cryptography. Additionally, quantum computing raises ethical and societal concerns, such as data privacy, algorithmic biases, and job displacement in traditional industries.",
      },
      {
        type: "heading",
        text: "Looking Ahead",
      },
      {
        type: "paragraph",
        text: "As quantum computing continues to advance, we're on the brink of a new era in technology. While practical, commercial-scale quantum computers are still in development, their potential to reshape industries and solve complex problems is undeniable. Researchers, governments, and industry leaders must collaborate to address technical challenges, ethical considerations, and ensure responsible deployment of quantum technologies. Education and awareness about quantum computing will also be crucial in preparing society for the quantum revolution.",
      },
      { type: "image", index: 2 },
      {
        type: "heading",
        text: "Conclusion",
      },
      {
        type: "paragraph",
        text: "In conclusion, the rise of quantum computing represents a transformative shift in how we process information and tackle complex problems. It's not just about faster computers but a paradigm shift that will impact various aspects of our lives. Navigating this quantum leap requires a multidisciplinary approach, encompassing scientific research, technological innovation, ethical considerations, and public engagement. Embracing the potential of quantum computing while addressing its challenges will pave the way for a future where computation knows no bounds.",
      },
    ],
  },

  {
    slug: "ai-2030",
    title: "Artificial Intelligence in 2030",
    category: "Artificial Intelligence",
    date: "18 May 2026",
    readTime: "10 min read",
    img: technology2,
    images: [AI1, AI2, AI3],
    description:
      "Explore the future of AI and how it will reshape businesses, healthcare and automation.",
    author: {
      name: "Daniel Okafor",
      role: "AI Strategy Lead",
    },
    content: [
      {
        type: "paragraph",
        text: "Artificial Intelligence (AI) has evolved rapidly in recent years, and its trajectory into the year 2030 promises transformative changes across industries and societies worldwide. In this article, we'll explore how AI is poised to reshape various sectors and the profound impact it will have on our daily lives.",
      },
      {
        type: "heading",
        text: "AI's Evolution and Current Landscape",
      },
      {
        type: "paragraph",
        text: "The journey of AI from its inception to its current state has been marked by significant advancements in machine learning, deep learning, natural language processing, and computer vision. AI systems have become adept at complex tasks such as image recognition, language translation, and decision-making, surpassing human capabilities in certain domains. Today, AI is integrated into numerous applications, from virtual assistants and recommendation systems to autonomous vehicles and healthcare diagnostics.",
      },
      { type: "image", index: 0 },
      {
        type: "heading",
        text: "Transforming Industries",
      },
      {
        type: "paragraph",
        text: "By 2030, AI is expected to revolutionize industries across the board. In healthcare, AI-driven diagnostics and personalized medicine will enhance patient care and treatment outcomes. Manufacturing will see increased automation and optimization through AI-powered robotics and predictive maintenance. Financial services will leverage AI for fraud detection, risk assessment, and algorithmic trading. Agriculture, transportation, retail, and entertainment are among the many sectors poised for AI-driven innovations.",
      },
      {
        type: "heading",
        text: "Societal Impact",
      },
      {
        type: "paragraph",
        text: "The widespread adoption of AI will bring about profound societal changes. AI-driven automation may lead to job displacement in certain sectors, necessitating reskilling and upskilling initiatives. Ethical considerations surrounding AI, such as bias in algorithms, data privacy, and transparency, will become paramount. Collaborative efforts involving policymakers, industry stakeholders, and AI researchers will be essential in addressing these challenges while harnessing AI's benefits for societal good.",
      },
      { type: "image", index: 1 },
      {
        type: "heading",
        text: "AI in Everyday Life",
      },
      {
        type: "paragraph",
        text: "In 2030, AI will be seamlessly integrated into our daily lives. Smart homes equipped with AI assistants will manage tasks, optimize energy usage, and enhance security. AI-powered education platforms will personalize learning experiences and provide lifelong learning opportunities. Autonomous vehicles will transform transportation, improving safety and efficiency. AI-driven virtual and augmented reality experiences will revolutionize entertainment, gaming, and immersive storytelling.",
      },
      {
        type: "heading",
        text: "Ethical and Regulatory Considerations",
      },
      {
        type: "paragraph",
        text: "As AI becomes more pervasive, ethical and regulatory frameworks will play a crucial role in shaping its development and deployment. Principles such as fairness, accountability, transparency, and human oversight will guide responsible AI practices. Regulatory bodies will need to adapt to the evolving AI landscape, balancing innovation with safeguards against potential risks and unintended consequences.",
      },
      { type: "image", index: 2 },
      {
        type: "heading",
        text: "Looking Ahead",
      },
      {
        type: "paragraph",
        text: "The year 2030 represents a pivotal moment in AI's journey, where its transformative potential will be fully realized. Embracing AI responsibly and ethically will be key to unlocking its benefits while mitigating risks. Continued research, collaboration, and dialogue among stakeholders will shape AI's evolution towards a more inclusive, equitable, and human-centered future.",
      },
      {
        type: "heading",
        text: "Conclusion",
      },
      {
        type: "paragraph",
        text: "In conclusion, AI in 2030 heralds a new era of technological innovation and societal transformation. It's a journey of opportunities and challenges, where AI's impact will be felt across industries, communities, and individuals. By embracing AI's potential, fostering ethical practices, and nurturing a culture of continuous learning and adaptation, we can harness the power of AI to create a brighter and more sustainable future for all.",
      },
    ],
  },

  {
    slug: "ransomware-protection",
    title: "The Rise of Ransomware: How Businesses Can Protect Themselves",
    category: "Cyber Security",
    date: "22 May 2026",
    readTime: "11 min read",
    img: technology3,
    images: [cyber1, cyber2, cyber3],
    description:
      "Learn the best cybersecurity strategies businesses can use to prevent ransomware attacks.",
    author: {
      name: "Priya Raman",
      role: "Security Operations Lead",
    },
    content: [
      {
        type: "paragraph",
        text: "In today's interconnected world, where our lives and businesses rely heavily on digital systems and networks, cybersecurity has become a paramount concern. The rapid advancement of technology brings with it an evolving threat landscape, where cybercriminals constantly devise new ways to exploit vulnerabilities and gain unauthorized access to sensitive information. In this article, we will explore the importance of cybersecurity and provide practical tips to help you protect your digital assets.",
      },
      {
        type: "heading",
        text: "1. Understand the Threats",
      },
      {
        type: "paragraph",
        text: "To effectively combat cyber threats, it's crucial to understand the different types of risks you may encounter. These include malware attacks, phishing attempts, data breaches, ransomware, and social engineering. By familiarizing yourself with these threats, you can better recognize and mitigate potential risks.",
      },
      {
        type: "heading",
        text: "2. Implement Strong Password Practices",
      },
      {
        type: "paragraph",
        text: "Passwords act as the first line of defense for your digital accounts. Ensure you use strong, unique passwords for each account and consider using a password manager to securely store them. Enable multi-factor authentication whenever possible to add an extra layer of security.",
      },
      { type: "image", index: 0 },
      {
        type: "heading",
        text: "3. Keep Software and Systems Updated",
      },
      {
        type: "paragraph",
        text: "Regularly update your operating system, software applications, and firmware to ensure you have the latest security patches. Cybercriminals often target known vulnerabilities, and updates help protect against these exploits. Enable automatic updates for convenience and enhanced security.",
      },
      {
        type: "heading",
        text: "4. Secure Your Home Network",
      },
      {
        type: "paragraph",
        text: "Secure your home Wi-Fi network by changing the default password, using strong encryption (WPA2 or WPA3), and regularly updating your router's firmware. Additionally, consider enabling a guest network to separate guest devices from your main network.",
      },
      {
        type: "heading",
        text: "5. Backup Your Data",
      },
      {
        type: "paragraph",
        text: "Regularly back up your important data to a secure location, such as an external hard drive or a cloud storage service. This ensures that even if your data is compromised or lost, you can restore it without significant disruption.",
      },
      { type: "image", index: 1 },
      {
        type: "heading",
        text: "6. Educate Yourself and Your Team",
      },
      {
        type: "paragraph",
        text: "Cybersecurity is a shared responsibility. Stay updated on the latest threats, best practices, and security trends. Educate your employees or family members about cybersecurity risks and the importance of following security protocols to create a culture of security awareness.",
      },
      {
        type: "heading",
        text: "7. Use Antivirus and Firewall Protection",
      },
      {
        type: "paragraph",
        text: "Install reputable antivirus software and keep it up to date. Antivirus programs help detect and eliminate malware, while firewalls act as a barrier against unauthorized access to your devices or network.",
      },
      {
        type: "heading",
        text: "8. Limit Data Sharing and Practice Data Privacy",
      },
      {
        type: "paragraph",
        text: "Be mindful of the information you share online. Avoid oversharing personal details on social media platforms and only provide sensitive information on secure, trusted websites. Regularly review and adjust privacy settings on your social media accounts and other online platforms.",
      },
      { type: "image", index: 2 },
      {
        type: "heading",
        text: "9. Establish an Incident Response Plan",
      },
      {
        type: "paragraph",
        text: "Prepare for potential security incidents by developing an incident response plan. This plan should outline steps to be taken in the event of a breach or security incident, including communication protocols, containment measures, and contact information for relevant parties.",
      },
      {
        type: "heading",
        text: "Conclusion",
      },
      {
        type: "paragraph",
        text: "Cybersecurity is a critical aspect of our digital lives. By understanding the threats, implementing strong security practices, and staying informed, you can protect your digital assets from malicious actors. Remember, cybersecurity is an ongoing effort that requires constant vigilance and adaptation to emerging threats. By prioritizing security and taking proactive measures, you can safeguard your digital presence and enjoy a safer online experience.",
      },
    ],
  },

  {
    slug: "cybersecurity-development",
    title: "Enhancing Cybersecurity in Software Development",
    category: "Software Development",
    date: "28 May 2026",
    readTime: "9 min read",
    img: technology4,
    images: [software1, software2, software3],
    description:
      "Modern development practices now require advanced security integration from day one.",
    author: {
      name: "Tomás Reyes",
      role: "Principal Engineer",
    },
    content: [
      {
        type: "paragraph",
        text: "Modern software development requires advanced security integration from day one. Rather than a single tool or checklist, a resilient security posture is built from several overlapping practices, each covering what the others might miss.",
      },
      {
        type: "labeled",
        label: "Data Encryption",
        text: "Using encryption techniques to protect sensitive data both in transit and at rest. Encryption converts data into a secure form that can only be decrypted with the appropriate keys, making it unreadable to unauthorized users.",
      },
      { type: "image", index: 0 },
      {
        type: "labeled",
        label: "Security Awareness and Training",
        text: "Educating employees and users about cybersecurity best practices, such as recognizing phishing emails, using strong passwords, and being cautious with data sharing. Regular training and awareness programs help create a security-conscious culture.",
      },
      {
        type: "labeled",
        label: "Incident Response and Recovery",
        text: "Establishing procedures and plans to respond promptly to security incidents, such as data breaches or system compromises. This includes mitigating the impact, containing the incident, investigating the cause, and restoring systems and data to normal operation.",
      },
      { type: "image", index: 1 },
      {
        type: "labeled",
        label: "Regular Updates and Patch Management",
        text: "Keeping systems, software, and firmware up to date with the latest security patches and updates to address known vulnerabilities and protect against emerging threats.",
      },
      {
        type: "labeled",
        label: "Continuous Monitoring and Threat Intelligence",
        text: "Deploying security monitoring tools and systems to detect and respond to potential threats in real-time. Threat intelligence involves staying updated on the latest cybersecurity trends, vulnerabilities, and attack techniques to proactively mitigate risks.",
      },
      { type: "image", index: 2 },
      {
        type: "heading",
        text: "An Ongoing Effort",
      },
      {
        type: "paragraph",
        text: "Cybersecurity is an ongoing effort that requires a proactive and multi-layered approach. Organizations and individuals need to stay vigilant, adapt to new threats, and continuously improve their security practices to effectively protect their digital assets from cyber attacks and maintain a secure computing environment.",
      },
    ],
  },

  {
    slug: "cloud-computing",
    title: "Cloud Computing and Its Impact on Software Development",
    category: "Cloud Computing",
    date: "02 June 2026",
    readTime: "8 min read",
    img: technology5,
    images: [cloud1, cloud2, cloud3],
    description:
      "Cloud technologies continue to redefine scalability, deployment and software innovation.",
    author: {
      name: "Sofia Bianchi",
      role: "Cloud Platform Architect",
    },
    content: [
      {
        type: "paragraph",
        text: "It's easy to forget how recently 'the cloud' was a novel idea. Not long ago, launching a new application meant procuring physical servers, estimating capacity months in advance, and hoping demand matched those estimates. Today, that entire process can happen in minutes, and the implications of that shift continue to ripple through how software gets built.",
      },
      {
        type: "heading",
        text: "From Infrastructure to Building Blocks",
      },
      {
        type: "paragraph",
        text: "Early cloud adoption was mostly about replacing physical servers with virtual ones — same architecture, different location. The more meaningful shift has been the rise of managed services that handle entire categories of infrastructure: databases that scale automatically, queues that handle massive throughput without configuration, and authentication systems that would have taken months to build in-house.",
      },
      {
        type: "paragraph",
        text: "This has changed what it means to build software. Teams increasingly assemble applications from these managed building blocks rather than constructing every layer themselves, which means smaller teams can build things that would have required entire infrastructure departments a decade ago.",
      },
      { type: "image", index: 0 },
      {
        type: "heading",
        text: "Scalability as a Default, Not a Project",
      },
      {
        type: "paragraph",
        text: "Perhaps the most underappreciated change is that scalability is no longer a separate engineering project that happens once an application becomes successful. Cloud-native architectures are designed to scale from day one, meaning the same application that handles ten users can handle ten million without a fundamental rewrite — assuming it was built with that elasticity in mind from the start.",
      },
      {
        type: "paragraph",
        text: "This has also changed cost conversations. Instead of large upfront capital expenses for hardware that may or may not be needed, costs scale with actual usage, which has made it dramatically cheaper to experiment, fail, and try again.",
      },
      { type: "image", index: 1 },
      {
        type: "heading",
        text: "The Multi-Cloud and Portability Question",
      },
      {
        type: "paragraph",
        text: "As organizations mature in their cloud usage, many start thinking about portability — the ability to move workloads between providers, or run the same application across multiple clouds. Containerization and orchestration tools have made this more achievable than it used to be, though true portability often comes with trade-offs against using a provider's most convenient managed services.",
      },
      {
        type: "paragraph",
        text: "The practical reality for most organizations is a pragmatic middle ground — using a primary cloud provider for most workloads while keeping critical systems portable enough to avoid being completely locked in.",
      },
      { type: "image", index: 2 },
      {
        type: "heading",
        text: "What This Means for Developers",
      },
      {
        type: "paragraph",
        text: "The day-to-day experience of writing software has changed alongside the infrastructure. Local development environments increasingly mirror cloud environments closely, deployment happens through automated pipelines rather than manual file transfers, and the line between 'writing code' and 'configuring infrastructure' continues to blur as infrastructure itself becomes defined in code.",
      },
      {
        type: "paragraph",
        text: "For developers entering the field today, understanding cloud fundamentals isn't a specialization anymore — it's as foundational as understanding how to work with a database or write a function.",
      },
    ],
  },

  {
    slug: "ai-healthcare",
    title: "AI in Healthcare: Transforming the Medical Landscape",
    category: "Healthcare",
    date: "06 June 2026",
    readTime: "10 min read",
    img: technology6,
    images: [health1, health2, health3],
    description:
      "AI-driven healthcare systems are improving diagnostics, patient care and medical efficiency.",
    author: {
      name: "Dr. Amina Yusuf",
      role: "Health Tech Correspondent",
    },
    content: [
      {
        type: "paragraph",
        text: "Healthcare has always generated enormous amounts of data — imaging scans, lab results, clinical notes, genetic information — but for most of medical history, the volume of that data far exceeded the human capacity to fully analyze it. AI is changing that equation, not by replacing clinical judgment, but by extending what clinicians can see and act on.",
      },
      {
        type: "heading",
        text: "Diagnostics: A Second Set of Eyes",
      },
      {
        type: "paragraph",
        text: "Medical imaging is where AI's impact has been most visible. Systems trained on vast numbers of scans can flag patterns that might be subtle or easy to miss during a busy shift — not to replace the radiologist's judgment, but to act as a consistent second reviewer that never gets tired and never has an off day.",
      },
      {
        type: "paragraph",
        text: "The same principle extends to pathology, dermatology, and ophthalmology, where visual pattern recognition plays a central diagnostic role. In each case, the technology works best as a collaborative tool — surfacing areas of concern for a human expert to evaluate, rather than issuing diagnoses independently.",
      },
      { type: "image", index: 0 },
      {
        type: "heading",
        text: "Personalized Treatment Pathways",
      },
      {
        type: "paragraph",
        text: "Treatment has traditionally followed broad protocols based on population-level data — what works best on average for patients with a given condition. AI is enabling a shift toward more personalized approaches, where a treatment plan can account for an individual's genetic profile, prior treatment responses, and even how their specific condition is likely to progress based on patterns seen in similar cases.",
      },
      {
        type: "paragraph",
        text: "This is particularly significant in oncology, where treatment effectiveness can vary dramatically between patients with what appears to be the same diagnosis. Matching patients to the treatments most likely to work for them — rather than a trial-and-error sequence — has meaningful implications for both outcomes and quality of life.",
      },
      { type: "image", index: 1 },
      {
        type: "heading",
        text: "Reducing the Administrative Burden",
      },
      {
        type: "paragraph",
        text: "Much of the conversation around AI in healthcare focuses on dramatic clinical breakthroughs, but some of the most immediate impact is happening in administration. Clinical documentation, insurance processing, appointment scheduling, and prior authorization requests consume enormous amounts of clinician time — time that AI-assisted tools can help reclaim.",
      },
      {
        type: "paragraph",
        text: "Ambient documentation tools that listen to patient conversations and draft clinical notes automatically are a good example — they don't change what care is delivered, but they give clinicians more time to actually deliver it, rather than spending it on paperwork.",
      },
      { type: "image", index: 2 },
      {
        type: "heading",
        text: "Trust, Oversight, and the Road Ahead",
      },
      {
        type: "paragraph",
        text: "None of this works without trust — from clinicians, patients, and regulators. AI systems in healthcare need to be transparent about how they reach conclusions, rigorously tested across diverse populations to avoid bias, and always positioned as tools that support a human decision-maker rather than replace one.",
      },
      {
        type: "paragraph",
        text: "The healthcare systems seeing the most benefit are the ones treating AI adoption as a long-term partnership between technology and clinical staff — with ongoing training, feedback loops, and a clear understanding that the goal is better outcomes for patients, not simply faster processes.",
      },
    ],
  },
];

export function getArticleBySlug(slug) {
  return articles.find((article) => article.slug === slug);
}