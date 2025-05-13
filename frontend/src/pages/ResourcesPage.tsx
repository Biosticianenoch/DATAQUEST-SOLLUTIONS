import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileText, Download, Video } from "lucide-react";
import { Link } from "react-router-dom";

const resources = [
  {
    title: "Case Studies",
    description: "Explore our successful projects and client stories.",
    icon: <FileText className="h-6 w-6" />,
    items: [
      {
        title: "Healthcare Analytics Implementation",
        link: "/documents/case-studies/healthcare-analytics.pdf"
      },
      {
        title: "Retail Sales Optimization",
        link: "/documents/case-studies/retail-sales.pdf"
      },
      {
        title: "Financial Risk Assessment",
        link: "/documents/case-studies/financial-risk.pdf"
      }
    ]
  },
  {
    title: "E-books",
    description: "Download our free e-books on data science and analytics.",
    icon: <BookOpen className="h-6 w-6" />,
    items: [
      {
        title: "Introduction to Data Science",
        link: "/documents/ebooks/intro-to-data-science.pdf"
      },
      {
        title: "Machine Learning Fundamentals",
        link: "/documents/ebooks/ml-fundamentals.pdf"
      },
      {
        title: "Data Visualization Best Practices",
        link: "/documents/ebooks/data-visualization.pdf"
      }
    ]
  },
  {
    title: "Webinars",
    description: "Watch our educational webinars on data science topics.",
    icon: <Video className="h-6 w-6" />,
    isLink: true,
    link: "/resources/webinars",
    items: [
      {
        title: "Introduction to Data Science",
        link: "/resources/webinars"
      },
      {
        title: "Machine Learning Best Practices",
        link: "/resources/webinars"
      },
      {
        title: "Data Visualization Techniques",
        link: "/resources/webinars"
      }
    ]
  }
];

const ResourcesPage = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-b from-blue-900 to-blue-500 min-h-screen text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-8">Resources</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resources.map((section) => (
                <Card key={section.title} className="bg-gradient-to-br from-blue-800 to-blue-700 border-0 shadow-xl hover:shadow-2xl transition-shadow text-white">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-900/40 rounded-lg text-blue-300">
                        {section.icon}
                      </div>
                      <CardTitle className="text-white">{section.title}</CardTitle>
                    </div>
                    <p className="text-blue-200 mt-2">{section.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {section.items.map((item) => (
                        <div
                          key={item.title}
                          className="flex items-center justify-between p-4 bg-blue-800/50 rounded-lg"
                        >
                          <span className="font-medium text-blue-100">{item.title}</span>
                          <Link
                            to={item.link}
                            target={section.isLink ? "_self" : "_blank"}
                            rel="noopener noreferrer"
                            className="text-blue-300 hover:text-blue-100"
                          >
                            {section.isLink ? (
                              <span className="text-sm">View</span>
                            ) : (
                              <Download className="h-5 w-5" />
                            )}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResourcesPage; 