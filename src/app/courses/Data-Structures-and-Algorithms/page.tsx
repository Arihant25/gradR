'use client';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

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

const NavBar = () => {
  const router = useRouter();

  return (
    <nav className="w-full bg-white py-3 text-right">
      <button onClick={() => router.back()} className="text-indigo-600">
        Back
      </button>
    </nav>
  );
};

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
    <div className="min-h-screen bg-gray-100 text-black">
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200">
        <div className="h-full bg-indigo-600 transition-all duration-500" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-4 sm:p-8 rounded-lg shadow-md">
          <nav className="w-full bg-white p-4 text-right">
            <button onClick={() => history.back()} className="text-indigo-600">
              Back
            </button>
          </nav>
          <div className="mb-8">
            <h2 className="text-2xl sm:text-5xl font-bold text-center">Data Structures and Algorithms</h2>
          </div>
          <div className="mb-8 animate-fade-in">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Quiz 1 (out of 100)</h3>
            <input
              type="number"
              name="quiz1"
              value={formData.quiz1}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full font-mono"
            />
          </div>
          <div className="mb-8 animate-fade-in animate-delay-100">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Mid Sem Theory (out of 140)</h3>
            <input
              type="number"
              name="midSemTheory"
              value={formData.midSemTheory}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full font-mono"
            />
          </div>
          <div className="mb-8 animate-fade-in animate-delay-200">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Mid Sem Lab (out of 450)</h3>
            <input
              type="number"
              name="midSemLab"
              value={formData.midSemLab}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full font-mono"
            />
          </div>
          <div className="mb-8 animate-fade-in animate-delay-300">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Quiz 2</h3>
            <input
              type="number"
              name="quiz2"
              value={formData.quiz2}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full font-mono"
            />
          </div>
          <div className="mb-8 animate-fade-in animate-delay-400">
            <h3 className="text-base sm:text-lg font-semibold mb-2">End Sem Theory</h3>
            <input
              type="number"
              name="endSemTheory"
              value={formData.endSemTheory}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full font-mono"
            />
          </div>
          <div className="mb-8 animate-fade-in animate-delay-500">
            <h3 className="text-base sm:text-lg font-semibold mb-2">End Sem Lab</h3>
            <input
              type="number"
              name="endSemLab"
              value={formData.endSemLab}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full font-mono"
            />
          </div>
          <div className="mb-8 animate-fade-in animate-delay-600">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Labs (out of 200 each)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {formData.labs.map((value, index) => (
                <input
                  key={index}
                  type="number"
                  name={`lab${index + 1}`}
                  value={value}
                  onChange={(e) => handleInputChange(e, index)}
                  className="border border-gray-300 rounded-md p-2 w-full font-mono"
                  placeholder={`Lab ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="mb-8 animate-fade-in animate-delay-700">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Assignments (out of 200 each)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {formData.assignments.map((value, index) => (
                <input
                  key={index}
                  type="number"
                  name={`assignment${index + 1}`}
                  value={value}
                  onChange={(e) => handleInputChange(e, index)}
                  className="border border-gray-300 rounded-md p-2 w-full font-mono"
                  placeholder={`Assignment ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <button
            onClick={calculateMarks}
            className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 mt-4"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default DSAPage;