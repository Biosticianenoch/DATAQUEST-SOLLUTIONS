import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Navigate } from 'react-router-dom';
import api from '../lib/api';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, FileText, CheckCircle2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Plus, SlidersHorizontal, ChevronDown } from 'lucide-react';

interface Assignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  status: string;
  description: string;
  points: number;
  submitted: boolean;
  submittedDate?: string;
  gradedDate?: string;
  earnedPoints?: number;
  feedback?: string;
}

export const AssignmentsPage = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await api.get('/assignments');
        setAssignments(response.data);
      } catch (err) {
        setError('Failed to load assignments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         assignment.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || assignment.course === selectedCourse;
    const matchesStatus = selectedStatus === 'all' || assignment.status === selectedStatus;
    return matchesSearch && matchesCourse && matchesStatus;
  });

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Assignments</h1>
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
      <div className="bg-gradient-to-b from-blue-900 to-blue-500 min-h-screen text-[#0f172a] py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-[#0f172a] mb-2">Assignments</h1>
                <p className="text-blue-200">Track and manage your course assignments</p>
              </div>
              <div className="flex space-x-2 mt-4 md:mt-0">
                <Button className="bg-blue-700 hover:bg-blue-800 text-[#0f172a]">
                  <Plus className="mr-2 h-4 w-4" />
                  New Assignment
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="bg-blue-800/60 border-blue-700 text-[#0f172a] hover:bg-blue-800 hover:text-[#0f172a]">
                      <SlidersHorizontal className="mr-2 h-4 w-4" />
                      Filter
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-blue-800 border-blue-700 text-[#0f172a]">
                    <DropdownMenuCheckboxItem className="text-[#0f172a] focus:bg-blue-700 focus:text-[#0f172a]">
                      Pending
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem className="text-[#0f172a] focus:bg-blue-700 focus:text-[#0f172a]">
                      Submitted
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem className="text-[#0f172a] focus:bg-blue-700 focus:text-[#0f172a]">
                      Graded
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator className="bg-blue-700" />
                    <DropdownMenuLabel className="text-[#4fc3f7]">Sort by</DropdownMenuLabel>
                    <DropdownMenuRadioGroup value="dueDate">
                      <DropdownMenuRadioItem value="dueDate" className="text-[#0f172a] focus:bg-blue-700 focus:text-[#0f172a]">
                        Due Date
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="title" className="text-[#0f172a] focus:bg-blue-700 focus:text-[#0f172a]">
                        Title
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="course" className="text-[#0f172a] focus:bg-blue-700 focus:text-[#0f172a]">
                        Course
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
            <Input
              placeholder="Search assignments..."
                  className="max-w-[200px] bg-blue-800/40 border-blue-700 text-[#0f172a] placeholder:text-[#4fc3f7] focus-visible:ring-blue-400"
            />
          </div>
            </div>
            
            <Tabs defaultValue="pending" className="mb-8">
              <TabsList className="bg-blue-800/60 text-blue-200">
                <TabsTrigger 
                  value="pending" 
                  className="data-[state=active]:bg-blue-700 data-[state=active]:text-[#0f172a]"
                >
                  Pending ({assignments.filter(a => a.status === 'pending').length})
                </TabsTrigger>
                <TabsTrigger 
                  value="submitted"
                  className="data-[state=active]:bg-blue-700 data-[state=active]:text-[#0f172a]"
                >
                  Submitted ({assignments.filter(a => a.status === 'submitted').length})
                </TabsTrigger>
                <TabsTrigger 
                  value="graded"
                  className="data-[state=active]:bg-blue-700 data-[state=active]:text-[#0f172a]"
                >
                  Graded ({assignments.filter(a => a.status === 'graded').length})
                </TabsTrigger>
                <TabsTrigger 
                  value="all"
                  className="data-[state=active]:bg-blue-700 data-[state=active]:text-[#0f172a]"
                >
                  All ({assignments.length})
                </TabsTrigger>
              </TabsList>
              <TabsContent value="pending">
                <div className="grid grid-cols-1 gap-4">
                  {assignments
                    .filter(a => a.status === 'pending')
                    .map(assignment => (
                      <Card key={assignment.id} className="bg-gradient-to-br from-blue-800 to-blue-700 border-0 shadow-xl text-[#0f172a]">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-xl text-[#0f172a]">{assignment.title}</CardTitle>
                            <Badge 
                              className={
                                assignment.status === 'pending' 
                                  ? 'bg-orange-600 text-[#0f172a]' 
                                  : assignment.status === 'submitted' 
                                  ? 'bg-blue-600 text-[#0f172a]' 
                                  : 'bg-green-600 text-[#0f172a]'
                              }
                            >
                              {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                            </Badge>
                          </div>
                          <CardDescription className="text-blue-200">
                            Course: {assignment.course}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="text-sm text-[#0288d1]">{assignment.description}</div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4 text-[#4fc3f7]" />
                                <span className="text-blue-200">Due: <span className="text-[#0f172a]">{assignment.dueDate}</span></span>
                              </div>
                              <div className="flex items-center">
                                <FileText className="mr-2 h-4 w-4 text-[#4fc3f7]" />
                                <span className="text-blue-200">Points: <span className="text-[#0f172a]">{assignment.points}</span></span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-2 border-t border-[#b3e5fc]">
                          <Button className="bg-blue-700 hover:bg-blue-600 text-[#0f172a] w-full">
                            Start Assignment
                          </Button>
                        </CardFooter>
                      </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="submitted">
                <div className="grid grid-cols-1 gap-4">
                  {assignments
                    .filter(a => a.status === 'submitted')
                    .map(assignment => (
                      <Card key={assignment.id} className="bg-gradient-to-br from-blue-800 to-blue-700 border-0 shadow-xl text-[#0f172a]">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-xl text-[#0f172a]">{assignment.title}</CardTitle>
                            <Badge 
                              className={
                                assignment.status === 'pending' 
                                  ? 'bg-orange-600 text-[#0f172a]' 
                                  : assignment.status === 'submitted' 
                                  ? 'bg-blue-600 text-[#0f172a]' 
                                  : 'bg-green-600 text-[#0f172a]'
                              }
                            >
                              {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                            </Badge>
                          </div>
                          <CardDescription className="text-blue-200">
                            Course: {assignment.course}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="text-sm text-[#0288d1]">{assignment.description}</div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4 text-[#4fc3f7]" />
                                <span className="text-blue-200">Submitted: <span className="text-[#0f172a]">{assignment.submittedDate}</span></span>
                              </div>
                              <div className="flex items-center">
                                <FileText className="mr-2 h-4 w-4 text-[#4fc3f7]" />
                                <span className="text-blue-200">Points: <span className="text-[#0f172a]">{assignment.points}</span></span>
                              </div>
                            </div>
          </div>
                        </CardContent>
                        <CardFooter className="pt-2 border-t border-[#b3e5fc]">
                          <Button variant="outline" className="border-blue-600 text-blue-200 hover:bg-blue-600 hover:text-[#0f172a] w-full">
                            View Submission
                          </Button>
                        </CardFooter>
                      </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="graded">
                <div className="grid grid-cols-1 gap-4">
                  {assignments
                    .filter(a => a.status === 'graded')
                    .map(assignment => (
                      <Card key={assignment.id} className="bg-gradient-to-br from-blue-800 to-blue-700 border-0 shadow-xl text-[#0f172a]">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-xl text-[#0f172a]">{assignment.title}</CardTitle>
                            <Badge 
                              className={
                                assignment.status === 'pending' 
                                  ? 'bg-orange-600 text-[#0f172a]' 
                                  : assignment.status === 'submitted' 
                                  ? 'bg-blue-600 text-[#0f172a]' 
                                  : 'bg-green-600 text-[#0f172a]'
                              }
                            >
                              {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                            </Badge>
                          </div>
                          <CardDescription className="text-blue-200">
                            Course: {assignment.course}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="text-sm text-[#0288d1]">{assignment.description}</div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4 text-[#4fc3f7]" />
                                <span className="text-blue-200">Graded: <span className="text-[#0f172a]">{assignment.gradedDate}</span></span>
                              </div>
                              <div className="flex items-center">
                                <CheckCircle2 className="mr-2 h-4 w-4 text-[#4fc3f7]" />
                                <span className="text-blue-200">Score: <span className="text-[#0f172a]">{assignment.earnedPoints}/{assignment.points}</span></span>
                              </div>
                            </div>
                            <div className="bg-[#b3e5fc] p-3 rounded-lg">
                              <h4 className="text-sm font-medium text-[#1976d2] mb-1">Feedback</h4>
                              <p className="text-sm text-[#0288d1]">{assignment.feedback}</p>
          </div>
        </div>
                        </CardContent>
                        <CardFooter className="pt-2 border-t border-[#b3e5fc]">
                          <Button variant="outline" className="border-blue-600 text-blue-200 hover:bg-blue-600 hover:text-[#0f172a] w-full">
                            View Submission
                          </Button>
                        </CardFooter>
                      </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="all">
                <div className="grid grid-cols-1 gap-4">
                  {assignments.map(assignment => (
                      <Card key={assignment.id} className="bg-gradient-to-br from-blue-800 to-blue-700 border-0 shadow-xl text-[#0f172a]">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-xl text-[#0f172a]">{assignment.title}</CardTitle>
                            <Badge 
                              className={
                                assignment.status === 'pending' 
                                  ? 'bg-orange-600 text-[#0f172a]' 
                                  : assignment.status === 'submitted' 
                                  ? 'bg-blue-600 text-[#0f172a]' 
                                  : 'bg-green-600 text-[#0f172a]'
                              }
                            >
                              {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                            </Badge>
          </div>
                          <CardDescription className="text-blue-200">
                            Course: {assignment.course}
                          </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                            <div className="text-sm text-[#0288d1]">{assignment.description}</div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4 text-[#4fc3f7]" />
                                <span className="text-blue-200">
                                  {assignment.status === 'pending' ? 'Due: ' : 
                                   assignment.status === 'submitted' ? 'Submitted: ' : 'Graded: '}
                                  <span className="text-[#0f172a]">
                                    {assignment.status === 'pending' ? assignment.dueDate : 
                                     assignment.status === 'submitted' ? assignment.submittedDate : assignment.gradedDate}
                                  </span>
                                </span>
                              </div>
                              <div className="flex items-center">
                                {assignment.status === 'graded' ? (
                                  <>
                                    <CheckCircle2 className="mr-2 h-4 w-4 text-[#4fc3f7]" />
                                    <span className="text-blue-200">Score: <span className="text-[#0f172a]">{assignment.earnedPoints}/{assignment.points}</span></span>
                                  </>
                                ) : (
                                  <>
                                    <FileText className="mr-2 h-4 w-4 text-[#4fc3f7]" />
                                    <span className="text-blue-200">Points: <span className="text-[#0f172a]">{assignment.points}</span></span>
                                  </>
                                )}
                              </div>
                            </div>
                            {assignment.status === 'graded' && (
                              <div className="bg-[#b3e5fc] p-3 rounded-lg">
                                <h4 className="text-sm font-medium text-[#1976d2] mb-1">Feedback</h4>
                                <p className="text-sm text-[#0288d1]">{assignment.feedback}</p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="pt-2 border-t border-[#b3e5fc]">
                          {assignment.status === 'pending' ? (
                            <Button className="bg-blue-700 hover:bg-blue-600 text-[#0f172a] w-full">
                              Start Assignment
                            </Button>
                          ) : (
                            <Button variant="outline" className="border-blue-600 text-blue-200 hover:bg-blue-600 hover:text-[#0f172a] w-full">
                              View Submission
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            <Card className="bg-gradient-to-br from-blue-800 to-blue-700 border-0 shadow-xl text-[#0f172a]">
              <CardHeader>
                <CardTitle className="text-xl text-[#0f172a]">Assignment Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-[#b3e5fc] p-4 rounded-lg">
                    <div className="text-3xl font-bold text-[#1976d2] mb-1">
                      {assignments.filter(a => a.status === 'graded').length}
                    </div>
                    <div className="text-[#4fc3f7]">Completed</div>
                  </div>
                  <div className="bg-[#b3e5fc] p-4 rounded-lg">
                    <div className="text-3xl font-bold text-[#1976d2] mb-1">
                      {assignments.filter(a => a.status === 'pending').length}
                    </div>
                    <div className="text-[#4fc3f7]">Pending</div>
                  </div>
                  <div className="bg-[#b3e5fc] p-4 rounded-lg">
                    <div className="text-3xl font-bold text-[#1976d2] mb-1">
                      {Math.round(
                        assignments
                          .filter(a => a.status === 'graded')
                          .reduce((sum, a) => sum + (a.earnedPoints / a.points) * 100, 0) / 
                        Math.max(1, assignments.filter(a => a.status === 'graded').length)
                      )}%
                    </div>
                    <div className="text-[#4fc3f7]">Average Score</div>
                    </div>
                  <div className="bg-[#b3e5fc] p-4 rounded-lg">
                    <div className="text-3xl font-bold text-[#1976d2] mb-1">
                      {assignments.reduce((sum, a) => sum + a.points, 0)}
                    </div>
                    <div className="text-[#4fc3f7]">Total Points</div>
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