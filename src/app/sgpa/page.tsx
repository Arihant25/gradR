'use client';
import React, { useState } from 'react';
import courses from '../../../public/courses.json';

const SGPACalculatorPage = () => {
    const [selectedCourses, setSelectedCourses] = useState([]);

    const addCourse = () => {
        setSelectedCourses([...selectedCourses, { course: null, grade: 'Select Grade', searchTerm: '' }]);
    };

    const updateCourse = (index, field, value) => {
        const updatedCourses = [...selectedCourses];
        updatedCourses[index][field] = value;
        setSelectedCourses(updatedCourses);
    };

    const calculateSGPA = () => {
        let totalCredits = 0;
        let totalGradePoints = 0;

        selectedCourses.forEach(({ course, grade }) => {
            if (course) {
                const creditPoints = course.courseCredits * getGradePoint(grade);
                totalGradePoints += creditPoints;
                totalCredits += course.courseCredits;
            }
        });

        if (totalCredits === 0) {
            return 0;
        }

        const sgpa = totalGradePoints / totalCredits;
        return sgpa.toFixed(2);
    };

    const getGradePoint = (grade) => {
        switch (grade) {
            case 'A':
                return 10;
            case 'A-':
                return 9;
            case 'B':
                return 8;
            case 'B-':
                return 7;
            case 'C':
                return 6;
            case 'C-':
                return 5;
            case 'D':
                return 4;
            case 'F':
                return 0;
            default:
                return 0;
        }
    };

    const showInstructions = () => {
        alert(
            'Instructions:\n\n1. Click the "Add Course" button to add a new course to the list.\n2. Search for the course name in the search box and select the course from the dropdown.\n3. Select the grade for the course from the grade dropdown.\n4. Repeat steps 1-3 for all the courses you want to calculate the SGPA for.\n5. Click the "Calculate SGPA" button to see the calculated SGPA.'
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 text-black relative">
            <button
                className="absolute top-4 right-4 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold focus:outline-none"
                onClick={showInstructions}
            >
                ?
            </button>

            <div className="container mx-auto px-4 py-8">
                <div className="bg-white p-6 sm:p-10 rounded-lg shadow-xl border-2 border-gray-300">
                    <div className="mb-10">
                        <h2 className="text-3xl sm:text-5xl font-bold text-center text-gray-800">
                            SGPA Calculator (Coming Soon!)
                        </h2>
                    </div>
                    <div className="mb-4">
                        {selectedCourses.map((selectedCourse, index) => (
                            <div key={index} className="mb-2">
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                                        placeholder="Search for a course"
                                        value={selectedCourse.searchTerm}
                                        onChange={(e) => updateCourse(index, 'searchTerm', e.target.value)}
                                        onFocus={() => updateCourse(index, 'showDropdown', true)}
                                        onBlur={() => updateCourse(index, 'showDropdown', false)}
                                    />
                                    {selectedCourse.showDropdown && (
                                        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 py-1">
                                            {courses
                                                .filter((course) =>
                                                    course.courseName.toLowerCase().includes(selectedCourse.searchTerm.toLowerCase())
                                                )
                                                .map((course) => (
                                                    <li
                                                        key={course.courseCode}
                                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                                        onClick={() => {
                                                            updateCourse(index, 'course', course);
                                                            updateCourse(index, 'searchTerm', course.courseName);
                                                            updateCourse(index, 'showDropdown', false);
                                                        }}
                                                    >
                                                        {course.courseName}
                                                    </li>
                                                ))}
                                        </ul>
                                    )}
                                </div>
                                {selectedCourse.course && (
                                    <div className="mt-2">
                                        <span className="text-gray-600">{selectedCourse.course.courseCode}</span>
                                        <span className="ml-2 text-gray-600">{selectedCourse.course.courseCredits} credits</span>
                                    </div>
                                )}
                                <div className="mt-2">
                                    <select
                                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                                        value={selectedCourse.grade}
                                        onChange={(e) => updateCourse(index, 'grade', e.target.value)}
                                    >
                                        <option disabled>Select Grade</option>
                                        <option value="A">A</option>
                                        <option value="A-">A-</option>
                                        <option value="B">B</option>
                                        <option value="B-">B-</option>
                                        <option value="C">C</option>
                                        <option value="C-">C-</option>
                                        <option value="D">D</option>
                                        <option value="F">F</option>
                                    </select>
                                </div>
                            </div>
                        ))}
                        <div className='flex justify-center'>
                            <button
                                className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-3 text-sm rounded"
                                onClick={addCourse}
                            >
                                Add Course
                            </button>
                        </div>
                    </div>
                    <div className="mt-8 text-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            onClick={() => alert(`SGPA: ${calculateSGPA()}`)}
                        >
                            Calculate SGPA
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SGPACalculatorPage;