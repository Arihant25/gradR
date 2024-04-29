'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import courses from '../../../public/courses.json';

interface Course {
  courseCode: string;
  courseName: string;
  courseSubject: string;
  courseCredits: number;
  courseSemester: string;
  courseDuration: string;
  courseDescription: string;
  coursePrerequisites: string;
  courseGradingPolicy: object;
}

interface ColorClasses {
  [key: string]: string;
}

const colorClasses: ColorClasses = {
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  indigo: 'bg-indigo-500',
  purple: 'bg-purple-500',
  pink: 'bg-pink-500',
  gray: 'bg-gray-500',
  teal: 'bg-teal-500',
  orange: 'bg-orange-500',
  sky: 'bg-sky-500',
  lime: 'bg-lime-500',
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  rose: 'bg-rose-500'
};

const SEMPage: React.FC = () => {
  const [currentSemester, setCurrentSemester] = useState<string>('Sem 1-1');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [semesterCourses, setSemesterCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (courses) {
      console.log(courses);
      const semesterNumber = calculateSemesterNumber(currentSemester);
      console.log('semesterNumber:', semesterNumber);
      const filteredCourses = courses.filter((course: Course) => {
        console.log('course.courseSemester:', course.courseSemester);
        return course.courseSemester === semesterNumber.toString();
      });
      console.log('filteredCourses:', filteredCourses);
      setSemesterCourses(filteredCourses);
    }
  }, [currentSemester]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const selectSemester = (semester: string) => {
    setCurrentSemester(semester);
    setShowDropdown(false);
  };

  const generateSemesters = (): string[] => {
    const semesters = [];
    for (let i = 1; i <= 4; i++) {
      for (let j = 1; j <= 2; j++) {
        semesters.push(`Sem ${i}-${j}`);
      }
    }
    return semesters;
  };

  const calculateSemesterNumber = (semester: string): number => {
    const semesterParts = semester.split('-');
    const semesterYear = parseInt(semesterParts[0].slice(-1));
    const semesterTerm = parseInt(semesterParts[1]);
    return (semesterYear - 1) * 2 + semesterTerm;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <header className="bg-gradient-to-r from-indigo-600 to-blue-500 py-6 shadow-lg">
        <div className="container mx-auto flex justify-center relative">
          <div
            className="flex items-center text-xl sm:text-3xl lg:text-5xl font-semibold cursor-pointer text-white shadow-md bg-gradient-to-r from-indigo-700 to-blue-600 rounded-lg px-6 py-4"
            onClick={toggleDropdown}
          >
            {currentSemester}
            <div className="ml-2 cursor-pointer" onClick={toggleDropdown}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 sm:h-8 w-6 sm:w-8">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {showDropdown && (
            <div className="absolute top-20 bg-white rounded-lg shadow-xl z-10 text-black text-center border-2 border-gray-300">
              {generateSemesters().map((semester) => (
                <div
                  key={semester}
                  className="py-3 px-8 text-sm sm:text-3xl hover:bg-gray-100 cursor-pointer border-b-2 border-gray-300 last:border-b-0"
                  onClick={() => selectSemester(semester)}
                >
                  {semester}
                </div>
              ))}
            </div>
          )}
        </div>
      </header>
      <main className="container mx-auto py-10 px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center">
          {semesterCourses.map((course) => (
            <Link href={`courses/${course.courseName.replace(/\s/g, '-')}`} key={course.courseCode}>
              <div
                className={`${colorClasses[course.color]} rounded- rounded-lg shadow-xl p-6 sm:p-8 cursor-pointer flex justify-center items-center hover:scale-105 hover:shadow-2xl transition duration-200 h-full border-2 border-gray-300 transform-gpu rotate-x-12`}
              >
                <h3 className="text-lg sm:text-2xl font-semibold text-gray-900">{course.courseName}</h3>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SEMPage;