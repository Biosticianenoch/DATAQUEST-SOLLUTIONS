import { useState, useEffect } from "react";
import { useAuth } from '@/lib/auth-context';
import { Navigate } from 'react-router-dom';
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  User,
  Mail,
  Lock,
  Save,
  X,
  Shield,
  Calendar,
  MapPin,
  Phone,
  Briefcase
} from "lucide-react";

const ProfilePage = () => {
  const { isAuthenticated, isLoading, user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    occupation: '',
    bio: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        occupation: user.occupation || '',
        bio: user.bio || ''
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <Layout>
      <div className="bg-gradient-to-b from-[#e0f7fa] to-[#b3e5fc] min-h-screen text-[#0f172a] py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-[#0f172a] mb-4">Profile</h1>
              <p className="text-xl text-[#0288d1]">
                Manage your account information and preferences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Profile Overview */}
              <Card className="bg-gradient-to-br from-[#e0f7fa] to-[#b3e5fc] border-0 shadow-xl text-[#0f172a]">
                <CardHeader>
                  <CardTitle className="text-[#0f172a]">Profile Overview</CardTitle>
                  <CardDescription className="text-[#0288d1]">Your account information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#b3e5fc] text-[#4fc3f7] p-2 rounded-full">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#1976d2]">Account Type</p>
                        <p className="text-sm text-[#4fc3f7] capitalize">{user?.role || 'User'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-[#b3e5fc] text-[#4fc3f7] p-2 rounded-full">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#1976d2]">Member Since</p>
                        <p className="text-sm text-[#4fc3f7]">
                          {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-[#b3e5fc] text-[#4fc3f7] p-2 rounded-full">
                        <Shield className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#1976d2]">Account Status</p>
                        <p className="text-sm text-[#4fc3f7]">Active</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Profile Form */}
              <Card className="bg-gradient-to-br from-[#e0f7fa] to-[#b3e5fc] border-0 shadow-xl text-[#0f172a] md:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-[#0f172a]">Personal Information</CardTitle>
                    <CardDescription className="text-[#0288d1]">Update your profile details</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                    className="border-[#4fc3f7] text-[#1976d2] hover:bg-[#b3e5fc] hover:text-[#0f172a]"
                  >
                    {isEditing ? (
                      <>
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </>
                    ) : (
                      <>
                        <User className="mr-2 h-4 w-4" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-[#1976d2]">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-[#4fc3f7]" />
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="pl-9 bg-[#b3e5fc]/40 border-[#4fc3f7] text-[#0f172a] placeholder:text-[#4fc3f7]"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[#1976d2]">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-[#4fc3f7]" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="pl-9 bg-[#b3e5fc]/40 border-[#4fc3f7] text-[#0f172a] placeholder:text-[#4fc3f7]"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-[#1976d2]">Phone</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-[#4fc3f7]" />
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="pl-9 bg-[#b3e5fc]/40 border-[#4fc3f7] text-[#0f172a] placeholder:text-[#4fc3f7]"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location" className="text-[#1976d2]">Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-[#4fc3f7]" />
                          <Input
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="pl-9 bg-[#b3e5fc]/40 border-[#4fc3f7] text-[#0f172a] placeholder:text-[#4fc3f7]"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="occupation" className="text-[#1976d2]">Occupation</Label>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-3 h-4 w-4 text-[#4fc3f7]" />
                          <Input
                            id="occupation"
                            name="occupation"
                            value={formData.occupation}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="pl-9 bg-[#b3e5fc]/40 border-[#4fc3f7] text-[#0f172a] placeholder:text-[#4fc3f7]"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-[#1976d2]">Bio</Label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full min-h-[100px] p-3 rounded-md bg-[#b3e5fc]/40 border-[#4fc3f7] text-[#0f172a] placeholder:text-[#4fc3f7]"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                    {isEditing && (
                      <div className="flex justify-end gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                          className="border-[#4fc3f7] text-[#1976d2] hover:bg-[#b3e5fc] hover:text-[#0f172a]"
                        >
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-[#4fc3f7] hover:bg-[#b3e5fc] text-[#0f172a]">
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Security Settings */}
            <Card className="bg-gradient-to-br from-[#e0f7fa] to-[#b3e5fc] border-0 shadow-xl text-[#0f172a] mt-6">
              <CardHeader>
                <CardTitle className="text-[#0f172a]">Security Settings</CardTitle>
                <CardDescription className="text-[#0288d1]">Manage your account security</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#b3e5fc] text-[#4fc3f7] p-2 rounded-full">
                        <Lock className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-[#1976d2]">Password</p>
                        <p className="text-sm text-[#4fc3f7]">Last changed 30 days ago</p>
                      </div>
                    </div>
                    <Button variant="outline" className="border-[#4fc3f7] text-[#1976d2] hover:bg-[#b3e5fc] hover:text-[#0f172a]">
                      Change Password
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

export default ProfilePage; 