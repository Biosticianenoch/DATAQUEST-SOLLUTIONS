import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-[#e0f7fa] to-[#b3e5fc] min-h-screen flex flex-col items-center justify-center text-[#0f172a] px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold mb-6">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-[#1976d2] mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="flex items-center gap-2 bg-[#4fc3f7] hover:bg-[#b3e5fc] text-[#0f172a] border-0">
            <ArrowLeft className="h-4 w-4" />
            Go back home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
