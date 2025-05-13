import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Database,
  FileSpreadsheet,
  ScrollText,
  Stethoscope,
  Brain,
  MapPin,
  BarChart3,
  FileCheck,
  LineChart,
  PenTool,
  Microscope,
  Bug,
  FlaskConical,
  FileText,
  BookOpen,
  ChevronRight,
  LayoutGrid,
  Calculator,
  GanttChart,
  Globe,
  Activity,
  Users,
} from "lucide-react";

const ConsultingPage = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-b from-[#e0f7fa] to-[#b3e5fc] min-h-screen text-[#0f172a] py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-[#0f172a] mb-4">Consulting Services</h1>
              <p className="text-xl text-[#0288d1] max-w-3xl mx-auto">
                Expert guidance and solutions for data science, health research, and analytics
              </p>
            </div>

            <Tabs defaultValue="data-management" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8 bg-[#b3e5fc] p-1 rounded-lg w-full overflow-x-auto">
                <TabsTrigger value="data-management" className="data-[state=active]:bg-[#4fc3f7] data-[state=active]:text-[#0f172a]">
                  <Database className="h-4 w-4 mr-2" />
                  <span className="hidden md:inline">Data Management</span>
                  <span className="md:hidden">Data</span>
                </TabsTrigger>
                <TabsTrigger value="medical-analytics" className="data-[state=active]:bg-[#4fc3f7] data-[state=active]:text-[#0f172a]">
                  <Stethoscope className="h-4 w-4 mr-2" />
                  <span className="hidden md:inline">Medical Analytics</span>
                  <span className="md:hidden">Medical</span>
                </TabsTrigger>
                <TabsTrigger value="disease-modelling" className="data-[state=active]:bg-[#4fc3f7] data-[state=active]:text-[#0f172a]">
                  <Bug className="h-4 w-4 mr-2" />
                  <span className="hidden md:inline">Disease Modelling</span>
                  <span className="md:hidden">Disease</span>
                </TabsTrigger>
                <TabsTrigger value="scientific-writing" className="data-[state=active]:bg-[#4fc3f7] data-[state=active]:text-[#0f172a]">
                  <FileText className="h-4 w-4 mr-2" />
                  <span className="hidden md:inline">Scientific Writing</span>
                  <span className="md:hidden">Writing</span>
                </TabsTrigger>
                <TabsTrigger value="ml-ai-health" className="data-[state=active]:bg-[#4fc3f7] data-[state=active]:text-[#0f172a]">
                  <Brain className="h-4 w-4 mr-2" />
                  <span className="hidden md:inline">ML & AI for Health</span>
                  <span className="md:hidden">AI/ML</span>
                </TabsTrigger>
                <TabsTrigger value="spatial-epi" className="data-[state=active]:bg-[#4fc3f7] data-[state=active]:text-[#0f172a]">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="hidden md:inline">Spatial Epidemiology</span>
                  <span className="md:hidden">Spatial</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="data-management" className="mt-4">
                <Card className="bg-gradient-to-br from-[#e0f7fa] to-[#b3e5fc] border-0 shadow-xl text-[#0f172a]">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#b3e5fc] rounded-full">
                        <Database className="h-8 w-8 text-[#0288d1]" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-white">Data Management Systems</CardTitle>
                        <CardDescription className="text-[#0288d1]">
                          Expert consultation on designing and implementing effective data management systems for health and research
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-[#e0f7fa] p-6 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <FileSpreadsheet className="h-5 w-5 text-[#4fc3f7]" />
                          <h3 className="text-lg font-medium text-[#0f172a]">Survey & Questionnaire Design</h3>
                        </div>
                        <p className="text-blue-100">
                          Creating user-friendly and effective survey forms and questionnaires tailored to your data collection needs.
                        </p>
                      </div>
                      
                      <div className="bg-[#e0f7fa] p-6 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <ScrollText className="h-5 w-5 text-[#4fc3f7]" />
                          <h3 className="text-lg font-medium text-[#0f172a]">Electronic Health Forms</h3>
                        </div>
                        <p className="text-blue-100">
                          Designing electronic health record (EHR) forms for streamlined data collection and management.
                        </p>
                      </div>
                      
                      <div className="bg-[#e0f7fa] p-6 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <LayoutGrid className="h-5 w-5 text-[#4fc3f7]" />
                          <h3 className="text-lg font-medium text-[#0f172a]">Kobo Toolbox</h3>
                        </div>
                        <p className="text-blue-100">
                          Setup and customization of Kobo Toolbox for mobile data collection in field settings.
                        </p>
                      </div>
                      
                      <div className="bg-[#e0f7fa] p-6 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <GanttChart className="h-5 w-5 text-[#4fc3f7]" />
                          <h3 className="text-lg font-medium text-[#0f172a]">CommCare & REDCap Setup</h3>
                        </div>
                        <p className="text-blue-100">
                          Assistance with setting up CommCare and REDCap platforms for data collection, management, and analysis, along with training for teams.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <Button className="bg-[#4fc3f7] hover:bg-[#b3e5fc] text-[#0f172a]">
                        Get a Consultation <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="medical-analytics" className="mt-4">
                <Card className="bg-gradient-to-br from-[#e0f7fa] to-[#b3e5fc] border-0 shadow-xl text-[#0f172a]">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#b3e5fc] rounded-full">
                        <Stethoscope className="h-8 w-8 text-[#0288d1]" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-white">Medical Data Analytics</CardTitle>
                        <CardDescription className="text-[#0288d1]">
                          Expert consultation in analyzing medical and epidemiological data to inform health decisions
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-[#e0f7fa] p-6 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <BarChart3 className="h-5 w-5 text-[#4fc3f7]" />
                          <h3 className="text-lg font-medium text-[#0f172a]">Statistical Analysis</h3>
                        </div>
                        <p className="text-blue-100">
                          Performing advanced statistical analyses on epidemiological datasets to uncover key insights.
                        </p>
                      </div>
                      
                      <div className="bg-[#e0f7fa] p-6 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <LineChart className="h-5 w-5 text-[#4fc3f7]" />
                          <h3 className="text-lg font-medium text-[#0f172a]">Software Expertise</h3>
                        </div>
                        <p className="text-blue-100">
                          Providing support in using R, Stata, SPSS, and SAS for data analysis and modeling.
                        </p>
                      </div>
                      
                      <div className="bg-[#e0f7fa] p-6 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <Calculator className="h-5 w-5 text-[#4fc3f7]" />
                          <h3 className="text-lg font-medium text-[#0f172a]">Data Interpretation</h3>
                        </div>
                        <p className="text-blue-100">
                          Assisting with the interpretation of rates, risks, ratios, and trends to guide health policy and interventions.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <Button className="bg-[#4fc3f7] hover:bg-[#b3e5fc] text-[#0f172a]">
                        Get a Consultation <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="disease-modelling" className="mt-4">
                <Card className="bg-gradient-to-br from-[#e0f7fa] to-[#b3e5fc] border-0 shadow-xl text-[#0f172a]">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#b3e5fc] rounded-full">
                        <Bug className="h-8 w-8 text-[#0288d1]" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-white">Infectious Disease Modelling</CardTitle>
                        <CardDescription className="text-[#0288d1]">
                          Expert consultation on applying infectious disease modelling to understand and control outbreaks
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-[#e0f7fa] p-6 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <FlaskConical className="h-5 w-5 text-[#4fc3f7]" />
                          <h3 className="text-lg font-medium text-[#0f172a]">Compartmental Models (SIR, SEIR)</h3>
                        </div>
                        <p className="text-blue-100">
                          Guidance on using basic and advanced models to simulate disease transmission dynamics.
                        </p>
                      </div>
                      
                      <div className="bg-[#e0f7fa] p-6 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <Microscope className="h-5 w-5 text-[#4fc3f7]" />
                          <h3 className="text-lg font-medium text-[#0f172a]">R₀ Estimation</h3>
                        </div>
                        <p className="text-blue-100">
                          Estimation of the basic reproduction number (R₀) to understand how infectious a disease is and its potential to spread.
                        </p>
                      </div>
                      
                      <div className="bg-[#e0f7fa] p-6 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <LineChart className="h-5 w-5 text-[#4fc3f7]" />
                          <h3 className="text-lg font-medium text-[#0f172a]">Disease Spread Projections</h3>
                        </div>
                        <p className="text-blue-100">
                          Forecasting future disease trends under different scenarios to support public health planning and response.
                        </p>
                      </div>
                      
                      <div className="bg-[#e0f7fa] p-6 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <Activity className="h-5 w-5 text-[#4fc3f7]" />
                          <h3 className="text-lg font-medium text-[#0f172a]">Intervention Impact</h3>
                        </div>
                        <p className="text-blue-100">
                          Evaluating the effectiveness of interventions (e.g., vaccination, social distancing) on controlling disease spread.
                        </p>
                      </div>
                      
                      <div className="bg-[#e0f7fa] p-6 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <BarChart3 className="h-5 w-5 text-[#4fc3f7]" />
                          <h3 className="text-lg font-medium text-[#0f172a]">Model Calibration & Sensitivity Analysis</h3>
                        </div>
                        <p className="text-blue-100">
                          Fine-tuning models using real-world data and assessing model sensitivity to different parameters.
                        </p>
                      </div>
                      
                      <div className="bg-[#e0f7fa] p-6 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <GanttChart className="h-5 w-5 text-[#4fc3f7]" />
                          <h3 className="text-lg font-medium text-[#0f172a]">Scenario Planning & Forecasting</h3>
                        </div>
                        <p className="text-blue-100">
                          Simulating various intervention strategies and public health policies to inform decision-making.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <Button className="bg-[#4fc3f7] hover:bg-[#b3e5fc] text-[#0f172a]">
                        Get a Consultation <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="scientific-writing" className="mt-4">
                <Card className="bg-gradient-to-br from-[#e0f7fa] to-[#b3e5fc] border-0 shadow-xl text-[#0f172a]">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#b3e5fc] rounded-full">
                        <FileText className="h-8 w-8 text-[#0288d1]" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-white">Scientific Writing & Reporting</CardTitle>
                        <CardDescription className="text-[#0288d1]">
                          Expert consultation in scientific writing and reporting for health research
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-[#e0f7fa] p-6 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <BookOpen className="h-5 w-5 text-[#4fc3f7]" />
                          <h3 className="text-lg font-medium text-[#0f172a]">Academic Papers & Grant Proposals</h3>
                        </div>
                        <p className="text-blue-100">
                          Assistance with writing, structuring, and editing academic papers, policy briefs, and grant proposals.
                        </p>
                      </div>
                      
                      <div className="bg-[#e0f7fa] p-6 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <BarChart3 className="h-5 w-5 text-[#4fc3f7]" />
                          <h3 className="text-lg font-medium text-[#0f172a]">Data Visualization</h3>
                        </div>
                        <p className="text-blue-100">
                          Creating clear, impactful visualizations (e.g., graphs, charts, tables) to effectively communicate epidemiological findings.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <Button className="bg-[#4fc3f7] hover:bg-[#b3e5fc] text-[#0f172a]">
                        Get a Consultation <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ml-ai-health" className="mt-4">
                <Card className="bg-gradient-to-br from-[#e0f7fa] to-[#b3e5fc] border-0 shadow-xl text-[#0f172a]">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#b3e5fc] rounded-full">
                        <Brain className="h-8 w-8 text-[#0288d1]" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-white">Machine Learning & AI for Health</CardTitle>
                        <CardDescription className="text-[#0288d1]">
                          Expert consultation on leveraging machine learning (ML) and artificial intelligence (AI) to enhance healthcare delivery, research, and decision-making
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-[#e0f7fa] p-6 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <Stethoscope className="h-5 w-5 text-[#4fc3f7]" />
                          <h3 className="text-lg font-medium text-[#0f172a]">AI in Diagnosis & Prognosis</h3>
                        </div>
                        <p className="text-blue-100">
                          Guidance on using AI models for disease detection, risk prediction, and outcome forecasting in clinical settings.
                        </p>
                      </div>
                      
                      <div className="bg-[#e0f7fa] p-6 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <BarChart3 className="h-5 w-5 text-[#4fc3f7]" />
                          <h3 className="text-lg font-medium text-[#0f172a]">Model Selection & Development</h3>
                        </div>
                        <p className="text-blue-100">
                          Support in choosing the right ML techniques (e.g., classification, regression, deep learning) and building custom models for healthcare data.
                        </p>
                      </div>
                      
                      <div className="bg-[#e0f7fa] p-6 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <FileCheck className="h-5 w-5 text-[#4fc3f7]" />
                          <h3 className="text-lg font-medium text-[#0f172a]">Data Preparation & Feature Engineering</h3>
                        </div>
                        <p className="text-blue-100">
                          Assistance with cleaning, transforming, and structuring health datasets to maximize model performance.
                        </p>
                      </div>
                      
                      <div className="bg-[#e0f7fa] p-6 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <FlaskConical className="h-5 w-5 text-[#4fc3f7]" />
                          <h3 className="text-lg font-medium text-[#0f172a]">Clinical Decision Support Systems (CDSS)</h3>
                        </div>
                        <p className="text-blue-100">
                          Design and development of AI tools to support clinicians with evidence-based recommendations.
                        </p>
                      </div>
                      
                      <div className="bg-[#e0f7fa] p-6 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <ScrollText className="h-5 w-5 text-[#4fc3f7]" />
                          <h3 className="text-lg font-medium text-[#0f172a]">Integration into Health Systems</h3>
                        </div>
                        <p className="text-blue-100">
                          Strategies for implementing AI tools into electronic health records (EHRs) and clinical workflows.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <Button className="bg-[#4fc3f7] hover:bg-[#b3e5fc] text-[#0f172a]">
                        Get a Consultation <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="spatial-epi" className="mt-4">
                <Card className="bg-gradient-to-br from-[#e0f7fa] to-[#b3e5fc] border-0 shadow-xl text-[#0f172a]">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#b3e5fc] rounded-full">
                        <MapPin className="h-8 w-8 text-[#0288d1]" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-white">Spatial Epidemiology and GIS Mapping</CardTitle>
                        <CardDescription className="text-[#0288d1]">
                          Expert consultation in spatial epidemiology, utilizing GIS mapping to analyze disease patterns and their geographical distribution
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-[#e0f7fa] p-6 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <Globe className="h-5 w-5 text-[#4fc3f7]" />
                          <h3 className="text-lg font-medium text-[#0f172a]">Geospatial Data Analysis</h3>
                        </div>
                        <p className="text-blue-100">
                          Analyzing spatial patterns of disease using GIS tools to identify hotspots and trends.
                        </p>
                      </div>
                      
                      <div className="bg-[#e0f7fa] p-6 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <MapPin className="h-5 w-5 text-[#4fc3f7]" />
                          <h3 className="text-lg font-medium text-[#0f172a]">Mapping Disease Distribution</h3>
                        </div>
                        <p className="text-blue-100">
                          Creating interactive maps to visualize the spread of infectious diseases, risk factors, and health outcomes.
                        </p>
                      </div>
                      
                      <div className="bg-[#e0f7fa] p-6 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <FileCheck className="h-5 w-5 text-[#4fc3f7]" />
                          <h3 className="text-lg font-medium text-[#0f172a]">Environmental & Social Determinants</h3>
                        </div>
                        <p className="text-blue-100">
                          Assessing the impact of environmental and social factors on disease distribution through spatial data integration.
                        </p>
                      </div>
                      
                      <div className="bg-[#e0f7fa] p-6 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <Activity className="h-5 w-5 text-[#4fc3f7]" />
                          <h3 className="text-lg font-medium text-[#0f172a]">Risk Assessment</h3>
                        </div>
                        <p className="text-blue-100">
                          Using spatial models to identify areas at high risk for disease outbreaks or spread.
                        </p>
                      </div>
                      
                      <div className="bg-[#e0f7fa] p-6 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <Users className="h-5 w-5 text-[#4fc3f7]" />
                          <h3 className="text-lg font-medium text-[#0f172a]">Health Surveillance</h3>
                        </div>
                        <p className="text-blue-100">
                          Developing and implementing geospatial surveillance systems for ongoing monitoring of health conditions.
                        </p>
                      </div>
                      
                      <div className="bg-[#e0f7fa] p-6 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <LineChart className="h-5 w-5 text-[#4fc3f7]" />
                          <h3 className="text-lg font-medium text-[#0f172a]">Modeling & Prediction</h3>
                        </div>
                        <p className="text-blue-100">
                          Applying spatial epidemiological models to predict future disease spread based on geographic and environmental factors.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <Button className="bg-[#4fc3f7] hover:bg-[#b3e5fc] text-[#0f172a]">
                        Get a Consultation <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ConsultingPage; 