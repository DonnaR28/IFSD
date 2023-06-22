import React, { useState } from 'react';
import WidgetWrapper from 'components/WidgetWrapper';

class CompoundFraction {
  constructor(wholeNumber, numerator, denominator) {
    this.wholeNumber = wholeNumber;
    this.numerator = numerator;
    this.denominator = denominator;
  }

  toString() {
    if (this.wholeNumber !== 0) {
      return `${this.wholeNumber} ${this.numerator}/${this.denominator}`;
    } else {
      return `${this.numerator}/${this.denominator}`;
    }
  }

  add(fraction) {
    const numerator1 = this.wholeNumber * this.denominator + this.numerator;
    const numerator2 = fraction.wholeNumber * fraction.denominator + fraction.numerator;

    const sumNumerator = numerator1 * fraction.denominator + numerator2 * this.denominator;
    const sumDenominator = this.denominator * fraction.denominator;

    let wholeNumber = Math.floor(sumNumerator / sumDenominator);
    const numerator = sumNumerator % sumDenominator;
    const denominator = sumDenominator;

    const gcd = this.greatestCommonDivisor(numerator, denominator);
    const simplifiedNumerator = numerator / gcd;
    const simplifiedDenominator = denominator / gcd;

    wholeNumber += Math.floor(simplifiedNumerator / simplifiedDenominator);
    const simplifiedNumeratorFinal = simplifiedNumerator % simplifiedDenominator;

    return new CompoundFraction(wholeNumber, simplifiedNumeratorFinal, simplifiedDenominator);
  }

  greatestCommonDivisor(a, b) {
    if (b === 0) {
      return a;
    }
    return this.greatestCommonDivisor(b, a % b);
  }
}

class NCompoundFractions {
  constructor(n) {
    this.n = n;
    this.fractions = [];
    this.sum = null;
  }

  addFraction(fraction) {
    this.fractions.push(fraction);
  }

  calculateSum() {
    let sum = new CompoundFraction(0, 0, 1);
    for (const fraction of this.fractions) {
      sum = sum.add(fraction);
    }
    this.sum = sum;
  }
}

const CompFracWidget = () => {
  const [fractions, setFractions] = useState([]);
  const [sum, setSum] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFractionChange = (index, field, value) => {
    const updatedFractions = [...fractions];
    const fraction = updatedFractions[index];
    fraction[field] = value;
    setFractions(updatedFractions);
  };

  const handleAddFraction = () => {
    const newFraction = { wholeNumber: 0, numerator: 0, denominator: 1 };
    setFractions([...fractions, newFraction]);
  };

  const handleRemoveFraction = (index) => {
    const updatedFractions = [...fractions];
    updatedFractions.splice(index, 1);
    setFractions(updatedFractions);
  };

  const handleCalculateSum = async () => {
    setLoading(true);
    setError(null);
  
    const nCompoundFractions = new NCompoundFractions(fractions.length);
    fractions.forEach((fraction) => {
      const { wholeNumber, numerator, denominator } = fraction;
      const compoundFraction = new CompoundFraction(wholeNumber, numerator, denominator);
      nCompoundFractions.addFraction(compoundFraction);
    });
  
    nCompoundFractions.calculateSum();
  
    try {
      const SavedSum = await fetch('http://localhost:3001/sum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fractions: nCompoundFractions.fractions }), // Updated payload
      });
      const sum = await SavedSum.json();
      if(sum){
        setSum("sum")
      }
  
      setSum(nCompoundFractions.sum.toString());
    } catch (error) {
      setError('Error calculating sum');
      console.error('Error calculating sum:', error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <WidgetWrapper>
      <div>
        <h2>Compound Fractions</h2>
        {fractions.map((fraction, index) => (
          <div key={index}>
            <h3>Whole No:</h3>
            <input
              type="number"
              value={fraction.wholeNumber}
              onChange={(e) =>
                handleFractionChange(index, 'wholeNumber', parseInt(e.target.value))
              }
            />
            <h3>Numerator:</h3>
            <input
              type="number"
              value={fraction.numerator}
              onChange={(e) =>
                handleFractionChange(index, 'numerator', parseInt(e.target.value))
              }
            />
            <h3>Denominator:</h3>
            <input
              type="number"
              value={fraction.denominator}
              onChange={(e) =>
                handleFractionChange(index, 'denominator', parseInt(e.target.value))
              }
            />
            <button onClick={() => handleRemoveFraction(index)}>Remove</button>
          </div>
        ))}
        <button onClick={handleAddFraction}>Add Fraction</button>
        <button onClick={handleCalculateSum}>Calculate Sum</button>
        {loading && <p>Loading...</p>}
        {error && <p>Error calculating sum: {error}</p>}
        {sum && <p>Sum: {sum}</p>}
      </div>
    </WidgetWrapper>
  );
};

export default CompFracWidget;
