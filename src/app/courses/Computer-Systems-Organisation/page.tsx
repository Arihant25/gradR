'use client';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

interface FormData {
  assignment1: string;
  assignment2: string;
  quiz1: string;
  quiz2: string;
  midSem: string;
  endSem: string;
  labExam: string;
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

const CSOPage = () => {
  const [formData, setFormData] = useState<FormData>({
    assignment1: '',
    assignment2: '',
    quiz1: '',
    quiz2: '',
    midSem: '',
    endSem: '',
    labExam: '',
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).blur();
  };

  const calculateMarks = () => {
    // Set the default value of each to 0
    for (let key in formData) {
      formData[key as keyof FormData] = formData[key as keyof FormData] === '' ? 0 : formData[key as keyof FormData];
    }
    // Calculate the total marks
    let assignments = ((parseInt(formData.assignment1) / 100) + (parseInt(formData.assignment2) / 100)) * 10;
    let mid = (parseInt(formData.midSem) / 60) * 20;
    let end = (parseInt(formData.endSem) / 100) * 30;
    let lab = (parseInt(formData.labExam) / 100) * 15;
    let quiz = ((parseInt(formData.quiz1) / 30) + (parseInt(formData.quiz2) / 100)) * 7.5;
    let final = assignments + lab + mid + end + quiz;
    console.log(assignments, lab, mid, end, quiz, final);
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
            <h2 className="text-2xl sm:text-5xl font-bold text-center">Computer Systems Organisation</h2>
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
            <h3 className="text-base sm:text-lg font-semibold mb-2">Quiz 1 (out of 30)</h3>
            <input
              type="number"
              name="quiz1"
              value={formData.quiz1}
              onChange={handleInputChange}
              onWheel={handleWheel}
              className="border border-gray-300 rounded-md p-2 w-full font-mono"
            />
          </div>
          <div className="mb-8 animate-fade-in animate-delay-300">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Quiz 2 (out of 100)</h3>
            <input
              type="number"
              name="quiz2"
              value={formData.quiz2}
              onChange={handleInputChange}
              onWheel={handleWheel}
              className="border border-gray-300 rounded-md p-2 w-full font-mono"
            />
          </div>
          <div className="mb-8 animate-fade-in animate-delay-400">
            <h3 className="text-base sm:text-lg font-semibold mb-2">MidSem (out of 60)</h3>
            <input
              type="number"
              name="midSem"
              value={formData.midSem}
              onChange={handleInputChange}
              onWheel={handleWheel}
              className="border border-gray-300 rounded-md p-2 w-full font-mono"
            />
          </div>
          <div className="mb-8 animate-fade-in animate-delay-500">
            <h3 className="text-base sm:text-lg font-semibold mb-2">End Sem (out of 100)</h3>
            <input
              type="number"
              name="endSem"
              value={formData.endSem}
              onChange={handleInputChange}
              onWheel={handleWheel}
              className="border border-gray-300 rounded-md p-2 w-full font-mono"
            />
          </div>
          <div className="mb-8 animate-fade-in animate-delay-600">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Lab Exam (out of 100)</h3>
            <input
              type="number"
              name="labExam"
              value={formData.labExam}
              onChange={handleInputChange}
              onWheel={handleWheel}
              className="border border-gray-300 rounded-md p-2 w-full font-mono"
            />
          </div>
          <button
            onClick={calculateMarks}
            className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300 mt-4 animate-pulse"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CSOPage;