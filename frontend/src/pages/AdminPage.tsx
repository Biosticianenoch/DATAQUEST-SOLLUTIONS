import { useState } from "react";
import { useAuth } from '@/lib/auth-context';
import { Navigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Users, BarChart3, Shield, Settings, Activity, AlertTriangle, Clock, Search, Filter, X, MoreVertical, Plus, RefreshCw, Download, Upload, Trash2, Eye, Database, Edit } from "lucide-react";
import { useAnalytics } from "@/hooks/useApi";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const adminData = {
  overview: {
    totalUsers: 12500,
    activeUsers: 8900,
    totalCourses: 150,
    totalProjects: 75,
    storageUsed: '2.5 TB',
    apiRequests: '1.2M/day'
  },
  recentActivity: [
    {
      id: 1,
      user: 'John Doe',
      action: 'Created a new course',
      target: 'Machine Learning Fundamentals',
      timestamp: '2023-07-15T10:30:00',
      type: 'course'
    },
    {
      id: 2,
      user: 'Jane Smith',
      action: 'Updated project settings',
      target: 'Data Visualization Dashboard',
      timestamp: '2023-07-15T09:45:00',
      type: 'project'
    },
    {
      id: 3,
      user: 'Michael Johnson',
      action: 'Added new user',
      target: 'Sarah Williams',
      timestamp: '2023-07-14T16:20:00',
      type: 'user'
    },
    {
      id: 4,
      user: 'Emily Davis',
      action: 'Published new content',
      target: 'Python for Data Science',
      timestamp: '2023-07-14T14:15:00',
      type: 'content'
    },
    {
      id: 5,
      user: 'David Brown',
      action: 'Modified system settings',
      target: 'Email Configuration',
      timestamp: '2023-07-14T11:30:00',
      type: 'system'
    }
  ],
  systemMetrics: {
    cpuUsage: 45,
    memoryUsage: 62,
    diskUsage: 78,
    networkTraffic: 125
  }
};

const AdminPage = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  const [activeTab, setActiveTab] = useState("overview");
  const { data: stats, loading, error } = useAnalytics();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredActivity = adminData.recentActivity.filter(activity => {
    const matchesSearch = 
      activity.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.target.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || activity.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <Layout>
      <div className="bg-gradient-to-b from-[#e0f7fa] to-[#b3e5fc] min-h-screen text-[#0f172a] py-8">
        <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-[#0f172a] mb-6">Admin Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-gradient-to-br from-[#e0f7fa] to-[#b3e5fc] border-0 shadow-xl text-[#0f172a]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-[#1976d2]">{stat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                    <div className="flex items-center">
                      <div className="text-3xl font-bold mr-2">{stat.value}</div>
                      <div className={`text-sm ${stat.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {stat.change > 0 ? '↑' : '↓'} {Math.abs(stat.change)}%
                      </div>
                    </div>
              </CardContent>
            </Card>
              ))}
          </div>

            <Tabs defaultValue="users" className="mb-8">
              <TabsList className="bg-blue-800 border-blue-700">
                <TabsTrigger value="users" className="data-[state=active]:bg-blue-700 text-white">Users</TabsTrigger>
                <TabsTrigger value="courses" className="data-[state=active]:bg-blue-700 text-white">Courses</TabsTrigger>
                <TabsTrigger value="payments" className="data-[state=active]:bg-blue-700 text-white">Payments</TabsTrigger>
              </TabsList>
              
              <TabsContent value="users" className="mt-4">
                <Card className="bg-gradient-to-br from-[#e0f7fa] to-[#b3e5fc] border-0 shadow-xl text-[#0f172a]">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl text-white">Users</CardTitle>
                      <Button variant="outline" size="sm" className="bg-blue-900/30 border-blue-700 text-blue-100 hover:bg-blue-800">
                        <Plus className="h-4 w-4 mr-2" /> Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-white">
                        <thead>
                          <tr className="border-b border-blue-700">
                            <th className="text-left py-3 px-2 text-[#4fc3f7]">Name</th>
                            <th className="text-left py-3 px-2 text-[#4fc3f7]">Email</th>
                            <th className="text-left py-3 px-2 text-[#4fc3f7]">Role</th>
                            <th className="text-left py-3 px-2 text-[#4fc3f7]">Status</th>
                            <th className="text-right py-3 px-2 text-[#4fc3f7]">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user, index) => (
                            <tr key={index} className="border-b border-[#b3e5fc]">
                              <td className="py-3 px-2">{user.name}</td>
                              <td className="py-3 px-2 text-[#0288d1]">{user.email}</td>
                              <td className="py-3 px-2">
                                <Badge className="bg-[#4fc3f7] hover:bg-[#b3e5fc] text-[#0f172a]">
                                  {user.role}
                                </Badge>
                              </td>
                              <td className="py-3 px-2">
                                <Badge variant={user.status === 'Active' ? 'default' : 'secondary'} className={user.status === 'Active' ? 'bg-green-600 hover:bg-green-600 text-white' : 'bg-gray-600 hover:bg-gray-600 text-white'}>
                                  {user.status}
                                </Badge>
                              </td>
                              <td className="py-3 px-2 text-right">
                                <Button variant="ghost" size="icon" className="text-[#4fc3f7] hover:text-blue-100 hover:bg-blue-800">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-[#4fc3f7] hover:text-blue-100 hover:bg-blue-800">
                                  <Trash className="h-4 w-4" />
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
              
              <TabsContent value="courses" className="mt-4">
                <Card className="bg-gradient-to-br from-[#e0f7fa] to-[#b3e5fc] border-0 shadow-xl text-[#0f172a]">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl text-white">Courses</CardTitle>
                      <Button variant="outline" size="sm" className="bg-blue-900/30 border-blue-700 text-blue-100 hover:bg-blue-800">
                        <Plus className="h-4 w-4 mr-2" /> Add Course
                      </Button>
                  </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-white">
                        <thead>
                          <tr className="border-b border-blue-700">
                            <th className="text-left py-3 px-2 text-[#4fc3f7]">Title</th>
                            <th className="text-left py-3 px-2 text-[#4fc3f7]">Instructor</th>
                            <th className="text-left py-3 px-2 text-[#4fc3f7]">Students</th>
                            <th className="text-left py-3 px-2 text-[#4fc3f7]">Status</th>
                            <th className="text-right py-3 px-2 text-[#4fc3f7]">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {courses.map((course, index) => (
                            <tr key={index} className="border-b border-[#b3e5fc]">
                              <td className="py-3 px-2">{course.title}</td>
                              <td className="py-3 px-2 text-[#0288d1]">{course.instructor}</td>
                              <td className="py-3 px-2">{course.students}</td>
                              <td className="py-3 px-2">
                                <Badge variant={course.status === 'Published' ? 'default' : 'secondary'} className={course.status === 'Published' ? 'bg-green-600 hover:bg-green-600 text-white' : 'bg-[#4fc3f7] hover:bg-[#b3e5fc] text-[#0f172a]'}>
                                  {course.status}
                                </Badge>
                              </td>
                              <td className="py-3 px-2 text-right">
                                <Button variant="ghost" size="icon" className="text-[#4fc3f7] hover:text-blue-100 hover:bg-blue-800">
                                  <Edit className="h-4 w-4" />
                          </Button>
                                <Button variant="ghost" size="icon" className="text-[#4fc3f7] hover:text-blue-100 hover:bg-blue-800">
                                  <Trash className="h-4 w-4" />
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

              <TabsContent value="payments" className="mt-4">
                <Card className="bg-gradient-to-br from-[#e0f7fa] to-[#b3e5fc] border-0 shadow-xl text-[#0f172a]">
              <CardHeader>
                    <CardTitle className="text-xl text-white">Recent Payments</CardTitle>
              </CardHeader>
              <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-white">
                        <thead>
                          <tr className="border-b border-blue-700">
                            <th className="text-left py-3 px-2 text-[#4fc3f7]">Transaction ID</th>
                            <th className="text-left py-3 px-2 text-[#4fc3f7]">User</th>
                            <th className="text-left py-3 px-2 text-[#4fc3f7]">Amount</th>
                            <th className="text-left py-3 px-2 text-[#4fc3f7]">Date</th>
                            <th className="text-left py-3 px-2 text-[#4fc3f7]">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {payments.map((payment, index) => (
                            <tr key={index} className="border-b border-[#b3e5fc]">
                              <td className="py-3 px-2 text-[#0288d1]">#{payment.id}</td>
                              <td className="py-3 px-2">{payment.user}</td>
                              <td className="py-3 px-2 font-semibold">${payment.amount}</td>
                              <td className="py-3 px-2 text-[#0288d1]">{payment.date}</td>
                              <td className="py-3 px-2">
                                <Badge className={payment.status === 'Completed' ? 'bg-green-600 hover:bg-green-600 text-white' : payment.status === 'Pending' ? 'bg-yellow-600 hover:bg-yellow-600 text-white' : 'bg-red-600 hover:bg-red-600 text-white'}>
                                  {payment.status}
                                </Badge>
                              </td>
                            </tr>
                          ))}
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

export default AdminPage; 