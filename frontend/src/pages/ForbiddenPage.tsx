import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Lock, ArrowLeft } from 'lucide-react';

const ForbiddenPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-[#e0f7fa] to-[#b3e5fc] min-h-screen flex flex-col items-center justify-center text-[#0f172a] px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <Lock className="h-16 w-16 text-[#4fc3f7]" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
        <p className="text-[#0f172a] mb-8">
          You don't have permission to access this page. Please contact your administrator if you believe this is an error.
        </p>
        <Link to="/">
          <Button className="flex items-center gap-2 bg-[#4fc3f7] hover:bg-[#b3e5fc] text-[#0f172a] border-0">
            <ArrowLeft className="h-4 w-4" />
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ForbiddenPage;
