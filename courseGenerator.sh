#!/bin/bash

# Set the path to the courses.json file
JSON_FILE="./public/courses.json"

# Set the base directory for the generated folders and files
BASE_DIR="./src/app/courses"

# Read the JSON file
COURSES=$(cat $JSON_FILE)

# Iterate over each course in the JSON
while read -r COURSE_DATA; do
  # Extract the course name and replace spaces with hyphens
  COURSE_NAME=$(echo "$COURSE_DATA" | jq -r '.courseName' | tr ' ' '-')

  # Extract the course code
  COURSE_CODE=$(echo "$COURSE_DATA" | jq -r '.courseCode')

  # Replace spaces in the course name with underscores for the page content
  COURSE_NAME_UNDERSCORE=$(echo "$COURSE_DATA" | jq -r '.courseName' | tr ' ' '_')

  # Create the course folder
  COURSE_DIR="$BASE_DIR/$COURSE_NAME"
  mkdir -p "$COURSE_DIR"

  # Generate the page.tsx file content
  PAGE_CONTENT="'use client';
import React, { useState, useEffect } from 'react';
import CourseGradingForm from '../../../components/CourseGradingForm';
import coursesData from '../../../../public/courses.json';

interface CourseGradingData {
  courseCode: string;
  [key: string]: string | number;
}

const ${COURSE_NAME_UNDERSCORE}Page = () => {
  const courseCode = '${COURSE_CODE}';
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
    <div className=\"min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 text-black\">
      <div className=\"container mx-auto px-4 py-8\">
        <div className=\"bg-white p-6 sm:p-10 rounded-lg shadow-xl border-2 border-gray-300\">
          <div className=\"mb-10\">
            <h2 className=\"text-3xl sm:text-5xl font-bold text-center text-gray-800\">
              {courseData.courseName}
            </h2>
          </div>
          <CourseGradingForm courseData={courseData} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default ${COURSE_NAME_UNDERSCORE}Page;
"

  # Write the page.tsx file
  PAGE_FILE="$COURSE_DIR/page.tsx"
  echo "$PAGE_CONTENT" > "$PAGE_FILE"
done <<< "$(echo "$COURSES" | jq -c '.[]')"