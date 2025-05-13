import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Background } from '@/components/ui/background';
import { Layout } from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { 
  BarChart2, 
  Database, 
  Brain, 
  Code, 
  ArrowRight,
  LineChart,
  PieChart,
  FileText,
  Users,
  Settings,
  BarChart3,
  Palette,
  Globe,
  ClipboardList,
  GraduationCap,
  FileBarChart,
  Calculator,
  File,
  MessageSquare,
  Wrench,
  CheckCircle2,
  Beaker,
  Calendar,
  Star,
  CheckCircle,
  Briefcase,
  Shield,
  Clock
} from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface WorkflowStep {
  title: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatar: string;
}

const services = [
  {
    id: 1,
    title: 'Data Analysis',
    description: `In today's data-driven world, timely and accurate insights are critical for success. At DataQuest Solutions, we empower researchers, students, businesses, and institutions to make informed decisions through precise and comprehensive data analysis. Our team of seasoned data analysts and statisticians delivers tailored solutions by leveraging a wide array of advanced analytical tools and techniques. Whether you're conducting academic research, business forecasting, or complex data modeling, we bring clarity to your data.`,
    icon: <BarChart3 className="h-6 w-6" />,
    features: [
      'Statistical Analysis – from descriptive to inferential analytics',
      'Time Series Analysis – identifying trends, seasonality, and forecasting',
      'Survival Analysis – ideal for medical, engineering, and reliability studies',
      'Spatial Analysis – analyzing geographic or location-based data',
      'Data Visualization – transforming complex data into clear, actionable visuals',
      'Tools: SPSS, STATA, R, Python, Excel, Power BI, Tableau'
    ],
    image: '/images/image (2).jpg'
  },
  {
    id: 2,
    title: 'Data Collection',
    description: `Effective decision-making starts with accurate, high-quality data. Data collection is not just about gathering information—it's about obtaining reliable, actionable insights that drive success. With a blend of cutting-edge tools and deep domain expertise, we deliver data collection solutions tailored to your needs across diverse industries and sectors.`,
    icon: <Database className="h-6 w-6" />,
    features: [
      'CommCare – For mobile-based, scalable data collection in field research and health programs',
      'ODK (Open Data Kit) – Ideal for complex surveys, offline data entry, and rural deployments',
      'KoBo Toolbox – User-friendly, open-source tool for humanitarian and development settings',
      'Google Forms – Quick, efficient data collection for small to medium-scale surveys',
      'Web and Database Mining – Automated extraction of structured data from the internet and specialized databases'
    ],
    image: '/images/image (1).jpg'
  },
  {
    id: 3,
    title: 'Chemical Analysis',
    description: 'Comprehensive chemical analysis services for research and product development.',
    icon: <Beaker className="h-6 w-6" />,
    features: [
      'Machine Learning – Predictive and analytical models that learn from data',
      'Deep Learning – Neural networks for image recognition, NLP, and more',
      'Recommendation Systems – Intelligent systems to personalize user experiences',
      'Agentic AI Systems – Autonomous agents for complex, context-aware tasks',
      'Data Systems Development & Deployment – Robust data architectures, pipelines, and scalable AI solutions'
    ],
    image: '/images/image (7).jpg'
  },
  {
    id: 4,
    title: 'Science Research Writing',
    description: `High-quality scientific research is the cornerstone of innovation, policy development, and academic excellence. We offer comprehensive Science Research Writing services designed to support researchers, scholars, and institutions in producing well-structured, publication-ready manuscripts and reports.`,
    icon: <FileText className="h-6 w-6" />,
    features: [
      'Scientific Manuscript Writing – Research papers, theses, dissertations, review articles',
      'Research Proposal Development – Compelling, methodologically sound proposals',
      'Data Interpretation & Reporting – Coherent, insightful narratives from complex data',
      'Systematic Reviews & Meta-Analyses – Comprehensive synthesis of literature',
      'Technical & Scientific Editing – Clarity, consistency, and compliance with guidelines',
      'Publication Support – Formatting, submission, and reviewer response assistance'
    ],
    image: '/images/image (3).jpg'
  },
  {
    id: 5,
    title: 'Graphic Design',
    description: `Powerful design is more than aesthetics — it's about communication, identity, and impact. Our Graphic Design services are tailored to help individuals, businesses, and organizations stand out with creativity, consistency, and purpose.`,
    icon: <Palette className="h-6 w-6" />,
    features: [
      'Brand Identity Design – Logos, brand kits, color schemes, typography',
      'Marketing Materials – Posters, flyers, brochures, social media graphics, banners',
      'Presentation Design – Professionally designed slide and pitch decks',
      'Infographics & Visual Data – Clear, digestible, visually appealing graphics',
      'UI/UX Design – User-centered interfaces for websites, dashboards, applications',
      'Print & Digital Designs – Business cards, stationery, digital ads, eBooks'
    ],
    image: '/images/image (4).jpg'
  },
  {
    id: 6,
    title: 'Web Development',
    description: `Your website is more than just a digital presence — it's a vital part of your brand, business strategy, and customer experience. Our Web Development services are tailored to create modern, responsive, and functional websites that deliver real results.`,
    icon: <Globe className="h-6 w-6" />,
    features: [
      'Custom Website Development – Fully tailored, latest technologies',
      'Responsive Design – Beautiful on desktops, tablets, smartphones',
      'E-commerce Solutions – Secure, user-friendly online stores',
      'Content Management Systems (CMS) – WordPress, Joomla, Drupal',
      'Web Applications – Interactive platforms for internal or customer use',
      'SEO & Performance Optimization – Fast, search-engine-friendly',
      'Website Maintenance & Support – Updates, backups, bug fixes, monitoring'
    ],
    image: '/images/image (5).jpg'
  },
  {
    id: 7,
    title: 'Project Development',
    description: `Successful projects result from strategic planning, efficient coordination, and agile execution. We offer end-to-end project management solutions tailored to research, data science, technology, business, and development sectors.`,
    icon: <ClipboardList className="h-6 w-6" />,
    features: [
      'Project Planning & Design – Goals, timelines, deliverables, resource allocation',
      'Team Coordination & Communication – Clear task assignment, collaboration',
      'Risk Assessment & Mitigation – Prevent delays and budget overruns',
      'Monitoring & Evaluation – KPIs, milestones, real-time reporting',
      'Budget Management – Resource allocation, expense tracking, cost control',
      'Documentation & Reporting – Status reports, evaluations, impact summaries',
      'Agile, Scrum, Waterfall, Hybrid project management frameworks'
    ],
    image: '/images/image (6).jpg'
  },
  {
    id: 8,
    title: 'Report Writing',
    description: `A well-written report is a strategic tool for communication, decision-making, and documentation. Our Report Writing services help transform complex data and findings into clear, professional, and actionable documents.`,
    icon: <File className="h-6 w-6" />,
    features: [
      'Research Reports – Academic, scientific, and policy-driven research',
      'Project Reports – Progress, implementation, outcomes, recommendations',
      'Monitoring and Evaluation (M&E) Reports – Performance assessment',
      'Technical Reports – Complex methodologies and systems explained',
      'Business Reports – Feasibility studies, market analysis, proposals, reviews',
      'Progress & Status Reports – Regular project updates',
      'Annual and Institutional Reports – Yearly performance and reviews'
    ],
    image: '/images/image (10).jpg'
  },
  {
    id: 9,
    title: 'Training',
    description: `Knowledge is power — and skills are the engine of progress. Our Training Services are designed for students, professionals, researchers, and institutions looking to build capacity in data science, technology, research, and digital skills.`,
    icon: <GraduationCap className="h-6 w-6" />,
    features: [
      'Data Science & Analytics – R, Python, SPSS, Excel, Power BI, Tableau, SQL, Stata',
      'AI & Machine Learning – Deep learning, recommendation engines, predictive analytics',
      'Web & Software Development – Front-end, back-end, UI/UX, deployment',
      'Research Methods & Scientific Writing – Design, interpretation, proposals, publication',
      'Project Management – Planning, coordination, M&E, budgeting, reporting',
      'Professional & Digital Skills – Graphic design, MS Office, LinkedIn, presentation, computer literacy',
      'Interactive, hands-on, expert-led, real-world, online/onsite/hybrid'
    ],
    image: '/images/image (8).jpg'
  },
  {
    id: 10,
    title: 'Consultation',
    description: `Navigating complex challenges requires more than data or technology — it requires insight, strategy, and expertise. Our Consultation Services support individuals, businesses, researchers, and organizations in making informed, data-driven decisions.`,
    icon: <MessageSquare className="h-6 w-6" />,
    features: [
      'Data Science & Analytics – Modeling, machine learning, big data',
      'Research Design & Methodology – Structuring research, methods, data collection',
      'Health & Epidemiological Research – Public health, modeling, clinical research',
      'System Development & Deployment – Efficient data systems, deployment',
      'Academic & Professional Projects – Thesis, proposals, writing, presentations',
      'Business Intelligence – Dashboards, KPIs, strategic decisions',
      'Digital Transformation – Integrating technology, improving workflows, automation',
      'Expert consultants, personalized, practical, confidential, in-person/remote'
    ],
    image: '/images/image (9).jpg'
  }
];

const workflow: WorkflowStep[] = [
  {
    title: "Discovery",
    description: "We begin by understanding your needs, goals, and challenges through detailed consultation."
  },
  {
    title: "Planning",
    description: "Our team develops a customized solution and project plan tailored to your requirements."
  },
  {
    title: "Implementation",
    description: "We execute the plan with regular updates and feedback loops to ensure alignment."
  },
  {
    title: "Delivery",
    description: "Final deliverables are presented with comprehensive documentation and support."
  }
];

const faqs: FAQ[] = [
  {
    question: "What services do you offer?",
    answer: "We offer a comprehensive range of services including data analysis, data collection, chemical analysis, research writing, graphic design, web development, project development, report writing, training, and consultation."
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary based on scope and complexity. We'll provide a detailed timeline during the planning phase."
  },
  {
    question: "Do you offer custom solutions?",
    answer: "Yes, we specialize in creating tailored solutions that address your specific needs and challenges."
  },
  {
    question: "What industries do you serve?",
    answer: "We serve a wide range of industries including healthcare, education, technology, research, and business sectors."
  }
];

const testimonials: Testimonial[] = [
  {
    name: "Dan Barasa",
    role: "Data Science Consultant",
    company: "Data Analytics Solutions",
    quote: "DataQuest Solutions has been instrumental in transforming our data analytics capabilities. Their expertise and guidance have helped us make data-driven decisions that have significantly improved our business outcomes.",
    rating: 5,
    avatar: "/images/avatars/dan-barasa.jpg"
  },
  {
    name: "Martha Kioko",
    role: "Business Intelligence Manager",
    company: "Strategic Insights Ltd",
    quote: "Working with DataQuest Solutions has been a game-changer for our organization. Their comprehensive approach to data analysis and visualization has enabled us to uncover valuable insights and drive strategic initiatives.",
    rating: 5,
    avatar: "/images/avatars/martha-kioko.jpg"
  },
  {
    name: "Joy Consolate",
    role: "Data Strategy Director",
    company: "Innovation Partners",
    quote: "The team at DataQuest Solutions brings exceptional expertise and professionalism to every project. Their ability to translate complex data into actionable insights has been crucial to our success.",
    rating: 5,
    avatar: "/images/avatars/joy-consolate.jpg"
  }
];

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const navigate = useNavigate();

  const handleRequestService = () => {
    setSelectedService(null); // Close the dialog
    navigate('/register?role=client'); // Navigate to registration with client role
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-blue-900 to-blue-500 min-h-screen text-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Our Services</h1>
                <p className="text-blue-200">Comprehensive data science and analytics solutions for your business</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Request Consultation
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {services.map((service) => (
                <Card key={service.id} className="bg-gradient-to-br from-blue-800 to-blue-700 border-0 shadow-xl text-white">
                  <div className="p-6 flex items-center justify-center bg-blue-900/30">
                    <div className="text-blue-200 p-3 rounded-full bg-blue-900/50 w-16 h-16 flex items-center justify-center">
                      {service.icon}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-white text-center">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-blue-200 text-center line-clamp-2">{service.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-center border-t border-blue-900/40 pt-4">
                    <Button 
                      className="bg-blue-700 hover:bg-blue-600 text-white"
                      onClick={() => setSelectedService(service)}
                    >
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Service Details Dialog */}
            <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
              <DialogContent 
                className="bg-gradient-to-br from-blue-800 to-blue-700 border-0 shadow-xl text-white max-w-3xl"
                aria-describedby="service-description"
              >
                {selectedService && (
                  <>
                    <DialogHeader>
                      <div className="relative h-64 w-full overflow-hidden rounded-t-lg mb-4">
                        <img
                          src={selectedService.image}
                          alt={selectedService.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/image (1).jpg'; // Fallback image
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-70"></div>
                        <DialogTitle className="absolute bottom-4 left-4 text-2xl text-white">
                          {selectedService.title}
                        </DialogTitle>
                      </div>
                    </DialogHeader>
                    <div id="service-description">
                      <DialogDescription className="text-blue-200 mb-6">
                        {selectedService.description}
                      </DialogDescription>
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Service Features</h3>
                        <ul className="space-y-2">
                          {selectedService.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle2 className="h-5 w-5 text-blue-300 mr-2 shrink-0 mt-0.5" />
                              <span className="text-blue-100">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-4">
                      <Button 
                        variant="outline" 
                        className="border-blue-600 text-blue-100 hover:bg-blue-900/50"
                        onClick={() => setSelectedService(null)}
                      >
                        Close
                      </Button>
                      <Button 
                        className="bg-blue-600 hover:bg-blue-500 text-white"
                        onClick={handleRequestService}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Request Service
                      </Button>
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>
            
            <Card className="bg-gradient-to-br from-blue-800 to-blue-700 border-0 shadow-xl text-white mb-8">
              <CardHeader>
                <CardTitle className="text-xl text-white">How We Work</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {workflow.map((step, index) => (
                    <div key={index} className="relative">
                      <div className="bg-blue-900/40 p-6 rounded-lg flex flex-col items-center text-center">
                        <div className="bg-blue-900/60 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mb-4">
                          {index + 1}
                        </div>
                        <h3 className="font-medium text-lg text-blue-100 mb-2">{step.title}</h3>
                        <p className="text-blue-200">{step.description}</p>
                      </div>
                      {index < workflow.length - 1 && (
                        <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                          <ArrowRight className="h-6 w-6 text-blue-300" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 bg-gradient-to-br from-blue-800 to-blue-700 border-0 shadow-xl text-white">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="space-y-4">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`faq-${index}`} className="border-blue-900/40 rounded-lg overflow-hidden">
                        <AccordionTrigger className="bg-blue-900/40 px-4 py-2 text-blue-100 hover:bg-blue-900/50 hover:text-white hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="bg-blue-900/20 px-4 py-3 text-blue-200">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-blue-800 to-blue-700 border-0 shadow-xl text-white">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Client Testimonials</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {testimonials.map((testimonial, index) => (
                      <div key={index} className="bg-blue-900/40 p-4 rounded-lg">
                        <div className="flex items-center mb-3">
                          <Avatar className="h-10 w-10 mr-3 border-2 border-blue-600">
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                            <AvatarFallback className="bg-blue-900 text-blue-100">
                              {testimonial.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium text-blue-100">{testimonial.name}</h4>
                            <p className="text-xs text-blue-300">{testimonial.role}, {testimonial.company}</p>
                          </div>
                        </div>
                        <div className="pl-2 border-l-2 border-blue-600">
                          <p className="text-sm text-blue-200 italic">{testimonial.quote}</p>
                        </div>
                        <div className="mt-2 flex">
                          {Array(5).fill(0).map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-blue-800'}`} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-gradient-to-r from-blue-900 to-blue-700 border-0 shadow-xl text-white mt-8">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-6 md:mb-0 md:mr-8">
                    <h2 className="text-2xl font-bold text-white mb-2">Ready to start your data journey?</h2>
                    <p className="text-blue-200">Our team of experts is ready to help transform your business with data.</p>
                  </div>
                  <div className="flex gap-4">
                    <Button className="bg-white text-blue-900 hover:bg-blue-100">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Demo
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-500 text-white">
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Get Started
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServicesPage;
