import { useEffect, useState } from "react";
import FooterSection from "@/components/FooterSection";
import Navbar from "@/components/Navbar";
import { useLocation } from "react-router-dom";
import ProductDetailPage from "./ProductDetailPage";

const projects = [
  { id: "trading-management", name: "Trading Management" },
  { id: "payroll-management", name: "Payroll Management" },
  { id: "project-management", name: "Project Management" },
  { id: "school-management", name: "School Management" },
  { id: "smart-construction-crm-software", name: "Smart Construction" },
  {
    id: "customer-relationship-management",
    name: "Customer Relationship Management",
  },
  { id: "enterprise-resource-planning", name: "Enterprise Resource Planning" },
] as const;

type ProjectId = (typeof projects)[number]["id"];

type ProjectSelectorProps = {
  initialProjectId?: ProjectId;
};

const ProjectSelector = ({
  initialProjectId = "project-management",
}: ProjectSelectorProps) => {
  const location = useLocation();
  const [selectedProject, setSelectedProject] =
    useState<ProjectId>(initialProjectId);

  useEffect(() => {
    const routeProjectId = location.pathname.replace(/^\//, "") as ProjectId;
    const isKnownRoute = projects.some((project) => project.id === routeProjectId);

    if (isKnownRoute) {
      setSelectedProject(routeProjectId);
    } else if (initialProjectId) {
      setSelectedProject(initialProjectId);
    }
  }, [location.pathname, initialProjectId]);

  return (
    <div className="min-h-screen bg-[#00121a]">
      <Navbar />

      

      <ProductDetailPage slug={selectedProject} />

      <FooterSection />
    </div>
  );
};

export default ProjectSelector;
