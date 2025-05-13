import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { UserRole } from '@/lib/roles';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from '@/components/ui/use-toast';

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const RegisterPage: React.FC = () => {
  const { register, isLoading, error } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [formError, setFormError] = useState<string | null>(null);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!captchaValue) {
      setFormError('Please complete the CAPTCHA verification');
      return;
    }

    try {
      await register({ name, email, password, role });
      toast({
        title: "Registration successful",
        description: "Please log in with your new account.",
      });
      navigate('/login');
    } catch (err: any) {
      const errorMessage = err?.response?.data?.error || err.message || 'Registration failed';
      setFormError(errorMessage);
      
      // Show toast for specific error cases
      if (errorMessage.includes('Email already registered')) {
        toast({
          title: "Email already in use",
          description: "This email address is already registered. Please use a different email or try logging in.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Registration failed",
          description: "Please check your details and try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-900 to-blue-500 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md bg-gradient-to-br from-blue-800 to-blue-700 border-0 shadow-xl text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white text-center">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-blue-100">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                autoFocus
                className="bg-blue-900/30 border-blue-700 text-white placeholder:text-blue-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-100">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="bg-blue-900/30 border-blue-700 text-white placeholder:text-blue-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-blue-100">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="bg-blue-900/30 border-blue-700 text-white placeholder:text-blue-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role" className="text-blue-100">Role</Label>
              <Select
                value={role}
                onValueChange={(value) => setRole(value as UserRole)}
              >
                <SelectTrigger className="bg-blue-900/30 border-blue-700 text-white">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent className="bg-blue-800 border-blue-700 text-white">
                  <SelectItem value={UserRole.STUDENT} className="focus:bg-blue-700 focus:text-white">Student</SelectItem>
                  <SelectItem value={UserRole.CLIENT} className="focus:bg-blue-700 focus:text-white">Client</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-center mt-4 bg-blue-900/20 p-4 rounded-lg">
              <ReCAPTCHA
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={(value: string | null) => setCaptchaValue(value)}
                theme="dark"
              />
            </div>
            {(formError || error) && (
              <div className="text-red-300 text-sm mt-2">{formError || error}</div>
            )}
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-400 text-white mt-4"
              disabled={isLoading || !captchaValue}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
            <div className="text-center text-sm mt-4 text-blue-200">
              Already have an account?{' '}
              <a href="/login" className="text-blue-300 underline hover:text-blue-100">Login</a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
