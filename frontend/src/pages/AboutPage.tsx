import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Layout } from "@/components/layout/Layout";
import { 
  Users, 
  Target, 
  Lightbulb, 
  Award, 
  ArrowRight,
  BookOpen,
  Globe,
  Heart
} from 'lucide-react';

const values = [
  {
    icon: <Target className="h-6 w-6" />,
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, from education to research.'
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: 'Innovation',
    description: 'We embrace new ideas and technologies to push the boundaries of what\'s possible.'
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Collaboration',
    description: 'We believe in the power of working together to achieve greater results.'
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: 'Integrity',
    description: 'We maintain the highest standards of integrity in our work and relationships.'
  }
];

const AboutPage = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-b from-[#e0f7fa] to-[#b3e5fc] min-h-screen text-[#0f172a] py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-[#0f172a] mb-4">About Us</h1>
              <p className="text-xl text-[#0288d1] max-w-3xl mx-auto">
                Empowering businesses, organizations and individuals with tools and knowledge for the data-driven world
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <Card className="bg-gradient-to-br from-[#e0f7fa] to-[#b3e5fc] border-0 shadow-xl text-[#0f172a]">
                <CardHeader>
                  <CardTitle className="text-white">Our Mission</CardTitle>
                  <CardDescription className="text-[#0288d1]">
                    Empowering through innovation and expertise
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-blue-100">
                    Our mission is to empower businesses, organizations, and individuals by providing innovative tools,
                    expert knowledge, and tailored solutions that foster growth, enhance decision-making, and drive
                    success in a data-driven world. Through high-quality services, cutting-edge AI development, and
                    comprehensive training programs, we enable our clients to optimize performance and stay ahead of
                    industry trends.
                  </p>
                  <div className="flex items-center gap-2 text-[#0288d1]">
                    <BookOpen className="h-5 w-5" />
                    <span className="font-medium text-white">Comprehensive Training</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#0288d1]">
                    <Globe className="h-5 w-5" />
                    <span className="font-medium text-white">Global Expertise</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#0288d1]">
                    <Heart className="h-5 w-5" />
                    <span className="font-medium text-white">Client Success</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#e0f7fa] to-[#b3e5fc] border-0 shadow-xl text-[#0f172a]">
                <CardHeader>
                  <CardTitle className="text-white">Our Vision</CardTitle>
                  <CardDescription className="text-[#0288d1]">
                    Leading the way in data-driven transformation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-blue-100">
                    Our vision is to be a trusted partner in transforming the way businesses and individuals leverage data,
                    technology, and knowledge. We strive to lead the way in innovation, providing strategic insights and
                    expertise that fuel progress, drive operational excellence, and unlock new opportunities for success in
                    an ever-evolving digital landscape.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#b3e5fc] p-4 rounded-lg">
                      <h3 className="font-medium text-white mb-1">Innovation</h3>
                      <p className="text-sm text-[#0288d1]">Leading digital transformation</p>
                    </div>
                    <div className="bg-[#b3e5fc] p-4 rounded-lg">
                      <h3 className="font-medium text-white mb-1">Excellence</h3>
                      <p className="text-sm text-[#0288d1]">Delivering superior results</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white text-center mb-8">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <Card key={index} className="bg-gradient-to-br from-[#e0f7fa] to-[#b3e5fc] border-0 shadow-xl text-[#0f172a]">
                    <CardHeader>
                      <div className="bg-blue-900/40 text-[#0288d1] p-2 rounded-lg w-fit">
                        {value.icon}
                      </div>
                      <CardTitle className="text-xl text-white">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-blue-100">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <Card className="bg-gradient-to-r from-[#e0f7fa] to-[#b3e5fc] border-0 shadow-xl text-[#0f172a] mb-12">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-6 md:mb-0 md:mr-8">
                    <h2 className="text-2xl font-bold text-white mb-2">Ready to work with us?</h2>
                    <p className="text-[#0288d1]">Our team of experts is ready to help transform your business with data science.</p>
                  </div>
                  <Button className="bg-[#4fc3f7] hover:bg-[#b3e5fc] text-[#0f172a]">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Get Started
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
