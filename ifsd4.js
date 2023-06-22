const express = require('express');
const mongoose = require('mongoose');
const prompt = require('prompt-sync')();

const compoundFractionSchema = new mongoose.Schema({
  wholeNumber: Number,
  numerator: Number,
  denominator: Number
});

const CompoundFractionModel = mongoose.model('CompoundFraction', compoundFractionSchema);

mongoose.connect('mongodb+srv://donnarichard902:donnar@clusterdon.brgiu2f.mongodb.net/compound-fractions?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

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

  save() {
    const compoundFraction = new CompoundFractionModel({
      wholeNumber: this.wholeNumber,
      numerator: this.numerator,
      denominator: this.denominator
    });
    return compoundFraction.save();
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
      this.sum = null; // Add a sum property to store the sum of fractions
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
  
    saveAll() {
      const savePromises = this.fractions.map(fraction => fraction.save());
      savePromises.push(this.sum.save()); // Save the sum as well
      return Promise.all(savePromises);
    }
  }
  
const app = express();
app.use(express.json());

app.post('/compound-fractions', async (req, res) => {
    const n = parseInt(prompt("Enter the number of compound fractions: "));
    const nFractions = new NCompoundFractions(n);
  
    for (let i = 0; i < nFractions.n; i++) {
      const wholeNumber = parseInt(prompt("Enter the whole number of the compound fraction: "));
      const numerator = parseInt(prompt("Enter the numerator of the compound fraction: "));
      const denominator = parseInt(prompt("Enter the denominator of the compound fraction: "));
      const fraction = new CompoundFraction(wholeNumber, numerator, denominator);
      nFractions.addFraction(fraction);
    }
  
    nFractions.calculateSum(); // Calculate the sum
  
    try {
      await nFractions.saveAll();
      res.status(201).json({ message: 'Compound fractions created successfully.', sum: nFractions.sum.toString() });
    } catch (error) {
      console.error('Error creating compound fractions:', error);
      res.status(500).json({ error: 'An error occurred while creating compound fractions.' });
    }
  });  
  
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
