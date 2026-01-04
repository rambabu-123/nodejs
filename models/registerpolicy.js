const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema(
  {
    userId: {
      type: String   // example: USER101
    },

    policyNumber: String,
    policyType: String,          // TERM, ENDOWMENT, ULIP, etc.
    planCode: String,

    policyTerm: Number,
    premiumTerm: Number,

    sumAssured: Number,
    premiumAmount: Number,
    premiumFrequency: String,    // MONTHLY, YEARLY, etc.

    policyStartDate: Date,
    policyEndDate: Date,
    policyStatus: String,        // ACTIVE, LAPSED, MATURED

    policyHolder: {
      customerId: String,
      fullName: String,
      dateOfBirth: Date,
      gender: String,
      mobile: String,
      email: String,
      address: {
        addressLine1: String,
        village: String,
        mandal: String,
        district: String,
        state: String,
        pincode: String
      },
      kyc: {
        aadhaarNumber: String,
        panNumber: String
      }
    },

    nominee: {
      name: String,
      relationship: String,
      dateOfBirth: Date,
      percentage: Number
    },

    agentDetails: {
      agentCode: String,
      agentName: String,
      branchCode: String
    },

    paymentDetails: {
      paymentMode: String,
      transactionId: String,
      paymentDate: Date,
      paymentStatus: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Policy', PolicySchema);
