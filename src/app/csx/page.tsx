'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import courses from './courses.json';

interface Course {
  name: string;
  semester: string;
  color: string;
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

const getCurrentSemester = (): string => {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  let sem;
  if (month >= 1 && month <= 6) {
    sem = 'Sem 1-2';
  } else {
    sem = 'Sem 2-1';
  }
  return `${sem} ${year}`;
};

const CSXPage: React.FC = () => {
  const [currentSemester, setCurrentSemester] = useState<string>(getCurrentSemester());
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [semesterCourses, setSemesterCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (courses) {
      const filteredCourses = courses.filter((course: Course) => course.semester === currentSemester);
      setSemesterCourses(filteredCourses);
    }
  }, [currentSemester, courses]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const selectSemester = (semester: string) => {
    setCurrentSemester(semester);
    setShowDropdown(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-indigo-600 py-4">
        <div className="container mx-auto flex justify-center relative">
          <div className="flex items-center text-xl sm:text-3xl lg:text-5xl font-semibold cursor-pointer text-white" onClick={toggleDropdown}>
            {currentSemester}
            <div className="ml-2 cursor-pointer" onClick={toggleDropdown}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 sm:h-8 w-6 sm:w-8">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {showDropdown && (
            <div className="absolute top-16 bg-white rounded-md shadow-lg z-10 text-black text-center">
              <div className="py-2 px-6 text-sm sm:text-3xl hover:bg-gray-100 cursor-pointer" onClick={() => selectSemester('Sem 1-2 2024')}>
                Sem 1-2 2024
              </div>
              <div className="py-2 px-6 text-sm sm:text-3xl hover:bg-gray-100 cursor-pointer" onClick={() => selectSemester('Sem 2-1 2024')}>
                Sem 2-1 2024
              </div>
              <div className="py-2 px-6 text-sm sm:text-3xl hover:bg-gray-100 cursor-pointer" onClick={() => selectSemester('Sem 2-2 2025')}>
                Sem 2-2 2025
              </div>
              <div className="py-2 px-6 text-sm sm:text-3xl hover:bg-gray-100 cursor-pointer" onClick={() => selectSemester('Sem 3-1 2025')}>
                Sem 3-1 2025
              </div>
              <div className="py-2 px-6 text-sm sm:text-3xl hover:bg-gray-100 cursor-pointer" onClick={() => selectSemester('Sem 3-2 2026')}>
                Sem 3-2 2026
              </div>
              <div className="py-2 px-6 text-sm sm:text-3xl hover:bg-gray-100 cursor-pointer" onClick={() => selectSemester('Sem 4-1 2026')}>
                Sem 4-1 2026
              </div>
              <div className="py-2 px-6 text-sm sm:text-3xl hover:bg-gray-100 cursor-pointer" onClick={() => selectSemester('Sem 4-2 2027')}>
                Sem 4-2 2027
              </div>
            </div>
          )}
        </div>
      </header>
      <main className="container mx-auto py-8 px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center">
          {semesterCourses.map((course) => (
            <Link href={"courses/" + course.name.replace(/\s/g, '-')} key={course.name}>
              <div
                className={`${colorClasses[course.color]} rounded-lg shadow-md p-4 sm:p-6 cursor-pointer flex justify-center items-center hover:scale-105 hover:drop-shadow-lg transition duration-200 h-full`}
              >
                <h3 className="text-lg sm:text-2xl font-semibold">{course.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CSXPage;