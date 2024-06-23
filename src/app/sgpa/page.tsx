'use client';
import React, { useState } from 'react';
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
    courseGradingPolicy: Record<string, number | number[]>;
    color?: string;
}

interface SelectedCourse {
    course: Course | null;
    grade: string;
    searchTerm: string;
    showDropdown: boolean;
}

const SGPACalculatorPage: React.FC = () => {
    const [selectedCourses, setSelectedCourses] = useState<SelectedCourse[]>([]);

    const addCourse = () => {
        setSelectedCourses([...selectedCourses, {
            course: null,
            grade: 'Select Grade',
            searchTerm: '',
            showDropdown: false
        }]);
    };

    const updateCourse = (index: number, field: keyof SelectedCourse, value: any) => {
        const updatedCourses = [...selectedCourses];
        if (field === 'course') {
            updatedCourses[index] = {
                ...updatedCourses[index],
                course: value,
                searchTerm: value.courseName,
                showDropdown: false
            };
        } else {
            updatedCourses[index] = { ...updatedCourses[index], [field]: value };
        }
        setSelectedCourses(updatedCourses);
    };

    const calculateSGPA = (): string => {
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
            return '0.00';
        }

        const sgpa = totalGradePoints / totalCredits;
        return sgpa.toFixed(2);
    };

    const getGradePoint = (grade: string): number => {
        const gradePoints: Record<string, number> = {
            'A': 10, 'A-': 9, 'B': 8, 'B-': 7, 'C': 6, 'C-': 5, 'D': 4, 'F': 0
        };
        return gradePoints[grade] || 0;
    };

    const showInstructions = () => {
        alert(
            'Instructions:\n\n' +
            '1. Click the "Add Course" button to add a new course to the list.\n' +
            '2. Search for the course name in the search box and select the course from the dropdown.\n' +
            '3. Select the grade for the course from the grade dropdown.\n' +
            '4. Repeat steps 1-3 for all the courses in your semester.\n' +
            '5. Click the "Calculate SGPA" button to see the calculated SGPA.'
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
                    <h2 className="text-3xl sm:text-5xl font-bold text-center text-gray-800 mb-10">
                        SGPA Calculator
                    </h2>
                    <div className="mb-4">
                        {selectedCourses.map((selectedCourse, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && <hr className="my-4 border-gray-200" />}
                                <CourseSelector
                                    selectedCourse={selectedCourse}
                                    updateCourse={(field, value) => updateCourse(index, field, value)}
                                    courses={courses}
                                />
                            </React.Fragment>
                        ))}
                        <div className='flex justify-center mt-6'>
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

interface CourseSelectorProps {
    selectedCourse: SelectedCourse;
    updateCourse: (field: keyof SelectedCourse, value: any) => void;
    courses: Course[];
}

const CourseSelector: React.FC<CourseSelectorProps> = ({ selectedCourse, updateCourse, courses }) => {
    return (
        <div className="mb-2">
            <div className="relative">
                <input
                    type="text"
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Search for a course"
                    value={selectedCourse.searchTerm}
                    onChange={(e) => updateCourse('searchTerm', e.target.value)}
                    onFocus={() => updateCourse('showDropdown', true)}
                    onBlur={() => setTimeout(() => updateCourse('showDropdown', false), 200)}
                />
                {selectedCourse.showDropdown && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 py-1 overflow-y-auto max-h-60">
                        {courses
                            .filter((course) =>
                                course.courseName.toLowerCase().includes(selectedCourse.searchTerm.toLowerCase())
                            )
                            .sort((a, b) => a.courseName.localeCompare(b.courseName))
                            .map((course) => (
                                <li
                                    key={course.courseCode}
                                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onMouseDown={() => updateCourse('course', course)}
                                >
                                    {course.courseName}
                                </li>
                            ))}
                    </ul>
                )}
            </div>
            {selectedCourse.course && (
                <div className="mt-2 text-sm text-gray-600">
                    {selectedCourse.course.courseCredits} credits
                </div>
            )}
            <div className="mt-2">
                <select
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                    value={selectedCourse.grade}
                    onChange={(e) => updateCourse('grade', e.target.value)}
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
    );
};

export default SGPACalculatorPage;