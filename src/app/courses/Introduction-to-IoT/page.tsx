'use client';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
  const [formData, setformData] = useState({
    quiz: '',
    midSem: '',
    assignment: '',
    endSem: '',
    project: '',
    labs: Array(10).fill('')
  });

  const handleInputChange = (e, index = null) => {
    if (index !== null) {
      if (e.target.name.startsWith('lab')) {
        const updatedLabs = [...formData.labs];
        updatedLabs[index] = e.target.value;
        setformData({ ...formData, labs: updatedLabs });
      } else if (e.target.name.startsWith('assignment')) {
        const updatedAssignments = [...formData.assignment];
        updatedAssignments[index] = e.target.value;
        setformData({ ...formData, assignment: updatedAssignments });
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
    let ass = (parseInt(formData.assignment) / 15) * 7.5;
    let lab = (formData.labs[0]/25 + formData.labs[1]/25 + formData.labs[2]/25 + formData.labs[3]/25 + formData.labs[4]/25 + formData.labs[5]/25 + formData.labs[6]/25 + formData.labs[7]/25 + formData.labs[8]/25 + formData.labs[9]/25) * 2;
    let quiz = (parseInt(formData.quiz) / 15) * 7.5;
    let mid =  (parseInt(formData.midSem) / 20) * 15;
    let end =  (parseInt(formData.endSem) / 100) * 30;
    let final = ass + lab + quiz + mid + end;
    console.log(quiz, mid, end, lab, final);
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
        <h2 className="text-5xl font-bold mb-6 text-center"> IIoT </h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2"> Quiz (out of 15) </h3>
          <input
            type="number"
            name="quiz"
            value={formData.quiz}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2"> Mid Sem (out of 20) </h3>
          <input
            type="number"
            name="midSem"
            value={formData.midSem}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2"> Assignment (out of 15) </h3>
          <input
            type="number"
            name="assignment"
            value={formData.assignment}
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
          <h3 className="text-lg font-semibold mb-2"> Labs (out of 25 each) </h3>
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

export default IIoTPage;