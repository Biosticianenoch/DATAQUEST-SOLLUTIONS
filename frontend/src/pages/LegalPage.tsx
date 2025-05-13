import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Shield, Cookie } from "lucide-react";
import { Link } from "react-router-dom";

const legalDocuments = [
  {
    title: "Privacy Policy",
    description: "Learn how we collect, use, and protect your personal information.",
    icon: <Shield className="h-6 w-6" />,
    link: "/documents/privacy-policy.pdf"
  },
  {
    title: "Terms of Service",
    description: "Read our terms and conditions for using our services.",
    icon: <FileText className="h-6 w-6" />,
    link: "/documents/terms-of-service.pdf"
  },
  {
    title: "Cookie Policy",
    description: "Understand how we use cookies and similar technologies.",
    icon: <Cookie className="h-6 w-6" />,
    link: "/documents/cookie-policy.pdf"
  }
];

const LegalPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 bg-[#e0f7fa]">
        <div className="max-w-7xl mx-auto bg-[#4fc3f7]">
          <h1 className="text-4xl font-bold text-[#0f172a] mb-8">Legal Documents</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {legalDocuments.map((doc) => (
              <Card key={doc.title} className="hover:shadow-lg transition-shadow bg-[#b3e5fc]">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-[#b3e5fc] rounded-lg text-[#0f172a]">
                      {doc.icon}
                    </div>
                    <CardTitle className="text-[#0f172a]">{doc.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-[#0f172a] mb-4">{doc.description}</p>
                  <Link
                    to={doc.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0f172a] hover:text-[#0f172a]/80 font-medium"
                  >
                    Read Document →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LegalPage; 