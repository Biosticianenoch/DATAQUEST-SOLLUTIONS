import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/lib/roles';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LoginPage: React.FC = () => {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Get the redirect path from location state if available
  const from = location.state?.from || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    try {
      await login(email, password, role);
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      // Redirect to the original intended destination
      navigate(from);
    } catch (err: any) {
      const errorMessage = err?.response?.data?.error || err.message || 'Login failed';
      const errorDetails = err?.response?.data?.details;
      setFormError(errorMessage);
      
      // Show toast for specific error cases
      if (errorMessage.includes('Invalid role')) {
        toast({
          title: "Invalid Role",
          description: errorDetails || "Please select the correct role for your account.",
          variant: "destructive",
        });
      } else if (errorMessage.includes('Invalid email or password')) {
        toast({
          title: "Login Failed",
          description: "Please check your email and password.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login Failed",
          description: errorDetails || "An error occurred during login. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#e0f7fa] to-blue-500 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md bg-gradient-to-br from-blue-800 to-[#b3e5fc] border-0 shadow-xl text-[#0f172a]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#0f172a] text-center">Welcome Back</CardTitle>
          <CardDescription className="text-[#0288d1] text-center">Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#1976d2]">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
                className="bg-[#b3e5fc]/30 border-blue-700 text-[#0f172a] placeholder:text-[#4fc3f7]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#1976d2]">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="bg-[#b3e5fc]/30 border-blue-700 text-[#0f172a] placeholder:text-[#4fc3f7]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role" className="text-[#1976d2]">Role</Label>
              <Select
                value={role}
                onValueChange={(value) => setRole(value as UserRole)}
              >
                <SelectTrigger className="bg-[#b3e5fc]/30 border-blue-700 text-[#0f172a]">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent className="bg-[#e0f7fa] border-blue-700 text-[#0f172a]">
                  <SelectItem value={UserRole.ADMIN} className="focus:bg-[#4fc3f7] focus:text-[#0f172a]">Admin</SelectItem>
                  <SelectItem value={UserRole.STUDENT} className="focus:bg-[#4fc3f7] focus:text-[#0f172a]">Student</SelectItem>
                  <SelectItem value={UserRole.CLIENT} className="focus:bg-[#4fc3f7] focus:text-[#0f172a]">Client</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {(formError || error) && (
              <div className="text-red-300 text-sm mt-2">{formError || error}</div>
            )}
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-400 text-[#0f172a] mt-4"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
            <div className="text-center text-sm mt-4 text-[#0288d1]">
              Don't have an account?{' '}
              <a href="/register" className="text-[#4fc3f7] underline hover:text-[#1976d2]">Register</a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
