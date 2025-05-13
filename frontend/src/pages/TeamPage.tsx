import { Card, CardContent } from '@/components/ui/card';
import { Background } from '@/components/ui/background';
import { Layout } from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Mail, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MessageSquare } from 'lucide-react';

const teamMembers = [
  {
    name: 'Ogechi Daniel Koel',
    role: 'Biostatistician',
    bio: 'I am an apt Biostatistician determined in applying various statistical methods to inform decisions in medicine, public health and science.',
    image: '/pictures/ogechi koel.jpg',
    email: 'ogechikoel@gmail.com',
    linkedin: 'https://www.linkedin.com/in/ogechi-koel-4b90b92ab'
  },
  {
    name: 'Nobert Wafula',
    role: 'Data Analyst',
    bio: 'I\'m a data analyst passionate about turning data into actionable insights and building predictive models that drive smart, impactful decisions.',
    image: '/pictures/nobert wafula.jpg',
    email: 'wakasalanobert5746@gmail.com',
    linkedin: 'https://www.linkedin.com/in/nobert-wafula-b7b1782a2'
  },
  {
    name: 'Enock Bereka',
    role: 'Data Scientist',
    bio: 'I\'m a passionate data scientist driven by curiosity and a commitment to lifelong learning. I thrive on exploring new tools and techniques to uncover insights and solve real-world problems. My goal is to turn data into impactful solutions that drive informed decision-making and meaningful change.',
    image: '/pictures/Enock Bereka.jpg',
    email: 'enochosenwafulah@gmail.com',
    linkedin: 'https://www.linkedin.com/in/enock-bereka'
  },
  {
    name: 'Timothy Achala',
    role: 'AI Enthusiast & Computer Scientist',
    bio: 'I am an AI Enthusiast and computer scientist with a deep passion for data. My work lies at the intersection of theory and real-world application—leveraging mathematical rigor and computational power to extract meaningful insights from complex datasets. With a strong foundation in algorithms, statistics, and machine learning, I specialize in transforming raw data into actionable intelligence.',
    image: '/pictures/Timothy Achalla.jpg',
    email: 'timothyachala695@gmail.com',
    linkedin: 'https://www.linkedin.com/in/timothy-a-1bb74127b'
  }
];

export const TeamPage = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-b from-blue-900 to-blue-500 min-h-screen text-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Team Members</h1>
                <p className="text-blue-200">Collaborate with your team on data science projects</p>
              </div>
              <div className="flex space-x-2 mt-4 md:mt-0">
                <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Invite Member
                </Button>
                <Input 
                  placeholder="Search members..." 
                  className="max-w-[200px] bg-blue-800/40 border-blue-700 text-white placeholder:text-blue-300 focus-visible:ring-blue-400"
                />
              </div>
            </div>
            
            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="bg-blue-800/60 text-blue-200">
                <TabsTrigger 
                  value="all" 
                  className="data-[state=active]:bg-blue-700 data-[state=active]:text-white"
                >
                  All Members
                </TabsTrigger>
                <TabsTrigger 
                  value="active"
                  className="data-[state=active]:bg-blue-700 data-[state=active]:text-white"
                >
                  Active Projects
                </TabsTrigger>
                <TabsTrigger 
                  value="admins"
                  className="data-[state=active]:bg-blue-700 data-[state=active]:text-white"
                >
                  Administrators
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                    <Card key={member.id} className="bg-gradient-to-br from-blue-800 to-blue-700 border-0 shadow-xl text-white">
                      <CardHeader className="pb-2">
                        <div className="flex items-start gap-4">
                          <Avatar className="border-2 border-blue-600 h-12 w-12">
                            <AvatarImage src={member.image} alt={member.name} />
                            <AvatarFallback className="bg-blue-900 text-blue-100">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg text-white">{member.name}</CardTitle>
                            <CardDescription className="text-blue-200">
                              {member.role}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="text-sm text-blue-200">
                            <p className="mb-2">{member.bio}</p>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-blue-300" />
                              <span>{member.email}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-blue-100">Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              {member.skills.map((skill, idx) => (
                                <Badge key={idx} className="bg-blue-900/40 hover:bg-blue-900/60 text-blue-100">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-blue-100 mb-2">Active Projects</h4>
                            <div className="space-y-2">
                              {member.projects.slice(0, 2).map((project, idx) => (
                                <div key={idx} className="bg-blue-900/40 p-2 rounded-lg text-sm">
                                  <div className="font-medium text-blue-100">{project.name}</div>
                                  <div className="flex items-center justify-between mt-1">
                                    <div className="text-xs text-blue-300">{project.role}</div>
                                    <Badge className="bg-blue-900/60 text-blue-200 text-xs">
                                      {project.status}
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                              {member.projects.length > 2 && (
                                <div className="text-center text-xs text-blue-300 mt-1">
                                  +{member.projects.length - 2} more projects
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t border-blue-900/40 pt-4 flex justify-between">
                        <Button variant="outline" className="border-blue-600 text-blue-200 hover:bg-blue-600 hover:text-white">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Message
                        </Button>
                        <Button className="bg-blue-700 hover:bg-blue-600 text-white">
                          View Profile
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="active" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teamMembers.filter(m => m.projects.some(p => p.status === 'Active')).map((member) => (
                    <Card key={member.id} className="bg-gradient-to-br from-blue-800 to-blue-700 border-0 shadow-xl text-white">
                      <CardHeader className="pb-2">
                        <div className="flex items-start gap-4">
                          <Avatar className="border-2 border-blue-600 h-12 w-12">
                            <AvatarImage src={member.image} alt={member.name} />
                            <AvatarFallback className="bg-blue-900 text-blue-100">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg text-white">{member.name}</CardTitle>
                            <CardDescription className="text-blue-200">
                              {member.role}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-blue-100 mb-2">Active Projects</h4>
                            <div className="space-y-2">
                              {member.projects.filter(p => p.status === 'Active').map((project, idx) => (
                                <div key={idx} className="bg-blue-900/40 p-2 rounded-lg text-sm">
                                  <div className="font-medium text-blue-100">{project.name}</div>
                                  <div className="flex items-center justify-between mt-1">
                                    <div className="text-xs text-blue-300">{project.role}</div>
                                    <Badge className="bg-blue-900/60 text-blue-200 text-xs">
                                      {project.status}
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t border-blue-900/40 pt-4 flex justify-between">
                        <Button variant="outline" className="border-blue-600 text-blue-200 hover:bg-blue-600 hover:text-white">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Message
                        </Button>
                        <Button className="bg-blue-700 hover:bg-blue-600 text-white">
                          View Profile
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="admins" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teamMembers.filter(m => m.role.includes('Admin') || m.role.includes('Manager')).map((member) => (
                    <Card key={member.id} className="bg-gradient-to-br from-blue-800 to-blue-700 border-0 shadow-xl text-white">
                      <CardHeader className="pb-2">
                        <div className="flex items-start gap-4">
                          <Avatar className="border-2 border-blue-600 h-12 w-12">
                            <AvatarImage src={member.image} alt={member.name} />
                            <AvatarFallback className="bg-blue-900 text-blue-100">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg text-white">{member.name}</CardTitle>
                            <CardDescription className="text-blue-200">
                              {member.role}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="text-sm text-blue-200">
                            <p className="mb-2">{member.bio}</p>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-blue-300" />
                              <span>{member.email}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-blue-100">Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              {member.skills.map((skill, idx) => (
                                <Badge key={idx} className="bg-blue-900/40 hover:bg-blue-900/60 text-blue-100">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t border-blue-900/40 pt-4 flex justify-between">
                        <Button variant="outline" className="border-blue-600 text-blue-200 hover:bg-blue-600 hover:text-white">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Message
                        </Button>
                        <Button className="bg-blue-700 hover:bg-blue-600 text-white">
                          View Profile
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 bg-gradient-to-br from-blue-800 to-blue-700 border-0 shadow-xl text-white">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Team Collaboration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-blue-900/40 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-blue-100 mb-3">Upcoming Meetings</h3>
                      <div className="space-y-3">
                        {meetings.map((meeting, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-2 border-b border-blue-900/40 last:border-0">
                            <div className="bg-blue-900/60 text-blue-300 p-2 rounded-lg">
                              <Calendar className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="font-medium text-blue-100">{meeting.title}</h4>
                              <p className="text-xs text-blue-300 mb-1">{meeting.date} · {meeting.time} · {meeting.duration}</p>
                              <div className="flex -space-x-2">
                                {meeting.participants.map((participant, i) => (
                                  <Avatar key={i} className="border-2 border-blue-700 h-6 w-6">
                                    <AvatarImage src={participant.avatar} alt={participant.name} />
                                    <AvatarFallback className="bg-blue-900 text-blue-100 text-xs">
                                      {participant.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                ))}
                                {meeting.participants.length > 3 && (
                                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-900/60 text-blue-300 text-xs border-2 border-blue-700">
                                    +{meeting.participants.length - 3}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="ml-auto">
                              <Button variant="outline" size="sm" className="h-8 border-blue-600 text-blue-200 hover:bg-blue-600 hover:text-white">
                                Join
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-blue-900/40 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-blue-100 mb-3">Recent Discussions</h3>
                      <div className="space-y-3">
                        {discussions.map((discussion, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-2 border-b border-blue-900/40 last:border-0">
                            <div className="bg-blue-900/60 text-blue-300 p-2 rounded-lg">
                              <MessageSquare className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="font-medium text-blue-100">{discussion.title}</h4>
                              <p className="text-xs text-blue-300 mb-1">
                                Started by {discussion.author} · {discussion.lastActive} · {discussion.replies} replies
                              </p>
                              <p className="text-sm text-blue-200 line-clamp-1">{discussion.preview}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-blue-800 to-blue-700 border-0 shadow-xl text-white">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Team Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-900/40 p-4 rounded-lg">
                      <div className="text-3xl font-bold text-blue-100 mb-1">
                        {teamMembers.length}
                      </div>
                      <div className="text-blue-300">Team Members</div>
                    </div>
                    <div className="bg-blue-900/40 p-4 rounded-lg">
                      <div className="text-3xl font-bold text-blue-100 mb-1">
                        {teamMembers.reduce((total, member) => total + member.projects.length, 0)}
                      </div>
                      <div className="text-blue-300">Active Projects</div>
                    </div>
                    <div className="bg-blue-900/40 p-4 rounded-lg">
                      <div className="text-3xl font-bold text-blue-100 mb-1">
                        {teamMembers.reduce((total, member) => total + member.skills.length, 0) / teamMembers.length}
                      </div>
                      <div className="text-blue-300">Avg. Skills per Member</div>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-blue-100 mb-2">Top Skills</h4>
                      <div className="space-y-2">
                        {['Data Analysis', 'Python', 'Machine Learning', 'SQL', 'Visualization'].map((skill, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <span className="text-sm text-blue-200">{skill}</span>
                            <span className="text-xs text-blue-300">
                              {Math.floor(Math.random() * 10) + 1} members
                            </span>
                          </div>
                        ))}
                      </div>
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

export default TeamPage; 