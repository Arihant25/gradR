'use client';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
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
  const [formData, setformData] = useState({
    quiz1: '',
    midSem: '',
    quiz2: '',
    tutorialQuiz: '',
    endSem: '',
    assignment1: '',
    assignment2: '',
  });

  const handleInputChange = (e, index = null) => {
    if (index !== null) {
      if (e.target.name.startsWith('lab')) {
        const updatedLabs = [...formData.assignment];
        updatedLabs[index] = e.target.value;
        setformData({ ...formData, assignment: updatedLabs });
      }
    } else {
      setformData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const calculateMarks = () => {
    // Set the default value of each to 0
    for (let key in formData) {
        formData[key] = formData[key] === '' ? 0 : formData[key];
    }
    // Calculate the total marks
    let firstHalfAss = ((parseInt(formData.assignment1) / 10) + (parseInt(formData.assignment2) / 20)) * 10;
    let mid = (parseInt(formData.midSem) / 15) * 20;
    let end = (parseInt(formData.endSem) / 100) * 30;
    let tutQuiz = (parseInt(formData.tutorialQuiz) / 15) * 5;
    let quiz = ((parseInt(formData.quiz1) / 15) + (parseInt(formData.quiz2) / 15)) * 10;
    let final = firstHalfAss + secondHalfAss + lastHalfAss + tutQuiz + mid + end + quiz;
    console.log(firstHalfAss+secondHalfAss+lastHalfAss, tutQuiz, mid, end, quiz, final);
    alert(`Total marks: ` + parseFloat(`${final}`).toFixed(2));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center text-black">
      <div className="bg-white p-8 rounded-lg shadow-md w-full">
        <nav className="w-full bg-white p-4 text-right">
          <button onClick={() => history.back()} className="text-indigo-600">
            Back
          </button>
        </nav>
        <h2 className="text-5xl font-bold mb-6 text-center"> Computer Systems Organisation </h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2"> Assignment 1 (out of 10) </h3>
          <input
            type="number"
            name="assignment1"
            value={formData.assignment1}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2"> Assignment 2 (out of 20) </h3>
          <input
            type="number"
            name="assignment2"
            value={formData.assignment2}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2"> Quiz 1 (out of 15) </h3>
          <input
            type="number"
            name="quiz1"
            value={formData.quiz1}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2"> MidSem (out of 15) </h3>
          <input
            type="number"
            name="midSem"
            value={formData.midSem}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2"> Quiz 2 (out of 15) </h3>
          <input
            type="number"
            name="quiz2"
            value={formData.quiz2}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2"> Tutorial Quiz (out of 15) </h3>
          <input
            type="number"
            name="tutorialQuiz"
            value={formData.tutorialQuiz}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2"> End Sem (out of 100) </h3>
          <input
            type="number"
            name="endSem"
            value={formData.endSem}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <button
          onClick={calculateMarks}
          className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CSOPage;