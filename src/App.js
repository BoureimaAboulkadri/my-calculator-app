import React from 'react';
import Calculator from './Calculator';
import ExportCSV from './ExportCSV';

function App() {
  return (
    <div className="App">
      {/* <h1>Notation Polonaise Inverse Calculatrice</h1> */}
      <Calculator />
      <ExportCSV />
    </div>
  );
}

export default App;
