'use client';
import React, { useState, useEffect } from 'react';
import NavBar from '../../../components/Navbar';

interface FormData {
  quiz1: string;
  midSemTheory: string;
  midSemLab: string;
  quiz2: string;
  endSemTheory: string;
  endSemLab: string;
  labs: string[];
  assignments: string[];
}


const DSAPage = () => {
  const [formData, setFormData] = useState<FormData>({
    quiz1: '',
    midSemTheory: '',
    midSemLab: '',
    quiz2: '',
    endSemTheory: '',
    endSemLab: '',
    labs: Array(8).fill(''),
    assignments: Array(5).fill(''),
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollProgress = (scrollTop / scrollHeight) * 100;
      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number | null = null) => {
    if (index !== null) {
      if (e.target.name.startsWith('lab')) {
        const updatedLabs = [...formData.labs];
        updatedLabs[index] = e.target.value;
        setFormData({ ...formData, labs: updatedLabs });
      } else if (e.target.name.startsWith('assignment')) {
        const updatedAssignments = [...formData.assignments];
        updatedAssignments[index] = e.target.value;
        setFormData({ ...formData, assignments: updatedAssignments });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).blur();
  };

  const calculateMarks = () => {
    // Set the default value of each to 0
    for (let key in formData) {
      if (Array.isArray(formData[key as keyof FormData])) {
        formData[key as keyof FormData] = formData[key as keyof FormData].map((value) => (value === '' ? 0 : value));
      } else {
        formData[key as keyof FormData] = formData[key as keyof FormData] === '' ? 0 : formData[key as keyof FormData];
      }
    }
    // Calculate the total marks
    let assignments = (formData.assignments[0] / 200 + formData.assignments[1] / 200 + formData.assignments[2] / 200 + formData.assignments[3] / 200 + formData.assignments[4] / 200) * 2;
    let lab = (formData.labs[0] / 200 + formData.labs[1] / 200 + formData.labs[2] / 200 + formData.labs[3] / 200 + formData.labs[4] / 200 + formData.labs[5] / 200 + formData.labs[6] / 200 + formData.labs[7] / 200) * 3.75;
    let quiz = ((parseInt(formData.quiz1) / 100) + (parseInt(formData.quiz2) / 100)) * 7.5;
    let mid = ((parseInt(formData.midSemTheory) / 140) + (parseInt(formData.midSemLab) / 450)) * 7.5;
    let end = (parseInt(formData.endSemTheory) / 140) * 10 + (parseInt(formData.endSemLab) / 450) * 20;
    let final = assignments + lab + quiz + mid + end;
    console.log(quiz, mid, end, assignments, lab, final);
    alert(`Total marks: ` + parseFloat(`${final}`).toFixed(2));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 text-black">
      <div className="fixed top-0 left-0 w-full h-2 bg-gray-300 shadow-inner">
        <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-500 shadow-lg" style={{ width: `${progress}%` }}></div>
      </div>
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 sm:p-10 rounded-lg shadow-xl border-2 border-gray-300">
          <div className="mb-10">
            <h2 className="text-3xl sm:text-5xl font-bold text-center text-gray-800 shadow-text">Data Structures and Algorithms</h2>
          </div>
          <div className="mb-8 animate-fade-in">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-700">Quiz 1 (out of 100)</h3>
            <input
              type="number"
              name="quiz1"
              value={formData.quiz1}
              onChange={handleInputChange}
              onWheel={handleWheel}
              className="border-2 border-gray-400 rounded-md p-3 w-full font-mono text-lg shadow-inner focus:outline-none focus:border-indigo-600 transition-colors duration-300"
            />
          </div>
          <div className="mb-8 animate-fade-in animate-delay-100">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-700">Mid Sem Theory (out of 140)</h3>
            <input
              type="number"
              name="midSemTheory"
              value={formData.midSemTheory}
              onChange={handleInputChange}
              onWheel={handleWheel}
              className="border-2 border-gray-400 rounded-md p-3 w-full font-mono text-lg shadow-inner focus:outline-none focus:border-indigo-600 transition-colors duration-300"
            />
          </div>
          <div className="mb-8 animate-fade-in animate-delay-200">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-700">Mid Sem Lab (out of 450)</h3>
            <input
              type="number"
              name="midSemLab"
              value={formData.midSemLab}
              onChange={handleInputChange}
              onWheel={handleWheel}
              className="border-2 border-gray-400 rounded-md p-3 w-full font-mono text-lg shadow-inner focus:outline-none focus:border-indigo-600 transition-colors duration-300"
            />
          </div>
          <div className="mb-8 animate-fade-in animate-delay-300">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-700">Quiz 2</h3>
            <input
              type="number"
              name="quiz2"
              value={formData.quiz2}
              onChange={handleInputChange}
              onWheel={handleWheel}
              className="border-2 border-gray-400 rounded-md p-3 w-full font-mono text-lg shadow-inner focus:outline-none focus:border-indigo-600 transition-colors duration-300"
            />
          </div>
          <div className="mb-8 animate-fade-in animate-delay-400">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-700">End Sem Theory</h3>
            <input
              type="number"
              name="endSemTheory"
              value={formData.endSemTheory}
              onChange={handleInputChange}
              onWheel={handleWheel}
              className="border-2 border-gray-400 rounded-md p-3 w-full font-mono text-lg shadow-inner focus:outline-none focus:border-indigo-600 transition-colors duration-300"
            />
          </div>
          <div className="mb-8 animate-fade-in animate-delay-500">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-700">End Sem Lab</h3>
            <input
              type="number"
              name="endSemLab"
              value={formData.endSemLab}
              onChange={handleInputChange}
              onWheel={handleWheel}
              className="border-2 border-gray-400 rounded-md p-3 w-full font-mono text-lg shadow-inner focus:outline-none focus:border-indigo-600 transition-colors duration-300"
            />
          </div>
          <div className="mb-8 animate-fade-in animate-delay-600">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-700">Labs (out of 200 each)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {formData.labs.map((value, index) => (
                <input
                  key={index}
                  type="number"
                  name={`lab${index + 1}`}
                  value={value}
                  onChange={(e) => handleInputChange(e, index)}
                  className="border-2 border-gray-400 rounded-md p-3 w-full font-mono text-lg shadow-inner focus:outline-none focus:border-indigo-600 transition-colors duration-300"
                  placeholder={`Lab ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="mb-8 animate-fade-in animate-delay-700">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-700">Assignments (out of 200 each)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {formData.assignments.map((value, index) => (
                <input
                  key={index}
                  type="number"
                  name={`assignment${index + 1}`}
                  value={value}
                  onChange={(e) => handleInputChange(e, index)}
                  className="border-2 border-gray-400 rounded-md p-3 w-full font-mono text-lg shadow-inner focus:outline-none focus:border-indigo-600 transition-colors duration-300"
                  placeholder={`Assignment ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <button
            onClick={calculateMarks}
            className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold text-lg py-3 px-6 rounded-lg shadow-lg hover:from-indigo-600 hover:to-indigo-700 transition-all mt-6"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default DSAPage;