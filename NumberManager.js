import React, { useState, useEffect } from 'react';
import './NumberManager.css';
function NumberManager() {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urls = urlParams.getAll('url');

    const fetchData = async () => {
      const results = [];

      for (const url of urls) {
        try {
          const response = await fetch(url);
          const data = await response.json();
          results.push(...data.numbers);
        } catch (error) {
          console.error(`Error fetching data from URL: ${url}`);
        }
      }

      const uniqueNumbers = Array.from(new Set(results));
      const sortedNumbers = uniqueNumbers.sort((a, b) => a - b);

      setNumbers(sortedNumbers);
    };

    fetchData();
  }, []);

  return (
        <div className="container">
          <h1 className="heading">Number Management Service</h1>
          <br></br><h3>Merged Unique Integers</h3>
          <ul className="list">
            {numbers.map((number) => (
              <li key={number} className="list-item">
                {number}
              </li>
            ))}
          </ul>
        </div>
      );
}

export default NumberManager;
