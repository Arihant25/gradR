'use client';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

interface FormData {
  assignment1: string;
  assignment2: string;
  midSemTheory: string;
  midSemLab: string;
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

const ISSPage = () => {
  const [formData, setFormData] = useState<FormData>({
    assignment1: '',
    assignment2: '',
    midSemTheory: '',
    midSemLab: '',
    project: '',
    labs: Array(4).fill(''),
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
    let assignments = (parseInt(formData.assignment1) / 100) * 12 + (parseInt(formData.assignment2) / 100) * 8;
    let mid = ((parseInt(formData.midSemTheory) / 100) + (parseInt(formData.midSemLab) / 100)) * 15;
    let proj = (parseInt(formData.project) / 100) * 30;
    let labs = ((formData.labs[0] / 100 + formData.labs[1] / 100) + (formData.labs[2] / 100 + formData.labs[3] / 100)) * 5;
    let final = assignments + labs + mid + proj;
    console.log(assignments, mid, proj, labs, final);
    alert(`Total marks: ` + parseFloat(`${final}`).toFixed(2));
  };

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).blur();
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
            <h2 className="text-2xl sm:text-5xl font-bold text-center">Introduction to Software Systems</h2>
          </div>
          <div className="mb-8 animate-fade-in">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Assignment 1 (out of 100)</h3>
            <input
              type="number"
              name="assignment1"
              value={formData.assignment1}
              onChange={handleInputChange}
              onWheel={handleWheel}
              className="border border-gray-300 rounded-md p-2 w-full font-mono"
            />
          </div>
          <div className="mb-8 animate-fade-in animate-delay-100">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Assignment 2 (out of 100)</h3>
            <input
              type="number"
              name="assignment2"
              value={formData.assignment2}
              onChange={handleInputChange}
              onWheel={handleWheel}
              className="border border-gray-300 rounded-md p-2 w-full font-mono"
            />
          </div>
          <div className="mb-8 animate-fade-in animate-delay-200">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Mid Sem Theory (out of 100)</h3>
            <input
              type="number"
              name="midSemTheory"
              value={formData.midSemTheory}
              onChange={handleInputChange}
              onWheel={handleWheel}
              className="border border-gray-300 rounded-md p-2 w-full font-mono"
            />
          </div>
          <div className="mb-8 animate-fade-in animate-delay-300">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Mid Sem Lab (out of 100)</h3>
            <input
              type="number"
              name="midSemLab"
              value={formData.midSemLab}
              onChange={handleInputChange}
              onWheel={handleWheel}
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
              onWheel={handleWheel}
              className="border border-gray-300 rounded-md p-2 w-full font-mono"
            />
          </div>
          <div className="mb-8 animate-fade-in animate-delay-500">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Labs (out of 100 each)</h3>
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
            className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 mt-4"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ISSPage;