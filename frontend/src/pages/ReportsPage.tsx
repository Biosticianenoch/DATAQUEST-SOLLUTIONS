import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Download, BarChart, Calendar, Filter } from 'lucide-react';

interface Report {
  id: number;
  title: string;
  type: string;
  date: string;
  status: string;
  author: string;
  description: string;
  tags: string[];
}

export const ReportsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('month');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await api.get('/reports');
        setReports(response.data);
      } catch (err) {
        setError('Failed to load reports. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || report.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Reports</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="bg-white/95 backdrop-blur-sm border-primary/20">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2 mt-2" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gradient-to-b from-blue-900 to-blue-500 min-h-screen text-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-white">Reports & Analytics</h1>
              <Button className="bg-blue-700 hover:bg-blue-600 text-white">
                <FileText className="h-4 w-4 mr-2" />
                Generate New Report
              </Button>
        </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-blue-800 to-blue-700 border-0 shadow-xl text-white">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Total Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-2">24</div>
                  <p className="text-blue-200">6 reports this month</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-800 to-blue-700 border-0 shadow-xl text-white">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Average Time to Generate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-2">2.4 hrs</div>
                  <p className="text-blue-200">15% faster than last month</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-800 to-blue-700 border-0 shadow-xl text-white">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Data Quality Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-2">94%</div>
                  <p className="text-blue-200">3% improvement this quarter</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="reports" className="mb-6">
              <TabsList className="bg-blue-800 border-blue-700">
                <TabsTrigger value="reports" className="data-[state=active]:bg-blue-700 text-white">Reports</TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-700 text-white">Analytics</TabsTrigger>
                <TabsTrigger value="scheduled" className="data-[state=active]:bg-blue-700 text-white">Scheduled</TabsTrigger>
              </TabsList>
              
              <TabsContent value="reports">
                <Card className="bg-gradient-to-br from-blue-800 to-blue-700 border-0 shadow-xl text-white">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl text-white">Recent Reports</CardTitle>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="bg-blue-900/30 border-blue-700 text-blue-100 hover:bg-blue-800">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                        <Select
                          value={selectedTimeframe}
                          onValueChange={setSelectedTimeframe}
                        >
                          <SelectTrigger className="w-[150px] bg-blue-900/30 border-blue-700 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-blue-800 border-blue-700 text-white">
                            <SelectItem value="week" className="focus:bg-blue-700 focus:text-white">This Week</SelectItem>
                            <SelectItem value="month" className="focus:bg-blue-700 focus:text-white">This Month</SelectItem>
                            <SelectItem value="quarter" className="focus:bg-blue-700 focus:text-white">This Quarter</SelectItem>
                            <SelectItem value="year" className="focus:bg-blue-700 focus:text-white">This Year</SelectItem>
                          </SelectContent>
                        </Select>
                    </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-white">
                        <thead>
                          <tr className="border-b border-blue-700">
                            <th className="text-left py-3 px-4 text-blue-300">Report Name</th>
                            <th className="text-left py-3 px-4 text-blue-300">Date</th>
                            <th className="text-left py-3 px-4 text-blue-300">Type</th>
                            <th className="text-left py-3 px-4 text-blue-300">Status</th>
                            <th className="text-right py-3 px-4 text-blue-300">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredReports.map((report) => (
                            <tr key={report.id} className="border-b border-blue-700/50 hover:bg-blue-700/50 transition">
                              <td className="py-3 px-4">{report.title}</td>
                              <td className="py-3 px-4 text-blue-200">{report.date}</td>
                              <td className="py-3 px-4">{report.type}</td>
                              <td className="py-3 px-4">
                                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                  report.status === 'Completed' ? 'bg-green-600' : 'bg-yellow-600'
                      }`}>
                        {report.status}
                      </span>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <Button variant="ghost" size="sm" className="text-blue-300 hover:text-blue-100 hover:bg-blue-800">
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="analytics">
                <Card className="bg-gradient-to-br from-blue-800 to-blue-700 border-0 shadow-xl text-white">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl text-white">Data Analytics</CardTitle>
                      <Select defaultValue="month">
                        <SelectTrigger className="w-[150px] bg-blue-900/30 border-blue-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-blue-800 border-blue-700 text-white">
                          <SelectItem value="week" className="focus:bg-blue-700 focus:text-white">This Week</SelectItem>
                          <SelectItem value="month" className="focus:bg-blue-700 focus:text-white">This Month</SelectItem>
                          <SelectItem value="quarter" className="focus:bg-blue-700 focus:text-white">This Quarter</SelectItem>
                          <SelectItem value="year" className="focus:bg-blue-700 focus:text-white">This Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center items-center h-56 mb-4">
                      <div className="text-center">
                        <BarChart className="h-16 w-16 mx-auto mb-4 text-blue-300" />
                        <p className="text-blue-200">Interactive charts will appear here</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-900/30 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-blue-300 mb-2">Performance Metrics</h3>
                        <p className="text-2xl font-bold">85%</p>
                        <p className="text-xs text-blue-200">+12% from last month</p>
                      </div>
                      <div className="bg-blue-900/30 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-blue-300 mb-2">User Engagement</h3>
                        <p className="text-2xl font-bold">92%</p>
                        <p className="text-xs text-blue-200">+5% from last month</p>
                      </div>
                      <div className="bg-blue-900/30 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-blue-300 mb-2">Completion Rate</h3>
                        <p className="text-2xl font-bold">78%</p>
                        <p className="text-xs text-blue-200">+8% from last month</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="scheduled">
                <Card className="bg-gradient-to-br from-blue-800 to-blue-700 border-0 shadow-xl text-white">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Scheduled Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-white">
                        <thead>
                          <tr className="border-b border-blue-700">
                            <th className="text-left py-3 px-4 text-blue-300">Report Name</th>
                            <th className="text-left py-3 px-4 text-blue-300">Frequency</th>
                            <th className="text-left py-3 px-4 text-blue-300">Next Run</th>
                            <th className="text-right py-3 px-4 text-blue-300">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-blue-700/50 hover:bg-blue-700/50 transition">
                            <td className="py-3 px-4">Weekly Performance Summary</td>
                            <td className="py-3 px-4">Weekly</td>
                            <td className="py-3 px-4 text-blue-200">2023-09-18</td>
                            <td className="py-3 px-4 text-right">
                              <Button variant="ghost" size="sm" className="text-blue-300 hover:text-blue-100 hover:bg-blue-800">
                                <Calendar className="h-4 w-4 mr-2" />
                                Edit Schedule
                              </Button>
                            </td>
                          </tr>
                          <tr className="border-b border-blue-700/50 hover:bg-blue-700/50 transition">
                            <td className="py-3 px-4">Monthly Financial Report</td>
                            <td className="py-3 px-4">Monthly</td>
                            <td className="py-3 px-4 text-blue-200">2023-10-01</td>
                            <td className="py-3 px-4 text-right">
                              <Button variant="ghost" size="sm" className="text-blue-300 hover:text-blue-100 hover:bg-blue-800">
                                <Calendar className="h-4 w-4 mr-2" />
                                Edit Schedule
                              </Button>
                            </td>
                          </tr>
                          <tr className="border-b border-blue-700/50 hover:bg-blue-700/50 transition">
                            <td className="py-3 px-4">Quarterly Business Review</td>
                            <td className="py-3 px-4">Quarterly</td>
                            <td className="py-3 px-4 text-blue-200">2023-12-31</td>
                            <td className="py-3 px-4 text-right">
                              <Button variant="ghost" size="sm" className="text-blue-300 hover:text-blue-100 hover:bg-blue-800">
                                <Calendar className="h-4 w-4 mr-2" />
                                Edit Schedule
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
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