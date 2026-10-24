import Navbar from "@/components/Navbar";
import EnquirySectionV5 from "@/components/EnquirySectionV5";
import FooterSection from "@/components/FooterSection";

const EnquiryV5 = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 md:pt-28">
        <EnquirySectionV5 />
      </div>
      <FooterSection />
    </div>
  );
};

export default EnquiryV5;
