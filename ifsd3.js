import React, { useState } from 'react';

const CompoundFraction = ({ wholeNumber, numerator, denominator }) => {
  return (
    <td>
      {wholeNumber !== 0 ? (
        <span>
          {wholeNumber} {numerator}/{denominator}
        </span>
      ) : (
        <span>{numerator}/{denominator}</span>
      )}
    </td>
  );
};

const CompoundFractionsTable = ({ fractions, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Whole Number</th>
          <th>Numerator</th>
          <th>Denominator</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {fractions.map((fraction, index) => (
          <tr key={index}>
            <CompoundFraction
              wholeNumber={fraction.wholeNumber}
              numerator={fraction.numerator}
              denominator={fraction.denominator}
            />
            <td>
              <button onClick={() => onDelete(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const App = () => {
  const [fractions, setFractions] = useState([]);

  const addFraction = () => {
    const wholeNumber = parseInt(prompt("Enter the whole number of the compound fraction: "));
    const numerator = parseInt(prompt("Enter the numerator of the compound fraction: "));
    const denominator = parseInt(prompt("Enter the denominator of the compound fraction: "));

    const newFraction = { wholeNumber, numerator, denominator };
    setFractions([...fractions, newFraction]);
  };

  const deleteFraction = (index) => {
    setFractions(fractions.filter((_, i) => i !== index));
  };

  const calculateSum = () => {
    let sumFraction = new CompoundFraction(0, 0, 1);
    for (let i = 0; i < fractions.length; i++) {
      sumFraction = sumFraction.add(fractions[i]);
    }
    return sumFraction;
  };

  const sumFraction = calculateSum();

  return (
    <div>
      <h1>Compound Fractions Table</h1>
      <CompoundFractionsTable fractions={fractions} onDelete={deleteFraction} />
      <button onClick={addFraction}>Add Fraction</button>
      <p>The sum of {fractions.length} compound fractions is: {sumFraction.toString()}</p>
    </div>
  );
};

export default App;
