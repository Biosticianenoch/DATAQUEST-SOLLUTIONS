import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  MessageSquare, 
  FileCheck, 
  Users, 
  Briefcase,
  Send,
  Building,
  User,
  Youtube,
  Linkedin,
  Facebook,
  MessageCircle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    inquiry: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      setFormData({
        name: "",
        email: "",
        subject: "",
        inquiry: "",
        message: ""
      });
      
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <Layout>
      <div className="bg-gradient-to-b from-[#e0f7fa] to-blue-500 min-h-screen text-[#0f172a] py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-[#0f172a] mb-4">Contact Us</h1>
              <p className="text-xl text-[#1976d2] max-w-2xl mx-auto">
                Get in touch with our team for any inquiries or support
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-8">
                <Card className="bg-gradient-to-br from-blue-800 to-[#b3e5fc] border-0 shadow-xl text-[#0f172a]">
                  <CardHeader>
                    <CardTitle className="text-[#0f172a]">Send us a Message</CardTitle>
                    <CardDescription className="text-[#0288d1]">
                      Fill out the form below and we'll get back to you as soon as possible
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#4fc3f7]" />
                          <Input
                            placeholder="Your Name"
                            className="pl-10 bg-[#b3e5fc]/40 border-blue-700 text-[#0f172a] placeholder:text-[#4fc3f7]"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#4fc3f7]" />
                          <Input
                            type="email"
                            placeholder="Email Address"
                            className="pl-10 bg-[#b3e5fc]/40 border-blue-700 text-[#0f172a] placeholder:text-[#4fc3f7]"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#4fc3f7]" />
                          <Input
                            placeholder="Company/Organization"
                            className="pl-10 bg-[#b3e5fc]/40 border-blue-700 text-[#0f172a] placeholder:text-[#4fc3f7]"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-[#4fc3f7]" />
                          <Textarea
                            placeholder="Your Message"
                            className="pl-10 bg-[#e0f7fa] border-[#4fc3f7] text-[#0f172a] placeholder:text-[#4fc3f7] min-h-[150px]"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-full bg-[#4fc3f7] hover:bg-[#e0f7fa] text-[#0f172a]">
                        Send Message <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-8">
                <Card className="bg-gradient-to-br from-blue-800 to-[#b3e5fc] border-0 shadow-xl text-[#0f172a]">
                  <CardHeader>
                    <CardTitle className="text-[#0f172a]">Contact Information</CardTitle>
                    <CardDescription className="text-[#0288d1]">
                      Reach out to us through any of these channels
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-[#b3e5fc]/40 text-[#4fc3f7] p-2 rounded-lg">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#0f172a]">Email</h3>
                        <a href="mailto:datasciencehub254@gmail.com" className="text-[#0288d1] hover:text-[#0f172a]">
                          datasciencehub254@gmail.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-[#b3e5fc]/40 text-[#4fc3f7] p-2 rounded-lg">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#0f172a]">Phone</h3>
                        <a href="tel:+254707612395" className="text-[#0288d1] hover:text-[#0f172a]">
                          +254 707 612 395
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-[#b3e5fc]/40 text-[#4fc3f7] p-2 rounded-lg">
                        <MessageCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#0f172a]">WhatsApp</h3>
                        <a href="https://wa.me/254707612395" target="_blank" rel="noopener noreferrer" className="text-[#0288d1] hover:text-[#0f172a]">
                          +254 707 612 395
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-800 to-[#b3e5fc] border-0 shadow-xl text-[#0f172a]">
                  <CardHeader>
                    <CardTitle className="text-[#0f172a]">Follow Us</CardTitle>
                    <CardDescription className="text-[#0288d1]">
                      Connect with us on social media
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4">
                      <a 
                        href="https://www.youtube.com/@DataScienceHubDataAspire" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[#0288d1] hover:text-[#0f172a]"
                      >
                        <Youtube className="h-5 w-5" />
                        <span>YouTube</span>
                      </a>
                      <a 
                        href="https://www.linkedin.com/groups/10084405/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[#0288d1] hover:text-[#0f172a]"
                      >
                        <Linkedin className="h-5 w-5" />
                        <span>LinkedIn</span>
                      </a>
                      <a 
                        href="https://web.facebook.com/profile.php?id=61575132957776" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[#0288d1] hover:text-[#0f172a]"
                      >
                        <Facebook className="h-5 w-5" />
                        <span>Facebook</span>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;

import { ChevronRight } from "lucide-react";
