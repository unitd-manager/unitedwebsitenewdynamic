import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import ScrollToTop from "./components/Scrolltotop.tsx";
import TermsOfService from "./pages/TermsOfService.tsx";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact.tsx";
import Enquiry from "./pages/Enquiry.tsx";
import EnquiryNow from "./pages/enquiryNow.tsx";
import ProjectSelector from "./pages/ProjectSelector";
import BlogPage from "./components/BlogsSection.tsx";
import AboutPage from "./components/AboutPage";

import SEOPage from "./pages/Seo_Optimization";
import SearchEngineMarketing from "./pages/SearchEngineMarketing.tsx";
import SocialMediaMarketing from "./pages/SeoSocialMediaMarketing.tsx";
import CloudHosting from "./pages/cloudHosting.tsx";
import WebsiteDevelopment from "./pages/wesiteDevelopment.tsx";
import MobileAppDevelopment from "./pages/mobileappDevelopment.tsx";

import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import Admin from "./pages/Admin.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>

      <Toaster />
      <Sonner />

      <BrowserRouter>

        {/* Automatically moves to top when route changes */}
        <ScrollToTop />

        <Routes>

          {/* =====================================================
              HOME
          ===================================================== */}
          <Route
            path="/"
            element={<Index />}
          />
          <Route
            path="/admin"
            element={<Admin />}
          />
          <Route
            path="/admin/edit/:id"
            element={<Admin />}
          />

          {/* =====================================================
              GENERAL PAGES
          ===================================================== */}
          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/enquiry"
            element={<Enquiry />}
          />

          <Route
            path="/enquiryNow"
            element={<EnquiryNow />}
          />

          <Route
            path="/about"
            element={<AboutPage />}
          />

          {/* =====================================================
              PRODUCTS
          ===================================================== */}
          <Route
            path="/products"
            element={<ProjectSelector />}
          />

          <Route
            path="/project-management"
            element={
              <ProjectSelector
                initialProjectId="project-management"
              />
            }
          />

          <Route
            path="/school-management"
            element={
              <ProjectSelector
                initialProjectId="school-management"
              />
            }
          />

          <Route
            path="/smart-construction-crm-software"
            element={
              <ProjectSelector
                initialProjectId="smart-construction-crm-software"
              />
            }
          />

          <Route
            path="/enterprise-resource-planning"
            element={
              <ProjectSelector
                initialProjectId="enterprise-resource-planning"
              />
            }
          />

          <Route
            path="/payroll-management"
            element={
              <ProjectSelector
                initialProjectId="payroll-management"
              />
            }
          />

          <Route
            path="/customer-relationship-management"
            element={
              <ProjectSelector
                initialProjectId="customer-relationship-management"
              />
            }
          />

          <Route
            path="/trading-management"
            element={
              <ProjectSelector
                initialProjectId="trading-management"
              />
            }
          />

          {/* =====================================================
              BLOG
          ===================================================== */}
          <Route
            path="/blog"
            element={<BlogPage />}
          />

          <Route
            path="/blog/:slug"
            element={<BlogDetail />}
          />

          {/* =====================================================
              DIGITAL MARKETING
          ===================================================== */}
          <Route
            path="/seo-optimization"
            element={<SEOPage />}
          />

          <Route
            path="/social-media-marketing"
            element={<SocialMediaMarketing />}
          />

          <Route
            path="/search-engine-marketing"
            element={<SearchEngineMarketing />}
          />

          {/* =====================================================
              OTHER SERVICES
          ===================================================== */}
          <Route
            path="/cloud-hosting"
            element={<CloudHosting />}
          />

          <Route
            path="/website-development"
            element={<WebsiteDevelopment />}
          />

          <Route
            path="/mobileapp-development"
            element={<MobileAppDevelopment />}
          />

          {/* =====================================================
              PRIVACY POLICY
              
              IMPORTANT:
              This route must be BEFORE "*".
          ===================================================== */}
          <Route
            path="/privacy-policy"
            element={<PrivacyPolicy />}
          />

          {/* =====================================================
              404
              
              Keep this LAST.
          ===================================================== */}
<Route
  path="/terms-of-service"
  element={<TermsOfService />}
/>


          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;