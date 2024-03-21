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

const ISSPage = () => {
  const [formData, setformData] = useState({
    assignment1: '',
    assignment2: '',
    midSemTheory: '',
    midSemLab: '',
    project: '',
    labs: Array(4).fill('')
  });

  const handleInputChange = (e, index = null) => {
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
    let assignments = ((parseInt(formData.assignment1) / 100 * 12) + (parseInt(formData.assignment2) / 100) * 8);
    let mid = ((parseInt(formData.midSemTheory) / 100) + (parseInt(formData.midSemLab) / 100)) * 15;
    let proj = (parseInt(formData.project) / 100 * 30);
    let labs = ((formData.labs[0] / 100 + formData.labs[1] / 100) + (formData.labs[2] / 100 + formData.labs[3] / 100)) * 5;
    let final = assignments + labs + mid + proj;
    console.log(assignments, mid, proj, labs, final);
    alert(`Total marks: ` + parseFloat(`${final}`).toFixed(2));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center text-black">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <nav className="w-full bg-white p-4 text-right">
          <button onClick={() => history.back()} className="text-indigo-600">
            Back
          </button>
        </nav>
        <h2 className="text-5xl font-bold mb-6 text-center"> ISS </h2>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2"> Assignment 1 (out of 100) </h3>
          <input
            type="number"
            name="assignment1"
            value={formData.assignment1}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2"> Assignment 2 (out of 100) </h3>
          <input
            type="number"
            name="assignment2"
            value={formData.assignment2}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2"> Mid Sem Theory (out of 100) </h3>
          <input
            type="number"
            name="midSemTheory"
            value={formData.midSemTheory}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2"> Mid Sem Lab (out of 100) </h3>
          <input
            type="number"
            name="midSemLab"
            value={formData.midSemLab}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2"> Project (out of 100) </h3>
          <input
            type="number"
            name="project"
            value={formData.project}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Labs (out of 100 each)</h3>
          <div className="grid grid-cols-4 gap-4">
            {formData.labs.map((value, index) => (
              <input
                key={index}
                type="number"
                name={`lab${index + 1} `}
                value={value}
                onChange={(e) => handleInputChange(e, index)}
                className="border border-gray-300 rounded-md p-2"
                placeholder={`Lab ${index + 1} `}
              />
            ))}
          </div>
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

export default ISSPage;