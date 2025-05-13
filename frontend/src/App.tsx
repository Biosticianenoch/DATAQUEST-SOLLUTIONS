import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import FAQPage from "@/pages/FAQPage";
import CaseStudiesPage from "@/pages/CaseStudiesPage";
import { AuthProvider } from "@/lib/auth-context";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";
import ForbiddenPage from "./pages/ForbiddenPage";
import CoursesPage from "./pages/CoursesPage";
import { TeamsPage } from "./pages/TeamsPage";
import TeamPage from "./pages/TeamPage";
import ServicesPage from "./pages/ServicesPage";
import BlogPage from "./pages/BlogPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AdminPage from "./pages/AdminPage";
import ProjectsPage from "./pages/ProjectsPage";
import { ReportsPage } from "./pages/ReportsPage";
import { AssignmentsPage } from "./pages/AssignmentsPage";
import SearchPage from './pages/SearchPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { PaymentPage } from "./pages/PaymentPage";
import ProfilePage from "./pages/ProfilePage";
import ResourcesPage from "./pages/ResourcesPage";
import WebinarsPage from "./pages/WebinarsPage";
import ConsultingPage from "./pages/ConsultingPage";
import { useEffect } from 'react';
import { Web3Provider } from './contexts/Web3Context';
import { useWeb3 } from './contexts/Web3Context';
import { useToken } from './hooks/useToken';
import { useCertificates } from './hooks/useCertificates';
import { useCourses } from './hooks/useCourses';

const queryClient = new QueryClient();

function AppContent() {
  const { account, connect, disconnect, isConnecting, error: web3Error } = useWeb3();
  const { balance, stakedAmount, reward, stake, unstake } = useToken();
  const { certificates, fetchCertificates } = useCertificates();
  const { courses, fetchCourses } = useCourses();

  useEffect(() => {
    if (account) {
      fetchCertificates();
      fetchCourses();
    }
  }, [account, fetchCertificates, fetchCourses]);

  if (!account) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Welcome to DataQuest</h1>
          <p className="mb-4">Connect your wallet to get started</p>
          <button
            onClick={connect}
            disabled={isConnecting}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
          {web3Error && <p className="text-red-500 mt-2">{web3Error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">DataQuest</h1>
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <p>Balance: {balance} DQT</p>
              <p>Staked: {stakedAmount} DQT</p>
              <p>Rewards: {reward} DQT</p>
            </div>
            <button
              onClick={disconnect}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Disconnect
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Staking</h2>
            <div className="space-y-4">
              <input
                type="number"
                placeholder="Amount to stake"
                className="w-full p-2 border rounded"
              />
              <button
                onClick={() => stake('100')}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Stake
              </button>
              <button
                onClick={unstake}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Unstake
              </button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Certificates</h2>
            <div className="space-y-2">
              {certificates.map((cert) => (
                <div key={cert.id} className="border p-2 rounded">
                  <p>Course ID: {cert.courseId}</p>
                  <p>Token ID: {cert.id}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Available Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {courses.map((course, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <p>Creator: {course.creator}</p>
                <p>Price: {course.price} DQT</p>
                <p>Status: {course.active ? 'Active' : 'Inactive'}</p>
                <p>Revenue Share: {course.revenueShare}%</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Web3Provider>
          <AppContent />
        </Web3Provider>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
