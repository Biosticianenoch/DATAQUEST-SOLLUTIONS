import { ReactNode } from 'react';
import { Background } from '@/components/ui/background';
import PageHeader from './PageHeader';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  showHeader?: boolean;
}

export const PageLayout = ({ 
  children, 
  title, 
  subtitle, 
  backgroundImage,
  showHeader = true 
}: PageLayoutProps) => {
  return (
    <Background 
      image={backgroundImage || "/images/image (1).jpg"}
      overlayOpacity={0.85}
    >
      <div className="container mx-auto py-8">
        <div className="max-w-7xl mx-auto">
          {showHeader && title && (
            <PageHeader 
              title={title}
              subtitle={subtitle}
              backgroundImage={backgroundImage}
            />
          )}
          {children}
        </div>
      </div>
    </Background>
  );
}; 