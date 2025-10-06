import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { CourseDetailPage } from './components/CourseDetailPage';
import { coursesData } from './data/courses';
import { Course } from './types';

function App() {
  const [courses, setCourses] = useState<Course[]>(coursesData);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  const handleCourseClick = (courseId: number) => {
    setSelectedCourseId(courseId);
  };

  const handleBack = () => {
    setSelectedCourseId(null);
  };

  const handleToggleLesson = (courseId: number, lessonId: number) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              lessons: course.lessons.map((lesson) =>
                lesson.id === lessonId
                  ? { ...lesson, completed: !lesson.completed }
                  : lesson
              ),
            }
          : course
      )
    );
  };

  const handleCompleteCourse = (courseId: number) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId ? { ...course, completed: true } : course
      )
    );
  };

  const selectedCourse = courses.find((c) => c.id === selectedCourseId);

  if (selectedCourse) {
    return (
      <CourseDetailPage
        course={selectedCourse}
        onBack={handleBack}
        onToggleLesson={(lessonId) => handleToggleLesson(selectedCourse.id, lessonId)}
        onCompleteCourse={() => handleCompleteCourse(selectedCourse.id)}
      />
    );
  }

  return <HomePage courses={courses} onCourseClick={handleCourseClick} />;
}

export default App;
