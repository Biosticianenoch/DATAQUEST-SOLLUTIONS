import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Course } from "@/types/course";
import { CourseDetailSkeleton } from "@/components/courses/CourseDetailSkeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export const CourseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) {
        setError('Course ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_URL}/api/courses/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch course details');
        }
        const data = await response.json();
        setCourse(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching the course');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleDownload = async () => {
    if (!course?.id) return;

    try {
      setIsDownloading(true);
      const response = await fetch(`${API_URL}/api/courses/${course.id}/pdf`);
      if (!response.ok) throw new Error('Failed to download PDF');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${course.title || 'course'}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download PDF. Please try again later.');
    } finally {
      setIsDownloading(false);
    }
  };

  if (loading) {
    return <CourseDetailSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!course) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Course not found</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="bg-[#e0f7fa] text-[#0f172a] rounded-lg shadow-lg p-8">
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <div className="flex items-center gap-4">
            <span className="text-[#1976d2]">{course.category}</span>
            <span className="text-[#1976d2]">{course.level}</span>
            <span className="text-[#1976d2]">{course.duration}</span>
          </div>
        </div>
        <Button onClick={handleDownload} disabled={isDownloading}>
          <FileText className="w-4 h-4 mr-2" />
          {isDownloading ? "Downloading..." : "Download PDF"}
        </Button>
      </div>

      <div className="prose max-w-none mb-8">
        <h2 className="text-xl font-semibold mb-4">Description</h2>
        <p>{course.description}</p>
      </div>

      {course.objectives && course.objectives.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Learning Objectives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course.objectives.map((objective, index) => (
              <div key={index} className="flex items-start gap-2">
                <span>•</span>
                <span>{objective}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {course.skills && course.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Skills You'll Gain</h2>
          <div className="flex flex-wrap gap-2">
            {course.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[#4fc3f7] text-[#0f172a] rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-6 border-t">
        <div>
          <p className="font-semibold mb-1">Instructor</p>
          <p className="text-[#1976d2]">{course.instructor || 'DataQuest Team'}</p>
        </div>
        <Button variant="default">Start Learning</Button>
      </div>
    </div>
  );
};
