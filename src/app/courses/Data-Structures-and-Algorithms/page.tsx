import React from 'react';
import NavBar from '../../../components/Navbar';
import CourseGradingForm from '../../../components/CourseGradingForm';
import coursesData from '../../../../public/courses.json';

const DSAPage = () => {
  const courseCode = 'CS1.201'; // Replace with the actual course code for the page
  const courseData = coursesData.find((course) => course.courseCode === courseCode);

  if (!courseData) {
    return <div>Course not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 text-black">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 sm:p-10 rounded-lg shadow-xl border-2 border-gray-300">
          <div className="mb-10">
            <h2 className="text-3xl sm:text-5xl font-bold text-center text-gray-800">
              {courseData.courseName}
            </h2>
          </div>
          <CourseGradingForm courseData={courseData} />
        </div>
      </div>
    </div>
  );
};

export default DSAPage;