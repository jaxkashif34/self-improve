// Quiz: Implement if we provide one property then other property should not be allowed or vice versa
// Implementation
type CourseBase = {
  name: string;
};

type FreeCourse = CourseBase & {
  youtube: string;
  price?: never;
};

type PaidCourse = CourseBase & {
  youtube?: never;
  price: number;
};

type Course = PaidCourse | FreeCourse;

const course: Course = {
  price: 23,
  name: 'Lean TypeScript',
  // youtube: "http://youtube.com"
};
