import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Video, Users, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { fetchWebinars, Webinar } from '@/services/api/webinars';

const WebinarsPage: React.FC = () => {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getWebinars = async () => {
      try {
        setLoading(true);
        // In a real application, this would call the API
        // For now, we'll return an empty array until the backend is implemented
        // const data = await fetchWebinars();
        setWebinars([]);
        setLoading(false);
      } catch (err) {
        setError('Failed to load webinars. Please try again later.');
        toast({
          title: 'Error',
          description: 'Failed to load webinars',
          variant: 'destructive',
        });
        setLoading(false);
      }
    };

    getWebinars();
  }, [toast]);

  const upcomingWebinars = webinars.filter(webinar => webinar.isUpcoming);
  const pastWebinars = webinars.filter(webinar => !webinar.isUpcoming);

  if (loading) {
    return (
      <Layout>
        <div className="bg-gradient-to-b from-blue-900 to-blue-500 min-h-screen text-white">
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-center items-center min-h-[400px]">
              <p className="text-lg text-white">Loading webinars...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="bg-gradient-to-b from-blue-900 to-blue-500 min-h-screen text-white">
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-center items-center min-h-[400px]">
              <p className="text-lg text-red-300">{error}</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gradient-to-b from-blue-900 to-blue-500 min-h-screen text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-2">Webinars</h1>
            <p className="text-lg text-blue-100 mb-12">
              Join our expert-led webinars to enhance your data science knowledge and skills.
            </p>

            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 text-white">Upcoming Webinars</h2>
              {upcomingWebinars.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {upcomingWebinars.map((webinar) => (
                    <Card key={webinar.id} className="bg-gradient-to-br from-blue-800 to-blue-700 border-0 shadow-xl hover:shadow-2xl transition-shadow text-white">
                      <CardHeader>
                        <CardTitle className="text-xl text-white">{webinar.title}</CardTitle>
                        <CardDescription className="text-blue-200">{webinar.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center text-sm text-blue-100">
                            <Calendar className="h-4 w-4 mr-2 text-blue-300" />
                            <span>{webinar.date}</span>
                          </div>
                          <div className="flex items-center text-sm text-blue-100">
                            <Clock className="h-4 w-4 mr-2 text-blue-300" />
                            <span>{webinar.time}</span>
                          </div>
                          <div className="flex items-center text-sm text-blue-100">
                            <Users className="h-4 w-4 mr-2 text-blue-300" />
                            <span>Speaker: {webinar.speaker}</span>
                          </div>
                          <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-400 text-white">Register Now</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-gradient-to-br from-blue-800 to-blue-700 border-0 shadow-xl text-white">
                  <CardContent className="pt-6">
                    <p className="text-center text-blue-200 py-8">
                      No upcoming webinars at the moment. Check back soon!
                    </p>
                  </CardContent>
                </Card>
              )}
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6 text-white">Past Webinars</h2>
              {pastWebinars.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {pastWebinars.map((webinar) => (
                    <Card key={webinar.id} className="bg-gradient-to-br from-blue-700 to-blue-600 border-0 shadow-xl hover:shadow-2xl transition-shadow text-white">
                      <CardHeader>
                        <CardTitle className="text-xl text-white">{webinar.title}</CardTitle>
                        <CardDescription className="text-blue-200">{webinar.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center text-sm text-blue-100">
                            <Calendar className="h-4 w-4 mr-2 text-blue-300" />
                            <span>{webinar.date}</span>
                          </div>
                          <div className="flex items-center text-sm text-blue-100">
                            <Users className="h-4 w-4 mr-2 text-blue-300" />
                            <span>Speaker: {webinar.speaker}</span>
                          </div>
                          {webinar.attendees && (
                            <div className="flex items-center text-sm text-blue-100">
                              <Users className="h-4 w-4 mr-2 text-blue-300" />
                              <span>{webinar.attendees} Attendees</span>
                            </div>
                          )}
                          {webinar.videoUrl && (
                            <Button 
                              className="w-full mt-4 flex items-center justify-center bg-transparent border border-blue-300 hover:bg-blue-600 text-blue-100" 
                              variant="outline"
                              onClick={() => window.open(webinar.videoUrl, '_blank')}
                            >
                              <Video className="h-4 w-4 mr-2" />
                              Watch Recording
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-gradient-to-br from-blue-700 to-blue-600 border-0 shadow-xl text-white">
                  <CardContent className="pt-6">
                    <p className="text-center text-blue-200 py-8">
                      No past webinars available.
                    </p>
                  </CardContent>
                </Card>
              )}
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WebinarsPage; 