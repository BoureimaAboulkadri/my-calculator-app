import React, { useEffect, useState } from 'react';
import './ExportCSV.css';

function ExportCSV() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'http://localhost:8000/export/';
      try {
        const response = await fetch(url);
        const csvData = await response.text();
        // Conversion du CSV en tableau JSON pour l'affichage
        // Cette étape dépend de la structure exacte de votre CSV
        const jsonData = csvData.split('\n').map(row => row.split(','));
        setData(jsonData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  // const handleExport = async () => {
  //   // La logique d'export reste inchangée
  // };
  const handleExport = async () => {
  const url = 'http://localhost:8000/export/';
  try {
    const response = await fetch(url);
    const csv = await response.text();
    // Créer un lien pour télécharger le fichier
    const blob = new Blob([csv], { type: 'text/csv' });
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = 'npi-results.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (error) {
    console.error("Failed to export:", error);
  }
};

  return (
    <div>
      <button className="export-csv" onClick={handleExport}>Export CSV</button>
      <div className="data-preview">
        {data.length > 0 && (
          <table>
            <thead>
              <tr>
                {data[0].map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.slice(1).map((row, index) => (
                <tr key={index}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ExportCSV;
