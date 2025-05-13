/**
 * CoursesPage Component
 * Displays a list of available courses with search, filtering, and pagination functionality.
 */

import { Layout } from "@/components/layout/Layout";
import { Background } from "@/components/layout/Background";
import { CourseList } from "@/components/courses/CourseList";
import { Course } from "@/types/course";
import { CourseCategory, CourseLevel } from "@/types/course";
import { useState, useEffect } from "react";
import { CourseCard } from "@/components/courses/CourseCard";
import { SearchBar } from "@/components/courses/SearchBar";
import { FilterBar } from "@/components/courses/FilterBar";
import { Pagination } from "@/components/ui/Pagination";
import { Alert } from "@/components/ui/Alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Layers, Users, Star } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { 
  Database,
  Code,
  Brain,
  Globe,
  Palette,
  FileText,
  BarChart3,
  LineChart,
  PieChart,
  FileBarChart,
  Calculator,
  File,
  MessageSquare,
  Wrench,
  CheckCircle2,
  Beaker,
  Calendar,
  CheckCircle,
  Briefcase,
  Shield,
  Laptop,
  BookOpen,
  GraduationCap,
  BookMarked,
  BookOpenCheck,
  BookOpenText,
  BookTemplate,
  BookType,
  BookUser,
  BookX,
  Bookmark,
  BookmarkCheck,
  BookmarkMinus,
  BookmarkPlus,
  BookmarkX,
  BookOpenIcon,
  BookOpenCheckIcon,
  BookOpenTextIcon,
  BookTemplateIcon,
  BookTypeIcon,
  BookUserIcon,
  BookXIcon,
  BookmarkIcon,
  BookmarkCheckIcon,
  BookmarkMinusIcon,
  BookmarkPlusIcon,
  BookmarkXIcon,
} from 'lucide-react';

const staticCourses = [
  {
    id: 1,
    title: "Introduction to Data Science",
    description: "Learn the basics of data science and analytics.",
    category: "Data Science",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "Python for Data Analysis",
    description: "Analyze data using Python and its libraries.",
    category: "Programming",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "Machine Learning Essentials",
    description: "Build and evaluate machine learning models.",
    category: "Machine Learning",
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    title: "Statistics for Data Science",
    description: "Master the statistical foundations of data analysis.",
    category: "Statistics",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    title: "Data Visualization Techniques",
    description: "Create impactful data visualizations.",
    category: "Visualization",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80",
  },
];

interface CourseData {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
}

const courses: CourseData[] = [
  {
    id: '1',
    title: 'Data Analysis with SPSS',
    description: 'This course introduces students to the fundamentals of data analysis using SPSS, a widely used software in research and statistical analysis. The course covers key concepts in statistics, data manipulation, and interpretation, providing a hands-on approach to analyzing data and drawing meaningful conclusions.',
    image: '/images/image (1).jpg',
    features: [
      'Statistical Analysis Fundamentals',
      'Data Manipulation Techniques',
      'Interpretation of Results',
      'Hands-on SPSS Practice',
      'Research Applications'
    ]
  },
  {
    id: '2',
    title: 'Data Analysis With R',
    description: 'This course provides an introduction to data analysis using R, a powerful and widely used programming language for statistical computing and graphics. Students will gain hands-on experience in working with R to manipulate, analyze, and visualize data, preparing them to apply these skills to real-world datasets.',
    image: '/images/image (2).jpg',
    features: [
      'R Programming Basics',
      'Data Manipulation',
      'Statistical Analysis',
      'Data Visualization',
      'Real-world Applications'
    ]
  },
  {
    id: '3',
    title: 'Machine Learning With R',
    description: 'This course introduces students to the core concepts and techniques of machine learning using R, a popular programming language for statistical computing and data analysis. The course focuses on building a solid foundation in both supervised and unsupervised learning, enabling students to apply machine learning algorithms to solve real-world problems using R.',
    image: '/images/image (3).jpg',
    features: [
      'Supervised Learning',
      'Unsupervised Learning',
      'Model Evaluation',
      'Feature Engineering',
      'Practical Applications'
    ]
  },
  {
    id: '4',
    title: 'Spatial Analysis With R',
    description: 'This course provides an in-depth introduction to spatial data analysis using R, a powerful language for statistical computing and geographic data analysis. Spatial analysis is a crucial tool in many fields, including geography, environmental science, urban planning, epidemiology, and social sciences, allowing practitioners to analyze and visualize spatial patterns and relationships in data.',
    image: '/images/image (4).jpg',
    features: [
      'Spatial Data Types',
      'Geographic Analysis',
      'Spatial Visualization',
      'GIS Integration',
      'Field Applications'
    ]
  },
  {
    id: '5',
    title: 'Time Series and Forecasting With R',
    description: 'This course provides a comprehensive introduction to time series analysis using R, focusing on methods for analyzing temporal data to uncover underlying patterns and make accurate forecasts. Time series analysis is widely used in fields such as economics, finance, weather forecasting, sales forecasting, and healthcare, where data is collected over time and is inherently sequential.',
    image: '/images/image (5).jpg',
    features: [
      'Time Series Components',
      'Forecasting Methods',
      'Trend Analysis',
      'Seasonal Patterns',
      'Practical Applications'
    ]
  },
  {
    id: '6',
    title: 'Survival Analysis With R',
    description: 'This course provides a comprehensive introduction to survival analysis using R, focusing on methods for analyzing and interpreting time-to-event data. Survival analysis is widely used in fields such as medicine, epidemiology, social sciences, engineering, and economics, where the goal is to understand the time until an event occurs, such as death, failure, relapse, or any other event of interest.',
    image: '/images/image (6).jpg',
    features: [
      'Survival Curves',
      'Hazard Functions',
      'Cox Regression',
      'Time-to-Event Analysis',
      'Medical Applications'
    ]
  },
  {
    id: '7',
    title: 'Data Collection With ODK, Commcare And KOBO',
    description: 'This course provides an in-depth overview of mobile data collection tools, focusing on three widely used platforms: Open Data Kit (ODK), CommCare, and KOBO. These platforms enable users to collect, manage, and analyze data in field settings, particularly in resource-limited environments or in areas where internet access may be intermittent.',
    image: '/images/image (7).jpg',
    features: [
      'ODK Form Design',
      'CommCare Implementation',
      'KOBO Toolbox Usage',
      'Field Data Collection',
      'Data Management'
    ]
  },
  {
    id: '8',
    title: 'Data Analysis with Python',
    description: 'This course provides a comprehensive introduction to data analysis using Python, one of the most popular programming languages for data science, machine learning, and statistical analysis. Python\'s rich ecosystem of libraries such as Pandas, NumPy, Matplotlib, and Seaborn make it an excellent tool for performing data manipulation, statistical analysis, and data visualization.',
    image: '/images/image (8).jpg',
    features: [
      'Python Programming',
      'Pandas for Data Analysis',
      'NumPy for Computing',
      'Data Visualization',
      'Statistical Analysis'
    ]
  },
  {
    id: '9',
    title: 'Machine Learning with Python',
    description: 'This course provides a comprehensive introduction to machine learning using Python, one of the leading programming languages for data science and artificial intelligence. With the help of Python\'s powerful libraries such as Scikit-learn, TensorFlow, Keras, and XGBoost, students will learn to develop machine learning models to solve real-world problems across various domains.',
    image: '/images/image (9).jpg',
    features: [
      'Supervised Learning',
      'Unsupervised Learning',
      'Deep Learning',
      'Model Evaluation',
      'Real-world Projects'
    ]
  },
  {
    id: '10',
    title: 'Deep Learning/AI In Python',
    description: 'This course provides an in-depth introduction to deep learning and artificial intelligence (AI) using Python, one of the most powerful languages for building AI and machine learning models. With a focus on deep neural networks (DNNs), convolutional neural networks (CNNs), recurrent neural networks (RNNs), and generative models, students will explore cutting-edge techniques that power advanced applications.',
    image: '/images/image (10).jpg',
    features: [
      'Neural Networks',
      'CNN & RNN',
      'Deep Learning Frameworks',
      'AI Applications',
      'Advanced Projects'
    ]
  },
  {
    id: '11',
    title: 'Data Analysis with Stata',
    description: 'This course provides an introduction to data analysis using Stata, a powerful statistical software widely used in social sciences, economics, public health, and other fields for managing, analyzing, and visualizing data. Students will learn how to efficiently navigate Stata\'s interface, import and manage data, perform statistical analysis, and generate reproducible reports.',
    image: '/images/image (11).jpg',
    features: [
      'Stata Interface',
      'Data Management',
      'Statistical Analysis',
      'Data Visualization',
      'Report Generation'
    ]
  },
  {
    id: '12',
    title: 'Data Visualization with Power BI and Tableau',
    description: 'This course offers an introduction to data visualization using two of the leading tools in the industry—Power BI and Tableau. Designed for professionals in data analytics, business intelligence, and decision-making, this course will teach students how to create interactive and compelling visualizations that enable data-driven insights.',
    image: '/images/image (12).jpg',
    features: [
      'Power BI Dashboarding',
      'Tableau Visualization',
      'Interactive Reports',
      'Data Storytelling',
      'Business Intelligence'
    ]
  },
  {
    id: '13',
    title: 'Qualitative Analysis with Nvivo',
    description: 'This course provides an introduction to qualitative data analysis using NVivo, a powerful software tool designed to help researchers organize, analyze, and visualize qualitative data such as interviews, focus groups, surveys, and open-ended responses. NVivo is widely used in fields such as social sciences, healthcare, education, and market research.',
    image: '/images/image (13).jpg',
    features: [
      'NVivo Interface',
      'Data Organization',
      'Coding Techniques',
      'Analysis Methods',
      'Research Applications'
    ]
  },
  {
    id: '14',
    title: 'Qualitative Analysis with Dedoose',
    description: 'This course introduces students to qualitative data analysis using Dedoose, a web-based software designed for mixed-methods research. Dedoose is particularly effective for handling qualitative and quantitative data, allowing researchers to analyze, organize, and visualize data in a user-friendly and collaborative environment.',
    image: '/images/image (14).jpg',
    features: [
      'Dedoose Interface',
      'Mixed Methods Research',
      'Data Analysis',
      'Collaboration Tools',
      'Research Applications'
    ]
  },
  {
    id: '15',
    title: 'Graphic Design',
    description: 'This course offers a comprehensive introduction to the principles and practices of graphic design, focusing on the creative and technical aspects of designing visual content for various media. Students will explore the fundamentals of design, including color theory, typography, layout, and composition.',
    image: '/images/image (15).jpg',
    features: [
      'Design Principles',
      'Adobe Creative Suite',
      'Typography',
      'Color Theory',
      'Layout Design'
    ]
  },
  {
    id: '16',
    title: 'Web Development',
    description: 'This course provides a comprehensive introduction to web development, covering both front-end and back-end development techniques. Students will learn the core technologies that power modern websites, including HTML, CSS, JavaScript, and server-side programming languages.',
    image: '/images/image (16).jpg',
    features: [
      'HTML & CSS',
      'JavaScript',
      'Front-end Development',
      'Back-end Development',
      'Full-stack Projects'
    ]
  },
  {
    id: '17',
    title: 'Infectious Disease Modelling',
    description: 'This course provides an in-depth exploration of mathematical and computational models used to understand the dynamics of infectious diseases. The course covers the core concepts and methodologies for modeling the spread of diseases in populations, including the use of compartmental models, stochastic models, and agent-based simulations.',
    image: '/images/image (17).jpg',
    features: [
      'Disease Models',
      'Epidemiology',
      'Mathematical Modeling',
      'Public Health',
      'Policy Analysis'
    ]
  },
  {
    id: '18',
    title: 'Database Management with SQL',
    description: 'This course provides an introduction to the fundamentals of database management using SQL, the standard language for managing and manipulating relational databases. Students will learn how to design, implement, and maintain databases, as well as how to interact with databases using SQL to retrieve, update, and manage data efficiently.',
    image: '/images/image (1).jpg',
    features: [
      'SQL Fundamentals',
      'Database Design',
      'Data Management',
      'Query Optimization',
      'Database Security'
    ]
  }
];

const CoursesPage = () => {
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);
  const navigate = useNavigate();

  const handleEnroll = () => {
    setSelectedCourse(null); // Close the dialog
    navigate('/register'); // Navigate to registration page
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-blue-900 to-blue-500 min-h-screen text-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Our Courses</h1>
                <p className="text-blue-200">Comprehensive data science and analytics training programs</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Request Information
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {courses.map((course) => (
                <Card key={course.id} className="bg-gradient-to-br from-blue-800 to-blue-700 border-0 shadow-xl text-white overflow-hidden">
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/image (1).jpg'; // Fallback image
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#e0f7fa] to-transparent opacity-70"></div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-[#0f172a] text-center">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#0288d1] text-center line-clamp-2">{course.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-center border-t border-[#b3e5fc] pt-4">
                    <Button 
                      className="bg-[#4fc3f7] hover:bg-[#b3e5fc] text-[#0f172a]"
                      onClick={() => setSelectedCourse(course)}
                    >
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Course Details Dialog */}
            <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
              <DialogContent className="bg-gradient-to-br from-[#e0f7fa] to-[#b3e5fc] border-0 shadow-xl text-[#0f172a] max-w-3xl">
                {selectedCourse && (
                  <>
                    <DialogHeader>
                      <div className="relative h-64 w-full overflow-hidden rounded-t-lg mb-4">
                        <img
                          src={selectedCourse.image}
                          alt={selectedCourse.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/image (1).jpg'; // Fallback image
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#e0f7fa] to-transparent opacity-70"></div>
                        <DialogTitle className="absolute bottom-4 left-4 text-2xl text-[#0f172a]">
                          {selectedCourse.title}
                        </DialogTitle>
                      </div>
                    </DialogHeader>
                    <DialogDescription className="text-[#0288d1] mb-6">
                      {selectedCourse.description}
                    </DialogDescription>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-[#0f172a]">Course Features</h3>
                      <ul className="space-y-2">
                        {selectedCourse.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-[#4fc3f7] mr-2 shrink-0 mt-0.5" />
                            <span className="text-[#1976d2]">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6 flex justify-end gap-4">
                      <Button 
                        variant="outline" 
                        className="border-blue-600 text-[#1976d2] hover:bg-blue-900/50"
                        onClick={() => setSelectedCourse(null)}
                      >
                        Close
                      </Button>
                      <Button 
                        className="bg-[#4fc3f7] hover:bg-[#b3e5fc] text-[#0f172a]"
                        onClick={handleEnroll}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Enroll Now
                      </Button>
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CoursesPage;
