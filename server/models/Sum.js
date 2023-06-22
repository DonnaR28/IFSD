import mongoose from 'mongoose';

const FractionSchema = new mongoose.Schema(
  {
    wholeNumber: {
      type: Number,
    },
    numerator: {
      type: Number,
    },
    denominator: {
      type: Number,
    },
  }
);

const CompoundFractionSumSchema = new mongoose.Schema(
  {
    fractions: {
      type: [FractionSchema],
      required: true,
    },
    sum: FractionSchema,
  },
  { timestamps: true }
);

const CompoundFractionSum = mongoose.model('calculatedSum', CompoundFractionSumSchema);
export default CompoundFractionSum;
