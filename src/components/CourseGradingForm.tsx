'use client';
import React, { useState, useEffect } from 'react';

interface FormData {
  [key: string]: string | string[];
}

interface CourseGradingFormProps {
  courseData: any;
}

const CourseGradingForm: React.FC<CourseGradingFormProps> = ({ courseData }) => {
  const [formData, setFormData] = useState<FormData>({});

  useEffect(() => {
    // Initialize form data based on the course grading policy
    const initialFormData: FormData = {};
    Object.entries(courseData.courseGradingPolicy).forEach(([key, value]) => {
      if (Array.isArray(value[0])) {
        initialFormData[key] = Array(value.length).fill('');
      } else {
        initialFormData[key] = '';
      }
    });
    setFormData(initialFormData);
  }, [courseData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number | null = null) => {
    if (index !== null) {
      const [key, subIndex] = e.target.name.split('-');
      const updatedValue = [...(formData[key] as string[])];
      updatedValue[subIndex] = e.target.value;
      setFormData({ ...formData, [key]: updatedValue });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const calculateMarks = () => {
    // Calculate the total marks based on the form data and course grading policy
    let totalMarks = 0;
    Object.entries(courseData.courseGradingPolicy).forEach(([key, value]) => {
      if (Array.isArray(value[0])) {
        const marks = (formData[key] as string[]).reduce((sum, mark, index) => {
          return sum + (parseFloat(mark) / value[index][1]) * value[index][0];
        }, 0);
        totalMarks += marks;
      } else {
        const mark = parseFloat(formData[key] as string);
        totalMarks += (mark / value[1]) * value[0];
      }
    });
    alert(`Total marks: ${totalMarks.toFixed(2)}`);
  };

  return (
    <div>
      {Object.entries(courseData.courseGradingPolicy).map(([key, value]) => (
        <div key={key} className="mb-8">
          <h3 className="text-lg font-semibold mb-2">{key + " ( Out of " + courseData.courseGradingPolicy[key][1] + " )"}</h3>
          {Array.isArray(value[0]) ? (
            <div className="grid grid-cols-2 gap-4">
              {(value as [number, number][]).map((_, index) => (
                <input
                  key={`${key}-${index}`}
                  type="number"
                  name={`${key}-${index}`}
                //   value={(formData[key] as string[])[index] || ''}
                  onChange={(e) => handleInputChange(e, index)}
                  className="border-2 border-gray-400 rounded-md p-3 w-full"
                  placeholder={`${key} ${index + 1}`}
                />
              ))}
            </div>
          ) : (
            <input
              type="number"
              name={key}
              value={(formData[key] as string) || ''}
              onChange={handleInputChange}
              className="border-2 border-gray-400 rounded-md p-3 w-full"
            />
          )}
        </div>
      ))}
      <button
        onClick={calculateMarks}
        className="bg-blue-500 text-white font-semibold text-lg py-3 px-6 rounded-lg mt-6"
      >
        Submit
      </button>
    </div>
  );
};

export default CourseGradingForm;