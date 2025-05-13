import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Menu, 
  X, 
  User, 
  ChevronDown,
  LayoutDashboard,
  Users,
  BarChart3,
  FileText,
  Settings,
  BookOpen,
  Calendar,
  MessageSquare,
  HelpCircle,
  Shield,
  Database,
  Activity,
  ClipboardList,
  Briefcase,
  BookMarked,
  Video,
  Home,
  List,
  Grid,
  LogOut,
} from "lucide-react";
import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth-context";
import { UserRole } from "@/lib/roles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Define an interface for navigation links
interface NavLink {
  to: string;
  label: string;
  icon?: React.ReactNode;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, logout } = useAuth();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (searchQuery.trim()) {
        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    } catch (error) {
      toast({
        title: "Search failed",
        description: "There was an error performing the search. Please try again.",
        variant: "destructive",
      });
    }
  }, [searchQuery, navigate, toast]);

  // Public navigation links
  const publicLinks: NavLink[] = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/courses", label: "Courses" },
    { to: "/services", label: "Services" },
    { to: "/consulting", label: "Consulting" },
    { to: "/blog", label: "Blog" },
    { to: "/faq", label: "FAQ" },
    { to: "/contact", label: "Contact" },
  ];

  // Add Resources to common user links since it's accessible to all logged-in users
  const commonUserLinks: NavLink[] = [
    { to: "/resources", label: "Resources" },
  ];

  // Student navigation links
  const studentLinks: NavLink[] = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/assignments", label: "Assignments" },
    { to: "/projects", label: "Projects" },
  ];

  // Client navigation links
  const clientLinks: NavLink[] = [
    { to: "/reports", label: "Reports" },
    { to: "/analytics", label: "Analytics" },
    { to: "/team", label: "Team" },
  ];

  // Admin navigation links organized by category
  const adminLinks: NavLink[] = [
    // Core Admin
    { to: "/admin", label: "Admin" },
    { to: "/analytics", label: "Analytics" },
    { to: "/settings", label: "Settings" }
  ];

  // Get role-specific links
  const getRoleLinks = () => {
    if (!user) return [];
    
    let roleSpecificLinks: NavLink[] = [];
    
    switch (user.role) {
      case UserRole.ADMIN:
        roleSpecificLinks = adminLinks;
        break;
      case UserRole.CLIENT:
        roleSpecificLinks = clientLinks;
        break;
      case UserRole.STUDENT:
        roleSpecificLinks = studentLinks;
        break;
      default:
        roleSpecificLinks = [];
    }
    
    // Return both role-specific links and common user links
    return [...roleSpecificLinks, ...commonUserLinks];
  };

  // User-specific links
  const userLinks = user ? [
    { to: "/courses", label: "Courses" },
    { to: "/projects", label: "Projects" },
    { to: "/resources", label: "Resources" },
    { to: "/profile", label: "Profile" }
  ] : [
    { to: "/login", label: "Login" },
    { to: "/register", label: "Register" },
  ];

  const mainNavItems = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Courses",
      href: "/courses",
    },
    {
      title: "Services",
      href: "/services",
    },
    {
      title: "Resources",
      href: "/resources",
    },
    {
      title: "Consulting",
      href: "/consulting",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "FAQ",
      href: "/faq",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white sticky top-0 z-50 border-b border-blue-700 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2" aria-label="DataQuest Solutions Home">
              <img 
                src="/logo.png" 
                alt="DataQuest Solutions Logo" 
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-white">DataQuest Solutions</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6" aria-label="Main navigation">
            {/* Public Navigation */}
            <div className="flex items-center space-x-6">
              {publicLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-blue-100 hover:text-white transition-colors"
                  aria-label={link.label}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Admin Navigation */}
            {user?.role === UserRole.ADMIN && (
              <div className="flex items-center space-x-6">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-blue-100 hover:text-white hover:bg-blue-800/50">
                      <Shield className="h-5 w-5 mr-2" />
                      Admin
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 bg-gradient-to-br from-blue-800 to-blue-700 border-0 shadow-xl text-white">
                    <DropdownMenuLabel className="text-blue-100">Admin Panel</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-blue-900/40" />
                    
                    {/* Core Admin */}
                    <div className="px-2 py-1.5">
                      <h3 className="text-xs font-semibold text-blue-300 mb-1">Core Admin</h3>
                      {adminLinks.slice(0, 2).map((link) => (
                        <DropdownMenuItem key={link.to} asChild className="text-blue-100 hover:bg-blue-700 hover:text-white cursor-pointer">
                          <Link to={link.to}>
                            {link.icon}
                            <span className="ml-2">{link.label}</span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </div>
                    <DropdownMenuSeparator className="bg-blue-900/40" />
                    
                    {/* Analytics & Reports */}
                    <div className="px-2 py-1.5">
                      <h3 className="text-xs font-semibold text-blue-300 mb-1">Analytics & Reports</h3>
                      {adminLinks.slice(2, 4).map((link) => (
                        <DropdownMenuItem key={link.to} asChild className="text-blue-100 hover:bg-blue-700 hover:text-white cursor-pointer">
                          <Link to={link.to}>
                            {link.icon}
                            <span className="ml-2">{link.label}</span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </div>
                    <DropdownMenuSeparator className="bg-blue-900/40" />
                    
                    {/* User Management */}
                    <div className="px-2 py-1.5">
                      <h3 className="text-xs font-semibold text-blue-300 mb-1">User Management</h3>
                      {adminLinks.slice(4, 6).map((link) => (
                        <DropdownMenuItem key={link.to} asChild className="text-blue-100 hover:bg-blue-700 hover:text-white cursor-pointer">
                          <Link to={link.to}>
                            {link.icon}
                            <span className="ml-2">{link.label}</span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </div>
                    <DropdownMenuSeparator className="bg-blue-900/40" />
                    
                    {/* Content Management */}
                    <div className="px-2 py-1.5">
                      <h3 className="text-xs font-semibold text-blue-300 mb-1">Content Management</h3>
                      {adminLinks.slice(6, 10).map((link) => (
                        <DropdownMenuItem key={link.to} asChild className="text-blue-100 hover:bg-blue-700 hover:text-white cursor-pointer">
                          <Link to={link.to}>
                            {link.icon}
                            <span className="ml-2">{link.label}</span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </div>
                    <DropdownMenuSeparator className="bg-blue-900/40" />
                    
                    {/* Resources & Learning */}
                    <div className="px-2 py-1.5">
                      <h3 className="text-xs font-semibold text-blue-300 mb-1">Resources & Learning</h3>
                      {adminLinks.slice(10, 14).map((link) => (
                        <DropdownMenuItem key={link.to} asChild className="text-blue-100 hover:bg-blue-700 hover:text-white cursor-pointer">
                          <Link to={link.to}>
                            {link.icon}
                            <span className="ml-2">{link.label}</span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </div>
                    <DropdownMenuSeparator className="bg-blue-900/40" />
                    
                    {/* Services & Support */}
                    <div className="px-2 py-1.5">
                      <h3 className="text-xs font-semibold text-blue-300 mb-1">Services & Support</h3>
                      {adminLinks.slice(14, 17).map((link) => (
                        <DropdownMenuItem key={link.to} asChild className="text-blue-100 hover:bg-blue-700 hover:text-white cursor-pointer">
                          <Link to={link.to}>
                            {link.icon}
                            <span className="ml-2">{link.label}</span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </div>
                    <DropdownMenuSeparator className="bg-blue-900/40" />
                    
                    {/* Settings */}
                    <div className="px-2 py-1.5">
                      <h3 className="text-xs font-semibold text-blue-300 mb-1">Settings</h3>
                      {adminLinks.slice(17).map((link) => (
                        <DropdownMenuItem key={link.to} asChild className="text-blue-100 hover:bg-blue-700 hover:text-white cursor-pointer">
                          <Link to={link.to}>
                            {link.icon}
                            <span className="ml-2">{link.label}</span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </nav>

          {/* Search and User Menu */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="text-blue-100 hover:text-white hover:bg-blue-800/50"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-10 w-10 rounded-full bg-blue-400 hover:bg-blue-300 border-2 border-white/20 hover:border-white/40 transition-all"
                      >
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-blue-300 text-blue-900 text-lg font-semibold">
                            {user.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-gradient-to-br from-blue-800 to-blue-700 border-0 shadow-xl text-white">
                      <DropdownMenuLabel className="text-blue-100">
                        My Account
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-blue-900/40" />
                      <DropdownMenuItem asChild className="text-blue-100 hover:bg-blue-700 hover:text-white cursor-pointer">
                        <Link to="/profile">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      {user.role === UserRole.ADMIN && (
                        <DropdownMenuItem asChild className="text-blue-100 hover:bg-blue-700 hover:text-white cursor-pointer">
                          <Link to="/admin">
                            <Users className="mr-2 h-4 w-4" />
                            Admin
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator className="bg-blue-900/40" />
                      <DropdownMenuItem
                        onClick={logout}
                        className="text-blue-100 hover:bg-blue-700 hover:text-white cursor-pointer"
                      >
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button asChild variant="ghost" className="text-blue-100 hover:text-white hover:bg-blue-800/50">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white">
                    <Link to="/register">Register</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-blue-100 hover:text-white hover:bg-blue-800/50"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              {/* Public Links */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-blue-300">Main</h3>
                {publicLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="block py-2 text-blue-100 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Role-specific Links */}
              {user && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-blue-300">
                    {user.role === UserRole.ADMIN ? 'Admin' : 
                     user.role === UserRole.CLIENT ? 'Client' : 'Student'} Features
                  </h3>
                  {getRoleLinks().map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="block py-2 text-blue-100 hover:text-white transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* User Links */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-blue-300">Account</h3>
                {userLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="block py-2 text-blue-100 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Search Dialog */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-blue-900 to-blue-800 text-white border-blue-700">
          <DialogHeader>
            <DialogTitle>Search</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-blue-800/50 border-blue-700 text-white placeholder:text-blue-300"
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-500">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Navbar;
