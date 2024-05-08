'use client';
import React, { useState } from 'react';

const CGPACalculatorPage = () => {
    const [semesterData, setSemesterData] = useState(
        Array(10).fill({ gpa: '', credits: '' })
    );
    const handleInputChange = (index: number, field: string, value: string) => {
        const updatedData = [...semesterData];
        updatedData[index] = { ...updatedData[index], [field]: value };
        setSemesterData(updatedData);
    };

    const calculateCGPA = () => {
        let totalCredits = 0;
        let totalGradePoints = 0;

        semesterData.forEach(({ gpa, credits }) => {
            if (gpa !== '' && credits !== '') {
                const creditPoints = parseFloat(gpa) * parseFloat(credits);
                totalGradePoints += creditPoints;
                totalCredits += parseFloat(credits);
            }
        });

        if (totalCredits === 0) {
            return 0;
        }

        const cgpa = totalGradePoints / totalCredits;
        return cgpa.toFixed(2);
    };

    const showInstructions = () => {
        alert('You only need to enter the semesters that you want to calculate for.\n\n\
        For total credits, add the credits for every course except OC courses - Arts, Sports, and Value Education.');
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
                            CGPA Calculator
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[...Array(10)].map((_, index) => (
                            <div key={index} className="mb-4">
                                <h3 className="text-xl font-bold mb-2">Semester {index + 1}</h3>
                                <div className="mb-2">
                                    <label htmlFor={`gpa-${index + 1}`} className="block text-gray-700 font-bold mb-1">
                                        SGPA:
                                    </label>
                                    <input
                                        id={`gpa-${index + 1}`}
                                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                                        value={semesterData[index].gpa}
                                        onChange={(e) => handleInputChange(index, 'gpa', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`credits-${index + 1}`} className="block text-gray-700 font-bold mb-1">
                                        Total Credits:
                                    </label>
                                    <input
                                        id={`credits-${index + 1}`}
                                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                                        min="0"
                                        value={semesterData[index].credits}
                                        onChange={(e) => handleInputChange(index, 'credits', e.target.value)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 text-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            onClick={() => alert(`CGPA: ${calculateCGPA()}`)}
                        >
                            Calculate CGPA
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CGPACalculatorPage;