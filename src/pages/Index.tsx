import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BusinessSolutionsSection from "@/components/BusinessSolutionsSection";
import AIDigitalSolutions from "@/components/AIDigitalSolutions";
import Testimonials from "@/components/Testimonials";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsCarousel from "@/components/Testimonial Carousel";
//import ProductsSection from "@/components/ProductsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import BlogSection1 from "@/components/BlogSection1";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AIDigitalSolutions />
<BusinessSolutionsSection />

      <Testimonials />
      <ServicesSection />
      <TestimonialsCarousel />
      {/* <ProductsSection /> */}
      <WhyChooseUs />
      <BlogSection1 />
      <FooterSection />
    </div>
  );
};

export default Index;
