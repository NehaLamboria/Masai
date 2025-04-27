import React, { useState } from 'react';

function Counter() {
  const [counter, setCounter] = useState(0); // Initial counter state
  const [step, setStep] = useState(1); // Initial step value set to 1

  // Function to handle the increase of the counter
  const increaseCounter = () => {
    setCounter((prevCounter) => prevCounter + step);
  };

  // Function to handle the decrease of the counter
  const decreaseCounter = () => {
    setCounter((prevCounter) => (prevCounter - step < 0 ? 0 : prevCounter - step));
  };

  // Function to handle step value change from the input field
  const handleStepChange = (e) => {
    const newStep = parseInt(e.target.value, 10);
    if (newStep >= 0) {
      setStep(newStep); // Update step value if the new step is valid (positive or zero)
    }
  };

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <div>
        <button onClick={increaseCounter}>Increase</button>
        <button onClick={decreaseCounter}>Decrease</button>
      </div>
      <div>
        <label>
          Step:
          <input
            type="number"
            value={step}
            onChange={handleStepChange}
            min="0"
          />
        </label>
      </div>
    </div>
  );
}

export default Counter;
