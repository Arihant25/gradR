'use client';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

interface FormData {
  quiz: string;
  midSem: string;
  assignment: string;
  endSem: string;
  project: string;
  labs: string[];
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

const IIoTPage = () => {
  const [formData, setformData] = useState<FormData>({
    quiz: '',
    midSem: '',
    assignment: '',
    endSem: '',
    project: '',
    labs: Array(10).fill('')
  });
  
  const [progress, setProgress] = useState(0);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const progress = (scrollTop / scrollHeight) * 100;
    setProgress(progress);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number | null = null) => {
    if (index !== null) {
      if (e.target.name.startsWith('lab')) {
        const updatedLabs = [...formData.labs];
        updatedLabs[index] = e.target.value;
        setformData({ ...formData, labs: updatedLabs });
      }
    } else {
      setformData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const calculateMarks = () => {
    // Set the default value of each to 0
    for (let key in formData) {
      if (Array.isArray(formData[key])) {
        formData[key] = formData[key].map((value) => (value === '' ? 0 : value));
      } else {
        formData[key] = formData[key] === '' ? 0 : formData[key];
      }
    }
    // Calculate the total marks
    let assignments = parseInt(formData.assignment) / 15 * 7.5;
    let lab = (formData.labs[0] / 25 + formData.labs[1] / 25 + formData.labs[2] / 25 + formData.labs[3] / 25 + formData.labs[4] / 25 + formData.labs[5] / 25 + formData.labs[6] / 25 + formData.labs[7] / 25 + formData.labs[8] / 25 + formData.labs[9] / 25) * 2;
    let quiz = (parseInt(formData.quiz) / 15) * 7.5;
    let mid = (parseInt(formData.midSem) / 20) * 15;
    let end = (parseInt(formData.endSem) / 100) * 30;
    let project = (parseInt(formData.project) / 100) * 20;
    let final = assignments + lab + quiz + mid + end + project;
    console.log(quiz, mid, end, lab, project, final);
    alert(`Total marks: ` + parseFloat(`${final}`).toFixed(2));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center text-black">
      <div className="bg-white p-4 sm:p-8 rounded-lg shadow-md max-w-6xl w-full">
        <nav className="w-full bg-white p-4 text-right">
          <button onClick={() => history.back()} className="text-indigo-600">
            Back
          </button>
        </nav>
        <div className="mb-8">
          <h2 className="text-2xl sm:text-5xl font-bold text-center">IIoT</h2>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
            <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <div className="mb-8 animate-fade-in">
          <h3 className="text-base sm:text-lg font-semibold mb-2">Quiz (out of 15)</h3>
          <input
            type="number"
            name="quiz"
            value={formData.quiz}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full font-mono"
          />
        </div>
        <div className="mb-8 animate-fade-in animate-delay-100">
          <h3 className="text-base sm:text-lg font-semibold mb-2">Mid Sem (out of 20)</h3>
          <input
            type="number"
            name="midSem"
            value={formData.midSem}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full font-mono"
          />
        </div>
        <div className="mb-8 animate-fade-in animate-delay-200">
          <h3 className="text-base sm:text-lg font-semibold mb-2">Assignment (out of 15)</h3>
          <input
            type="number"
            name="assignment"
            value={formData.assignment}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full font-mono"
          />
        </div>
        <div className="mb-8 animate-fade-in animate-delay-300">
          <h3 className="text-base sm:text-lg font-semibold mb-2">End Sem (out of 100)</h3>
          <input
            type="number"
            name="endSem"
            value={formData.endSem}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full font-mono"
          />
        </div>
        <div className="mb-8 animate-fade-in animate-delay-400">
          <h3 className="text-base sm:text-lg font-semibold mb-2">Project (out of 100)</h3>
          <input
            type="number"
            name="project"
            value={formData.project}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full font-mono"
          />
        </div>
        <div className="mb-8 animate-fade-in animate-delay-500">
          <h3 className="text-base sm:text-lg font-semibold mb-2">Labs (out of 25 each)</h3>
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
        <button
          onClick={calculateMarks}
          className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300 mt-4"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default IIoTPage;