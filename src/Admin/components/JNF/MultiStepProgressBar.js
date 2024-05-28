import React from 'react';
import './multistep.css'; // Import the CSS styles

const MultiStepProgressBar = ({ page }) => {
  const steps = [
    { label: "Company Overview", name: "step 1" },
    { label: "Job Profile", name: "step 2" },
    { label: "Selection Process", name: "step 3" },
    { label: "Contact Details", name: "step 4" },
  ];

  return (
    <div className="container">
      <div className="steps-container">
        {steps.map((step, index) => {
          const isCompleted = page - 1 > index;
          const isActive = page - 1 === index;

          return (
            <div key={index} className="step-item">
              {index > 0 && (
                <div className="line-container">
                  <div
                    className={`line ${isCompleted ? 'completed-line' : ''} ${isActive ? 'active-line' : ''}`}
                  ></div>
                </div>
              )}
              <div
                className={`step-circle ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
              >
                {isCompleted ? '✔' : isActive ? <span className="active-dot"></span> : ''}
              </div>
              <div className="step-label">{step.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultiStepProgressBar;
