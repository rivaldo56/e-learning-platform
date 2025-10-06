export interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  lessons: Lesson[];
  completed: boolean;
  thumbnail: string;
}
