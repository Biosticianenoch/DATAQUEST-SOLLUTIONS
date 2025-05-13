import { useState } from "react";
import { useAuth } from '@/lib/auth-context';
import { Navigate } from 'react-router-dom';
import { Layout } from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Filter, 
  Calendar, 
  Users, 
  Clock, 
  ArrowRight,
  FolderGit2,
  CheckCircle2,
  AlertCircle,
  Plus,
  SlidersHorizontal,
  ChevronDown,
  RefreshCw,
  MessageSquare,
  FileText
} from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Background } from '@/components/ui/background';
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Mock data for projects
const projects = [
  {
    id: 1,
    title: "Customer Churn Prediction",
    description: "Build a machine learning model to predict customer churn for a telecom company.",
    status: "In Progress",
    progress: 65,
    dueDate: "2024-05-15",
    team: ["Sarah Johnson", "Michael Chen", "Emily Brown"],
    category: "Machine Learning",
    tags: ["Python", "Scikit-learn", "Pandas"],
    image: "/images/image (15).jpg"
  },
  {
    id: 2,
    title: "Sales Forecasting Dashboard",
    description: "Create an interactive dashboard for sales forecasting using historical data.",
    status: "Completed",
    progress: 100,
    dueDate: "2024-04-01",
    team: ["David Wilson", "Sarah Johnson"],
    category: "Data Visualization",
    tags: ["Tableau", "SQL", "Time Series"],
    image: "/images/image (16).jpg"
  },
  {
    id: 3,
    title: "Sentiment Analysis API",
    description: "Develop a REST API for sentiment analysis of customer reviews.",
    status: "In Progress",
    progress: 40,
    dueDate: "2024-06-01",
    team: ["Michael Chen", "Emily Brown", "David Wilson"],
    category: "NLP",
    tags: ["Python", "FastAPI", "BERT"],
    image: "/images/image (17).jpg"
  },
  {
    id: 4,
    title: "Data Pipeline Optimization",
    description: "Optimize existing data pipelines for better performance and reliability.",
    status: "Planning",
    progress: 20,
    dueDate: "2024-07-01",
    team: ["Sarah Johnson", "David Wilson"],
    category: "Data Engineering",
    tags: ["Airflow", "Python", "AWS"],
    image: "/images/image (1).jpg"
  }
];

// Mock data for activities
const activities = [
  { 
    type: 'update', 
    message: 'Updated the customer churn prediction project', 
    timestamp: '2 hours ago',
    project: 'Customer Churn Prediction'
  },
  { 
    type: 'complete', 
    message: 'Completed the sales forecasting dashboard project', 
    timestamp: '1 day ago',
    project: 'Sales Forecasting Dashboard'
  },
  { 
    type: 'comment', 
    message: 'Added comments to the sentiment analysis API documentation', 
    timestamp: '2 days ago',
    project: 'Sentiment Analysis API'
  },
  { 
    type: 'file', 
    message: 'Uploaded new dataset for the data pipeline optimization', 
    timestamp: '3 days ago',
    project: 'Data Pipeline Optimization'
  }
];

// Categories for filtering
const categories = [
  "All",
  "Data Analysis",
  "Predictive Analytics",
  "Machine Learning",
  "NLP",
  "Operations Research"
];

export const ProjectsPage = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Filter projects based on search query and status
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = selectedStatus === "All" || project.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Get unique statuses for filter
  const statuses = ["All", ...new Set(projects.map(project => project.status))];

  return (
    <Layout>
      <div className="bg-gradient-to-b from-blue-900 to-blue-500 min-h-screen text-white py-8">
        <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">My Projects</h1>
                <p className="text-blue-200">Manage your data science projects</p>
            </div>
              <div className="flex space-x-2 mt-4 md:mt-0">
                <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  New Project
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="bg-blue-800/60 border-blue-700 text-white hover:bg-blue-800 hover:text-white">
                      <SlidersHorizontal className="mr-2 h-4 w-4" />
                      Filter
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-blue-800 border-blue-700 text-white">
                    <DropdownMenuCheckboxItem className="text-white focus:bg-blue-700 focus:text-white">
                      In Progress
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem className="text-white focus:bg-blue-700 focus:text-white">
                      Completed
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator className="bg-blue-700" />
                    <DropdownMenuLabel className="text-blue-300">Sort by</DropdownMenuLabel>
                    <DropdownMenuRadioGroup value="dueDate">
                      <DropdownMenuRadioItem value="dueDate" className="text-white focus:bg-blue-700 focus:text-white">
                        Due Date
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="title" className="text-white focus:bg-blue-700 focus:text-white">
                        Title
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {projects.map(project => (
                <Card key={project.id} className="bg-gradient-to-br from-blue-800 to-blue-700 border-0 shadow-xl text-white overflow-hidden">
                  <div className="relative h-48 w-full overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-80"></div>
                    <div className="absolute bottom-3 left-3">
                      <Badge className={
                        project.status === 'completed' 
                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                          : 'bg-orange-600 hover:bg-orange-700 text-white'
                      }>
                      {project.status}
                    </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-white">{project.title}</CardTitle>
                    <CardDescription className="text-blue-200">
                      {project.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 text-sm text-blue-200">
                      {project.description}
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-blue-300">Progress</span>
                          <span className="text-blue-200">{project.progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-blue-900/50 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              project.status === 'completed' 
                                ? 'bg-green-500' 
                                : 'bg-blue-400'
                            } w-[${project.progress}%]`}
                          ></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-blue-300" />
                          <span className="text-blue-200">Due: <span className="text-white">{project.dueDate}</span></span>
                        </div>
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4 text-blue-300" />
                          <span className="text-blue-200">Team: <span className="text-white">{project.team.length}</span></span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-blue-900/40 pt-4">
                    <Button className="w-full bg-blue-700 hover:bg-blue-600 text-white">
                      View Project
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 bg-gradient-to-br from-blue-800 to-blue-700 border-0 shadow-xl text-white">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-4 p-3 bg-blue-900/30 rounded-lg">
                        <div className="p-2 bg-blue-900/40 rounded-lg text-blue-300">
                          {activity.type === 'update' && <RefreshCw className="h-4 w-4" />}
                          {activity.type === 'complete' && <CheckCircle2 className="h-4 w-4" />}
                          {activity.type === 'comment' && <MessageSquare className="h-4 w-4" />}
                          {activity.type === 'file' && <FileText className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="font-medium text-blue-100">{activity.message}</p>
                          <div className="flex items-center mt-1">
                            <p className="text-xs text-blue-300 mr-2">{activity.timestamp}</p>
                            <p className="text-xs bg-blue-900/40 px-2 py-0.5 rounded text-blue-300">{activity.project}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-blue-800 to-blue-700 border-0 shadow-xl text-white">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Project Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-900/40 p-4 rounded-lg">
                      <div className="text-3xl font-bold text-blue-100 mb-1">
                        {projects.length}
                      </div>
                      <div className="text-blue-300">Total Projects</div>
                    </div>
                    <div className="bg-blue-900/40 p-4 rounded-lg">
                      <div className="text-3xl font-bold text-blue-100 mb-1">
                        {projects.filter(p => p.status === 'completed').length}
                      </div>
                      <div className="text-blue-300">Completed</div>
                    </div>
                    <div className="bg-blue-900/40 p-4 rounded-lg">
                      <div className="text-3xl font-bold text-blue-100 mb-1">
                        {Math.round(
                          projects.reduce((sum, p) => sum + p.progress, 0) / projects.length
                        )}%
                      </div>
                      <div className="text-blue-300">Average Progress</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectsPage; 