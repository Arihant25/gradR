'use client';
import React, { useState, useEffect } from 'react';
import CourseGradingForm from '../../../components/CourseGradingForm';
import coursesData from '../../../../public/courses.json';

interface CourseGradingData {
  courseCode: string;
  [key: string]: string | number;
}

const Introduction_to_Linguistics_2__Semantics__Pragmatics_and_DiscoursePage = () => {
  const courseCode = 'CL1-102';
  const courseData = coursesData.find((course) => course.courseCode === courseCode);
  const [gradingData, setGradingData] = useState<CourseGradingData[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem('gradingData');
    if (storedData) {
      setGradingData(JSON.parse(storedData));
    }
  }, []);

  const handleSubmit = (data: CourseGradingData) => {
    const updatedData = [...gradingData];
    const existingIndex = updatedData.findIndex((item) => item.courseCode === data.courseCode);

    if (existingIndex !== -1) {
      updatedData[existingIndex] = data;
    } else {
      updatedData.push(data);
    }

    setGradingData(updatedData);
    localStorage.setItem('gradingData', JSON.stringify(updatedData));
  };

  if (!courseData) {
    return <div>Course not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 text-black">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 sm:p-10 rounded-lg shadow-xl border-2 border-gray-300">
          <div className="mb-10">
            <h2 className="text-3xl sm:text-5xl font-bold text-center text-gray-800">
              {courseData.courseName}
            </h2>
          </div>
          <CourseGradingForm courseData={courseData} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Introduction_to_Linguistics_2__Semantics__Pragmatics_and_DiscoursePage;

