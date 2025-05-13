import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PieChart, LineChart, BarChart4, ArrowUpRight, Download, Calendar, Filter } from 'lucide-react';

// Mock data for the analytics page
const mockData = {
  usersOverTime: [
    { month: 'Jan', users: 400 },
    { month: 'Feb', users: 600 },
    { month: 'Mar', users: 550 },
    { month: 'Apr', users: 700 },
    { month: 'May', users: 900 },
    { month: 'Jun', users: 1100 },
  ],
  usersByRole: [
    { role: 'Students', count: 1200 },
    { role: 'Instructors', count: 80 },
    { role: 'Admins', count: 15 },
  ],
  topCourses: [
    { name: 'Machine Learning Fundamentals', students: 450 },
    { name: 'Data Visualization with Python', students: 380 },
    { name: 'SQL for Data Analysis', students: 320 },
    { name: 'Deep Learning Specialization', students: 290 },
    { name: 'Python Programming', students: 260 },
  ],
  engagementMetrics: {
    avgSessionTime: '32 min',
    avgCoursesCompleted: 2.7,
    avgAssignmentsSubmitted: 8.5,
    avgForumPosts: 3.2,
  }
};

export const AnalyticsPage: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState('month');

  return (
      <Layout>
      <div className="bg-gradient-to-b from-[#e0f7fa] to-[#b3e5fc] min-h-screen text-[#0f172a] py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
              <div className="flex gap-2">
                <Select
                  value={timePeriod}
                  onValueChange={setTimePeriod}
                >
                  <SelectTrigger className="w-[180px] bg-[#b3e5fc] border-[#4fc3f7] text-[#0f172a]">
                    <SelectValue placeholder="Select Period" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#b3e5fc] border-[#4fc3f7] text-[#0f172a]">
                    <SelectItem value="day" className="focus:bg-blue-700 focus:text-white">Last 24 Hours</SelectItem>
                    <SelectItem value="week" className="focus:bg-blue-700 focus:text-white">Last 7 Days</SelectItem>
                    <SelectItem value="month" className="focus:bg-blue-700 focus:text-white">Last 30 Days</SelectItem>
                    <SelectItem value="quarter" className="focus:bg-blue-700 focus:text-white">Last Quarter</SelectItem>
                    <SelectItem value="year" className="focus:bg-blue-700 focus:text-white">Last Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="bg-blue-900/30 border-blue-700 text-[#1976d2] hover:bg-blue-800">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-[#e0f7fa] to-[#b3e5fc] border-0 shadow-xl text-[#0f172a]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-3xl font-bold">2,543</div>
                      <div className="text-[#0288d1] text-sm flex items-center gap-1 mt-1">
                        <ArrowUpRight className="h-3 w-3" />
                        <span>12% from last period</span>
                      </div>
                    </div>
                    <div className="p-2 bg-blue-900/40 rounded-lg">
                      <LineChart className="h-8 w-8 text-[#4fc3f7]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#e0f7fa] to-[#b3e5fc] border-0 shadow-xl text-[#0f172a]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white">Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-3xl font-bold">5.2%</div>
                      <div className="text-[#0288d1] text-sm flex items-center gap-1 mt-1">
                        <ArrowUpRight className="h-3 w-3" />
                        <span>0.8% from last period</span>
                      </div>
                    </div>
                    <div className="p-2 bg-blue-900/40 rounded-lg">
                      <PieChart className="h-8 w-8 text-[#4fc3f7]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#e0f7fa] to-[#b3e5fc] border-0 shadow-xl text-[#0f172a]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white">Avg. Session</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-3xl font-bold">8m 42s</div>
                      <div className="text-[#0288d1] text-sm flex items-center gap-1 mt-1">
                        <ArrowUpRight className="h-3 w-3" />
                        <span>1m 12s from last period</span>
                      </div>
                    </div>
                    <div className="p-2 bg-blue-900/40 rounded-lg">
                      <Calendar className="h-8 w-8 text-[#4fc3f7]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#e0f7fa] to-[#b3e5fc] border-0 shadow-xl text-[#0f172a]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white">Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-3xl font-bold">$12,582</div>
                      <div className="text-[#0288d1] text-sm flex items-center gap-1 mt-1">
                        <ArrowUpRight className="h-3 w-3" />
                        <span>18% from last period</span>
                      </div>
                    </div>
                    <div className="p-2 bg-blue-900/40 rounded-lg">
                      <BarChart4 className="h-8 w-8 text-[#4fc3f7]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="bg-blue-800 border-blue-700 mb-6">
                <TabsTrigger value="overview" className="data-[state=active]:bg-blue-700 text-white">Overview</TabsTrigger>
                <TabsTrigger value="users" className="data-[state=active]:bg-blue-700 text-white">User Analytics</TabsTrigger>
                <TabsTrigger value="content" className="data-[state=active]:bg-blue-700 text-white">Content Analytics</TabsTrigger>
                <TabsTrigger value="revenue" className="data-[state=active]:bg-blue-700 text-white">Revenue</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-gradient-to-br from-[#e0f7fa] to-[#b3e5fc] border-0 shadow-xl text-[#0f172a]">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-white">User Growth</CardTitle>
                        <Button variant="outline" size="sm" className="bg-blue-900/30 border-blue-700 text-[#1976d2] hover:bg-blue-800">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80 flex items-center justify-center">
                        <div className="text-center">
                          <LineChart className="h-16 w-16 mx-auto mb-4 text-[#4fc3f7]" />
                          <CardDescription className="text-[#0288d1]">User growth chart will appear here</CardDescription>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-[#e0f7fa] to-[#b3e5fc] border-0 shadow-xl text-[#0f172a]">
                <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-white">Top Content</CardTitle>
                        <Button variant="outline" size="sm" className="bg-blue-900/30 border-blue-700 text-[#1976d2] hover:bg-blue-800">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                      </div>
                </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-[#1976d2]">Introduction to Data Science</span>
                            <span className="font-medium">8,245 views</span>
                          </div>
                          <div className="w-full bg-[#b3e5fc] rounded-full h-2">
                            <div className="bg-[#4fc3f7] h-2 rounded-full w-[85%]"></div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-[#1976d2]">Advanced Machine Learning</span>
                            <span className="font-medium">6,847 views</span>
                    </div>
                          <div className="w-full bg-[#b3e5fc] rounded-full h-2">
                            <div className="bg-[#4fc3f7] h-2 rounded-full w-[72%]"></div>
                    </div>
                  </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-[#1976d2]">Python Programming Basics</span>
                            <span className="font-medium">5,392 views</span>
                    </div>
                          <div className="w-full bg-[#b3e5fc] rounded-full h-2">
                            <div className="bg-[#4fc3f7] h-2 rounded-full w-[58%]"></div>
                    </div>
                  </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-[#1976d2]">Statistical Analysis</span>
                            <span className="font-medium">4,128 views</span>
                    </div>
                          <div className="w-full bg-[#b3e5fc] rounded-full h-2">
                            <div className="bg-[#4fc3f7] h-2 rounded-full w-[45%]"></div>
                    </div>
                  </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-[#1976d2]">Data Visualization Techniques</span>
                            <span className="font-medium">3,856 views</span>
                          </div>
                          <div className="w-full bg-[#b3e5fc] rounded-full h-2">
                            <div className="bg-[#4fc3f7] h-2 rounded-full w-[38%]"></div>
                    </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="users">
                <Card className="bg-gradient-to-br from-[#e0f7fa] to-[#b3e5fc] border-0 shadow-xl text-[#0f172a]">
                  <CardHeader>
                    <CardTitle className="text-white">User Demographics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center">
                      <div className="text-center">
                        <PieChart className="h-16 w-16 mx-auto mb-4 text-[#4fc3f7]" />
                        <CardDescription className="text-[#0288d1]">User demographics chart will appear here</CardDescription>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="content">
                <Card className="bg-gradient-to-br from-[#e0f7fa] to-[#b3e5fc] border-0 shadow-xl text-[#0f172a]">
                <CardHeader>
                    <CardTitle className="text-white">Content Performance</CardTitle>
                </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center">
                      <div className="text-center">
                        <BarChart4 className="h-16 w-16 mx-auto mb-4 text-[#4fc3f7]" />
                        <CardDescription className="text-[#0288d1]">Content performance chart will appear here</CardDescription>
                      </div>
                    </div>
                </CardContent>
              </Card>
              </TabsContent>
              
              <TabsContent value="revenue">
                <Card className="bg-gradient-to-br from-[#e0f7fa] to-[#b3e5fc] border-0 shadow-xl text-[#0f172a]">
                  <CardHeader>
                    <CardTitle className="text-white">Revenue Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center">
                      <div className="text-center">
                        <LineChart className="h-16 w-16 mx-auto mb-4 text-[#4fc3f7]" />
                        <CardDescription className="text-[#0288d1]">Revenue breakdown chart will appear here</CardDescription>
                      </div>
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