import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  category?: string;
  date?: string;
}

// Sample search results data
const searchableContent = [
  {
    id: '1',
    title: 'Data Analysis with SPSS',
    description: 'Learn the fundamentals of data analysis using SPSS, a widely used software in research and statistical analysis.',
    url: '/courses',
    category: 'Courses',
    date: '2024-03-15'
  },
  {
    id: '2',
    title: 'Data Collection',
    description: 'Professional data collection services using tools like ODK, CommCare, and KOBO for field research.',
    url: '/services',
    category: 'Services',
    date: '2024-03-10'
  },
  {
    id: '3',
    title: 'Machine Learning with Python',
    description: 'Comprehensive course on machine learning using Python, covering both supervised and unsupervised learning.',
    url: '/courses',
    category: 'Courses',
    date: '2024-03-05'
  },
  {
    id: '4',
    title: 'Data Analysis',
    description: 'In today\'s data-driven world, timely and accurate insights are critical for success. We empower researchers, students, businesses, and institutions to make informed decisions through precise and comprehensive data analysis.',
    url: '/services',
    category: 'Services',
    date: '2024-03-01'
  },
  {
    id: '5',
    title: 'Science Research Writing',
    description: 'High-quality scientific research writing services designed to support researchers, scholars, and institutions in producing well-structured, publication-ready manuscripts and reports.',
    url: '/services',
    category: 'Services',
    date: '2024-02-28'
  },
  {
    id: '6',
    title: 'Graphic Design',
    description: 'Powerful design services tailored to help individuals, businesses, and organizations stand out with creativity, consistency, and purpose.',
    url: '/services',
    category: 'Services',
    date: '2024-02-25'
  },
  {
    id: '7',
    title: 'Web Development',
    description: 'Modern, responsive, and functional websites that deliver real results for your business or organization.',
    url: '/services',
    category: 'Services',
    date: '2024-02-20'
  },
  {
    id: '8',
    title: 'Data Analysis with R',
    description: 'Learn data analysis using R, a powerful programming language for statistical computing and graphics.',
    url: '/courses',
    category: 'Courses',
    date: '2024-02-15'
  },
  {
    id: '9',
    title: 'Spatial Analysis with R',
    description: 'Master spatial data analysis using R for geographic data analysis and visualization.',
    url: '/courses',
    category: 'Courses',
    date: '2024-02-10'
  },
  {
    id: '10',
    title: 'Time Series and Forecasting',
    description: 'Learn time series analysis and forecasting methods for analyzing temporal data and making predictions.',
    url: '/courses',
    category: 'Courses',
    date: '2024-02-05'
  }
];

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = (searchTerm: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Perform local search
      const searchResults = searchableContent.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(searchResults);
    } catch (err) {
      console.error("Search error:", err);
      setError("An error occurred while searching. Please try again.");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-blue-900 to-blue-500 min-h-screen text-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">Search</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Find courses, services, and resources to help you achieve your goals
              </p>
            </div>
            
            <form onSubmit={handleSearch} className="mb-12">
              <div className="flex max-w-3xl mx-auto">
                <div className="relative flex-grow">
                  <Input
                    type="text"
                    placeholder="Search for courses, services, or resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-6 text-lg bg-blue-900/40 border-blue-700 text-white placeholder:text-blue-300 focus-visible:ring-blue-400 rounded-l-lg"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-blue-300" />
                </div>
                <Button 
                  type="submit" 
                  className="rounded-l-none px-8 py-6 text-lg bg-blue-700 hover:bg-blue-600"
                >
                  Search
                </Button>
              </div>
            </form>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-12 w-12 text-blue-300 animate-spin" />
              </div>
            ) : error ? (
              <div className="text-red-400 text-center py-8 bg-red-900/20 rounded-lg">
                {error}
              </div>
            ) : query ? (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-semibold text-white">
                    {results.length === 0
                      ? `No results found for "${query}"`
                      : `Search results for "${query}"`}
                  </h2>
                  {results.length > 0 && (
                    <div className="text-blue-200">
                      {results.length} {results.length === 1 ? 'result' : 'results'} found
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  {results.map((result) => (
                    <div 
                      key={result.id} 
                      className="bg-gradient-to-br from-blue-800 to-blue-700 rounded-lg p-6 shadow-xl hover:shadow-2xl transition-shadow duration-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-grow">
                          <Link
                            to={result.url}
                            className="text-2xl font-semibold text-white hover:text-blue-200 transition-colors duration-200"
                          >
                            {result.title}
                          </Link>
                          <div className="mt-2 flex items-center space-x-4">
                            <span className="px-3 py-1 bg-blue-900/50 text-blue-200 rounded-full text-sm">
                              {result.category}
                            </span>
                            {result.date && (
                              <span className="text-blue-300 text-sm">
                                {new Date(result.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                            )}
                          </div>
                          <p className="mt-4 text-blue-100 leading-relaxed">
                            {result.description}
                          </p>
                        </div>
                        <div className="ml-6">
                          <Button
                            asChild
                            className="bg-blue-600 hover:bg-blue-500 text-white px-6"
                          >
                            <Link to={result.url}>
                              {result.category === 'Courses' ? 'View Course' : 'View Service'}
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-16 bg-blue-900/40 rounded-lg">
                <Search className="h-16 w-16 text-blue-300 mx-auto mb-6" />
                <h3 className="text-2xl font-medium text-white mb-4">Start Your Search</h3>
                <p className="text-blue-200 max-w-2xl mx-auto">
                  Search for courses, services, or resources to help you achieve your goals.
                  Our platform offers a wide range of data science and analytics solutions.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage; 