import CompoundFractionSum from '../models/Sum.js';

export const calculateSum = async (req, res) => {
    try {
      const { fractions } = req.body; // Updated line
      const sum = fractions.reduce((acc, fraction) => {
        acc.wholeNumber += fraction.wholeNumber;
        acc.numerator += fraction.numerator;
        acc.denominator += fraction.denominator;
        return acc;
      }, { wholeNumber: 0, numerator: 0, denominator: 1 });
  
      const compoundFractionSum = new CompoundFractionSum({ fractions, sum });
      const savedSum = await compoundFractionSum.save();
      res.status(200).json(savedSum);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  