#!/bin/bash

# Set the path to the courses.json file
JSON_FILE="./courses.json"

# Set the base directory for the generated folders and files
BASE_DIR="./src/app/courses"

# Read the JSON file
COURSES=$(cat $JSON_FILE)

# Iterate over each course in the JSON
for COURSE in $(echo "$COURSES" | jq -r '.[] | @base64'); do
  # Decode the base64-encoded course data
  COURSE_DATA=$(echo "$COURSE" | base64 --decode)

  # Extract the course name and replace spaces with hyphens
  COURSE_NAME=$(echo "$COURSE_DATA" | jq -r '.courseName' | tr ' ' '-')

  # Create the course folder
  COURSE_DIR="$BASE_DIR/$COURSE_NAME"
  mkdir -p "$COURSE_DIR"

  # Generate the page.tsx file content
  PAGE_CONTENT="\"use client\";
import React, { useState, useEffect } from \"react\";
interface FormData {
  [key: string]: string | string[];
}
interface CourseGradingFormProps {
  courseData: any;
}
const CourseGradingForm: React.FC<CourseGradingFormProps> = ({
  courseData,
}) => {
  const [formData, setFormData] = useState<FormData>({});
  useEffect(() => {
    // Initialize form data based on the course grading policy
    const initialFormData: FormData = {};
    Object.entries(courseData.courseGradingPolicy).forEach(([key, value]) => {
      if (Array.isArray(value[0])) {
        initialFormData[key] = Array(value.length).fill(\"\");
      } else {
        initialFormData[key] = \"\";
      }
    });
    setFormData(initialFormData);
  }, [courseData]);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number | null = null
  ) => {
    if (index !== null) {
      const [key, subIndex] = e.target.name.split(\"-\");
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
    alert(\`Total marks: \${totalMarks.toFixed(2)}\`);
  };
  return (
    <div>
      {Object.entries(courseData.courseGradingPolicy).map(([key, value]) => (
        <div key={key} className=\"mb-8\">
          {Array.isArray(value[0]) ? (
            <h3 className=\"text-lg font-semibold mb-2\">{key}</h3>
          ) : (
            <h3 className=\"text-lg font-semibold mb-2\">
              {key + \" (Out of \" + (value[1] as number) + \")\"}
            </h3>
          )}
          {Array.isArray(value[0]) ? (
            <div className=\"grid grid-cols-2 gap-4\">
              {(value as [number, number][]).map((_, index) => (
                <input
                  key={\`\${key}-\${index}\`}
                  type=\"number\"
                  name={\`\${key}-\${index}\`}
                  onChange={(e) => handleInputChange(e, index)}
                  className=\"border-2 border-gray-400 rounded-md p-3 w-full\"
                  placeholder={\`\${index + 1} (out of \${value[index][1]})\`}
                />
              ))}
            </div>
          ) : (
            <input
              type=\"number\"
              name={key}
              value={(formData[key] as string) || \"\"}
              onChange={handleInputChange}
              className=\"border-2 border-gray-400 rounded-md p-3 w-full\"
            />
          )}
        </div>
      ))}
      <div className=\"flex w-full justify-between\">
        <button
          onClick={calculateMarks}
          className=\"text-white font-semibold text-lg py-3 px-6 rounded-lg mt-6\"
          style={{ backgroundColor: \"#053C6B\" }}
        >
          Submit
        </button>
        <a href="/">
          <img
            src="../../../img/favicon.jpg"
            alt="Logo"
            className="justify-end mt-8 h-16 w-auto"
          />
        </a>
      </div>
    </div>
  );
};
export default CourseGradingForm;
"

  # Write the page.tsx file
  PAGE_FILE="$COURSE_DIR/page.tsx"
  echo "$PAGE_CONTENT" > "$PAGE_FILE"
done