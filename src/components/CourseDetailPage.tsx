import { ArrowLeft, CheckCircle2, Circle, Clock, Award } from 'lucide-react';
import { Course } from '../types';

interface CourseDetailPageProps {
  course: Course;
  onBack: () => void;
  onToggleLesson: (lessonId: number) => void;
  onCompleteCourse: () => void;
}

export function CourseDetailPage({
  course,
  onBack,
  onToggleLesson,
  onCompleteCourse,
}: CourseDetailPageProps) {
  const completedLessons = course.lessons.filter(l => l.completed).length;
  const progress = (completedLessons / course.lessons.length) * 100;
  const allLessonsCompleted = completedLessons === course.lessons.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Courses</span>
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-64 object-cover"
          />

          <div className="p-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  {course.title}
                </h1>
                <p className="text-slate-600 mb-4">{course.description}</p>
              </div>
              {course.completed && (
                <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg">
                  <Award className="w-5 h-5" />
                  <span className="font-medium">Completed</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-slate-600 mb-6">
              <div className="flex items-center gap-2">
                <span className="font-medium">Instructor:</span>
                <span>{course.instructor}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                  {course.level}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">
                  Progress: {completedLessons} of {course.lessons.length} lessons
                </span>
                <span className="text-sm font-medium text-slate-700">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-blue-600 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {allLessonsCompleted && !course.completed && (
              <button
                onClick={onCompleteCourse}
                className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-all duration-300 hover:shadow-lg transform hover:scale-105 mb-6"
              >
                Mark Course as Completed
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Course Lessons</h2>

          <div className="space-y-3">
            {course.lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                onClick={() => onToggleLesson(lesson.id)}
                className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                  lesson.completed
                    ? 'bg-green-50 border-green-200 hover:border-green-300 hover:shadow-md'
                    : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <div className="flex-shrink-0">
                  {lesson.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  ) : (
                    <Circle className="w-6 h-6 text-slate-400" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-medium text-slate-500">
                      Lesson {index + 1}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500">{lesson.duration}</span>
                  </div>
                  <h3
                    className={`font-semibold ${
                      lesson.completed ? 'text-slate-700' : 'text-slate-900'
                    }`}
                  >
                    {lesson.title}
                  </h3>
                </div>

                <div className="flex-shrink-0">
                  <button
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                      lesson.completed
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
                    }`}
                  >
                    {lesson.completed ? 'Completed' : 'Start Lesson'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
