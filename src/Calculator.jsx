import React, { useState } from 'react';
import './Calculator.css'; // 
function Calculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  const handleInputChange = (e) => {
    setExpression(e.target.value);
  };

  const handleSubmit = async () => {
    const url = 'http://localhost:8000/calculer/'; 
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expression }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setResult(data.resultat);
    } catch (error) {
      console.error("Failed to calculate:", error);
      setResult('Error calculating expression.');
    }
  };

  return (
    <div className="calculator">
      <div className="display">{expression || "Enter NPI expression"}</div>
      <div className="result">Result: {result}</div>
      <div className="buttons">
        <input
          type="text"
          value={expression}
          onChange={handleInputChange}
          className="input-expression"
        />
        <button className="equals" onClick={handleSubmit}>Calculate</button>
      </div>
    </div>
  );
}

export default Calculator;
