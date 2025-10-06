import { BookOpen } from 'lucide-react';
import { Course } from '../types';

interface HomePageProps {
  courses: Course[];
  onCourseClick: (courseId: number) => void;
}

export function HomePage({ courses, onCourseClick }: HomePageProps) {
  const completedCount = courses.filter(c => c.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-slate-900">LearnHub</h1>
          </div>
          <p className="mt-2 text-slate-600">Your journey to mastery starts here</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Available Courses</h2>
          <p className="text-slate-600">
            {completedCount} of {courses.length} courses completed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              onClick={() => onCourseClick(course.id)}
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-300"
            >
              <div className="relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                {course.completed && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Completed
                  </div>
                )}
                <div className="absolute bottom-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {course.level}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {course.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                  <span>By {course.instructor}</span>
                  <span>{course.duration}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    {course.lessons.length} lessons
                  </span>
                  <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                    View Course →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
