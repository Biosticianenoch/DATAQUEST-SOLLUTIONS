import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Background } from '@/components/ui/background';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { PageLayout } from '@/components/layout/PageLayout';
import { 
  ArrowRight, 
  BookOpen, 
  Code, 
  Database, 
  FileText, 
  LineChart, 
  Users, 
  Zap,
  Award,
  Star,
  BarChart2,
  Brain,
  Globe,
  GraduationCap,
  PieChart,
  Settings,
  Target,
  Lightbulb,
  Heart,
  Menu,
  X,
  Home,
  Info,
  Mail,
  Facebook,
  Twitter,
  Linkedin
} from 'lucide-react';

const features = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Comprehensive Courses",
    description: "Access a wide range of data science courses taught by industry experts."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Expert Instructors",
    description: "Learn from experienced professionals in the field of data science."
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Certification",
    description: "Earn recognized certifications to boost your career prospects."
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: "Quality Education",
    description: "Get high-quality education with practical, hands-on experience."
  }
];

const testimonials = [
  {
    name: 'Dan Barasa',
    role: 'Data Science Consultant',
    image: '/pictures/Dan Barasa.jpg',
    quote: 'DataQuest Solutions has been instrumental in transforming our data analytics capabilities. Their expertise and guidance have helped us make data-driven decisions that have significantly improved our business outcomes.'
  },
  {
    name: 'Martha Kioko',
    role: 'Business Intelligence Manager',
    image: '/pictures/Martha Kioko.jpg',
    quote: 'Working with DataQuest Solutions has been a game-changer for our organization. Their comprehensive approach to data analysis and visualization has enabled us to uncover valuable insights and drive strategic initiatives.'
  },
  {
    name: 'Joy Consolate',
    role: 'Data Strategy Director',
    image: '/pictures/Joy Consolate.jpg',
    quote: 'The team at DataQuest Solutions brings exceptional expertise and professionalism to every project. Their ability to translate complex data into actionable insights has been crucial to our success.'
  }
];

const teamMembers = [
  {
    name: 'Ogechi Daniel Koel',
    role: 'Biostatistician',
    image: '/pictures/ogechi koel.jpg',
    expertise: ['Biostatistics', 'Statistical Analysis', 'Public Health'],
    bio: 'I am an apt Biostatistician determined in applying various statistical methods to inform decisions in medicine, public health and science.'
  },
  {
    name: 'Nobert Wafula',
    role: 'Data Analyst',
    image: '/pictures/nobert wafula.jpg',
    expertise: ['Data Analysis', 'Predictive Modeling', 'Business Intelligence'],
    bio: 'I\'m a data analyst passionate about turning data into actionable insights and building predictive models that drive smart, impactful decisions.'
  },
  {
    name: 'Enock Bereka',
    role: 'Data Scientist',
    image: '/pictures/Enock Bereka.jpg',
    expertise: ['Machine Learning', 'Data Analysis', 'Statistical Modeling'],
    bio: 'I\'m a passionate data scientist driven by curiosity and a commitment to lifelong learning. I thrive on exploring new tools and techniques to uncover insights and solve real-world problems. My goal is to turn data into impactful solutions that drive informed decision-making and meaningful change.'
  },
  {
    name: 'Timothy Achala',
    role: 'AI Enthusiast & Computer Scientist',
    image: '/pictures/Timothy Achalla.jpg',
    expertise: ['Artificial Intelligence', 'Machine Learning', 'Computer Science'],
    bio: 'I am an AI Enthusiast and computer scientist with a deep passion for data. My work lies at the intersection of theory and real-world application—leveraging mathematical rigor and computational power to extract meaningful insights from complex datasets. With a strong foundation in algorithms, statistics, and machine learning, I specialize in transforming raw data into actionable intelligence.'
  }
];

const aboutUs = {
  description: `At DataQuest Solutions, we are dedicated to empowering businesses, organizations and individuals with the tools and knowledge needed to thrive in today's fast-paced, data-driven world. Our team of experts provides a diverse range of services designed to drive informed decision-making, foster growth, and accelerate innovation. From data collection and analysis to advanced AI development and professional training, we deliver tailored solutions that meet the unique needs of our clients.

We pride ourselves on offering high-quality, actionable insights and strategic support across various industries. Whether you're looking to optimize operational efficiency, enhance your digital presence, or develop cutting-edge artificial intelligence solutions, we've got you covered.

In addition to our service offerings, we are proud to provide a wide range of industry-leading courses. These courses are designed to equip individuals and teams with in-depth knowledge of data analysis, machine learning, AI, and more. Whether you're looking to master tools like SPSS, R, Python, or Power BI, or expand your expertise in specialized fields like spatial analysis or infectious disease modeling, our training programs offer the skills you need to stay ahead of the curve.

At DataQuest Solutions, we are more than just a service provider—we are your partner in success. Our commitment to excellence, innovation, and customer satisfaction drives everything we do. Let us help you unlock the potential of data, technology, and knowledge to propel your business or career forward.`, 
  mission: 'Our mission is to empower businesses, organizations, and individuals by providing innovative tools, expert knowledge, and tailored solutions that foster growth, enhance decision-making, and drive success in a data-driven world. Through high-quality services, cutting-edge AI development, and comprehensive training programs, we enable our clients to optimize performance and stay ahead of industry trends.',
  vision: 'Our vision is to be a trusted partner in transforming the way businesses and individuals leverage data, technology, and knowledge. We strive to lead the way in innovation, providing strategic insights and expertise that fuel progress, drive operational excellence, and unlock new opportunities for success in an ever-evolving digital landscape.'
};

const Index = () => {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  return (
    <Layout>
      <div className="bg-gradient-to-b from-[#e0f7fa] text-[#4fc3f7] min-h-screen text-[#0f172a] py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Main Title */}
            <div className="text-center mb-8">
              <h1 className="text-6xl font-extrabold text-[#0f172a] mb-2">
                DataQuest Solutions
              </h1>
              <div className="h-1 w-32 bg-blue-300 mx-auto rounded-full"></div>
            </div>
            
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-[#0f172a] mb-6">
                Master Data Science with Expert Guidance
              </h2>
              <p className="text-xl text-[#1976d2] max-w-3xl mx-auto mb-8">
                Join thousands of learners worldwide in mastering data science, machine learning, and AI through our comprehensive courses and hands-on projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#4fc3f7] hover:bg-[#e0f7fa] text-[#0f172a]">
                  <Link to="/courses">Get Started</Link>
                </Button>
                <Button className="bg-[#e0f7fa]/60 border-blue-700 hover:bg-[#e0f7fa] text-[#0f172a]">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>

            {/* Features Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-[#0f172a] text-center mb-8">Why Choose DataQuest Solutions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <Card key={index} className="bg-gradient-to-br from-blue-800 to-[#b3e5fc] border-0 shadow-xl text-[#0f172a]">
                    <CardHeader>
                      <div className="bg-[#b3e5fc]/40 text-[#0288d1] p-2 rounded-lg w-fit">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-[#0f172a]">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[#0288d1]">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Testimonials Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-[#0f172a] text-center mb-8">What Our Clients Say</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="bg-gradient-to-br from-blue-800 to-[#b3e5fc] border-0 shadow-xl text-[#0f172a]">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-[#0f172a]">{testimonial.name}</CardTitle>
                          <CardDescription className="text-[#0288d1]">{testimonial.role}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[#1976d2] italic">"{testimonial.quote}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Team Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-[#0f172a] text-center mb-8">Meet Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member, index) => (
                  <Card key={index} className="bg-gradient-to-br from-blue-800 to-[#b3e5fc] border-0 shadow-xl text-[#0f172a]">
                    <CardHeader>
                      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-center text-[#0f172a]">{member.name}</CardTitle>
                      <CardDescription className="text-center text-[#0288d1]">{member.role}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 justify-center mb-4">
                        {member.expertise.map((skill, skillIndex) => (
                          <span 
                            key={skillIndex}
                            className="px-2 py-1 bg-[#b3e5fc]/40 text-[#1976d2] rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <p className="text-[#0288d1] text-center text-sm">{member.bio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <Card className="bg-gradient-to-br from-blue-800 to-[#b3e5fc] border-0 shadow-xl text-[#0f172a] max-w-3xl mx-auto">
                <CardHeader>
                  <div className="bg-[#b3e5fc]/40 text-[#0288d1] p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-2xl text-[#0f172a]">Ready to Start Your Data Science Journey?</CardTitle>
                  <CardDescription className="text-lg text-[#0288d1]">
                    Join our community of learners and take the first step towards a rewarding career in data science.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="bg-[#4fc3f7] hover:bg-blue-600 text-[#0f172a]">
                    <Link to="/courses">Explore Courses</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};


export default Index;
