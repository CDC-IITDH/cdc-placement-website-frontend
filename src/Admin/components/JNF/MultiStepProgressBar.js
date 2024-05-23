import React from "react";
import { Row } from "react-bootstrap";
import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";

const MultiStepProgressBar = ({ page, handlePageChange }) => {
  // setup step validators, will be called before proceeding to the next step
  function step2Validator() {
    // return a boolean
    return true;
  }

  function step3Validator() {
    // return a boolean
  }

  function step4Validator() {
    // return a boolean
  }

  function onFormSubmit() {
    alert("Page is Changed");
  }
  return (
    <>
      <div className="p-3">
        <StepProgressBar
          startingStep={0}
          onSubmit={handlePageChange}
          // created separate css file, StepProgressBar.module.css
          // wrapperClass="wrapper"
          // progressClass="progress"
          // stepClass="step"
          steps={[
            {
              label: "Company Overview",
              name: "step 1",
            },
            {
              label: "Job Profile",
              name: "step 2",
              validator: step2Validator,
            },
            {
              label: "Selection Process",
              name: "step 3",
              validator: step3Validator,
            },
            {
              label: "Contact Details",
              name: "step 4",
              validator: step4Validator,
            },
          ]}
        />
      </div>
    </>
  );
};

export default MultiStepProgressBar;
