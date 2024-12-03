
import { useUser } from "../context/userContext";
import api from "../api/api";
import { useState, useEffect } from "react";
import { Clock, Briefcase, BookOpen, Gift, MessageCircle } from "lucide-react";

const ProjectOverview = () => {
  const { user } = useUser();
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get("/project", {
          params: { departmentName: user.department },
        });
        setProject(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [user.department]);

  const projectData = {
    departmentName: project.departmentName || "Web Development",
    overview: project.projectOverview || "No overview available.",
    internshipType: project.internshipType || "Unpaid",
    duration: project.internshipDuration || 3,
    procedure: project.developmentProcedure || [],
    skillsRequired: project.requiredSkills || [],
    perks: project.internshipPerks || [],
    testimonials: project.internTestimonials || [],
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 space-y-4">
        <div className="h-12 w-3/4 bg-gray-200 animate-pulse rounded-lg" />
        <div className="h-24 w-full bg-gray-200 animate-pulse rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-48 bg-gray-200 animate-pulse rounded-lg" />
          <div className="h-48 bg-gray-200 animate-pulse rounded-lg" />
          <div className="h-48 bg-gray-200 animate-pulse rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-8 max-w-7xl">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full mb-4">
            {projectData.internshipType}
          </span>
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-blue-800">
            {projectData.departmentName}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {projectData.overview}
          </p>
        </div>

        {/* Key Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-blue-600" />
              <h3 className="text-xl font-semibold">Duration</h3>
            </div>
            <p className="text-3xl font-bold text-blue-600">{projectData.duration}</p>
            <p className="text-gray-600">months</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="h-5 w-5 text-blue-600" />
              <h3 className="text-xl font-semibold">Type</h3>
            </div>
            <p className="text-xl font-semibold text-blue-600">{projectData.internshipType}</p>
            <p className="text-gray-600">internship</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <h3 className="text-xl font-semibold">Required Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {projectData.skillsRequired.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-sm bg-blue-50 text-blue-700 rounded-full border border-blue-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Procedure Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <h2 className="text-2xl font-semibold">Development Procedure</h2>
          </div>
          <ol className="space-y-4">
            {projectData.procedure.map((step, index) => (
              <li key={index} className="flex gap-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="text-gray-700 leading-relaxed">{step}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Perks Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Gift className="h-5 w-5 text-blue-600" />
            <h2 className="text-2xl font-semibold">Internship Perks</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projectData.perks.map((perk, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="h-2 w-2 mt-2 rounded-full bg-blue-600" />
                <p className="text-gray-700">{perk}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-6">
            <MessageCircle className="h-5 w-5 text-blue-600" />
            <h2 className="text-2xl font-semibold">Testimonials</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectData.testimonials.map((testimonial, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="relative">
                  <span className="absolute -top-4 left-0 text-6xl text-blue-200">`</span>
                  <blockquote className="relative z-10 text-gray-700 italic">
                    {testimonial.testimonialText}
                  </blockquote>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {testimonial.internName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.internName}</p>
                      <p className="text-sm text-gray-600">{testimonial.internRole}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;