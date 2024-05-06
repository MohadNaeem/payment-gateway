const express = require("express");
const paypal = require("paypal-rest-sdk");
const braintree = require("braintree");
const db = require("../db/db");
const config = require("../../config");

// Configure PayPal with your credentials (obtained from your developer account)
paypal.configure({
  mode: "sandbox", // Set to 'live' for production
  ...config.paymentGateways.paypal,
});

// Configure Braintree with your credentials (obtained from your developer account)
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox, // Set to 'Production' for production
  ...config.paymentGateways.braintree,
});

// Function to process payment using PayPal
function processPaymentPayPal(paymentDetails) {
  return new Promise((resolve, reject) => {
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "credit_card",
        funding_instruments: [
          {
            credit_card: {
              type: paymentDetails.creditCardType,
              number: paymentDetails.cardNumber,
              expire_month: paymentDetails.expirationMonth,
              expire_year: paymentDetails.expirationYear,
              cvv2: paymentDetails.ccv,
              first_name: paymentDetails.customerFullName.split(" ")[0],
              last_name: paymentDetails.customerFullName.split(" ")[1],
              billing_address: {
                line1: "Moscow", // Add billing address details if needed
                country_code: "UK",
              },
            },
          },
        ],
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: "Your Product/Service",
                price: paymentDetails.amount,
                currency: "USD",
                quantity: 1,
              },
            ],
          },
          amount: {
            total: paymentDetails.amount,
            currency: "USD",
          },
        },
      ],
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        reject(error);
        console.log(error);
      } else {
        resolve(payment);
        db.saveTransaction(paymentDetails);
        console.log(error);
      }
    });
  });
}

// Function to process payment using Braintree
function processPaymentBraintree(paymentDetails) {
  return new Promise((resolve, reject) => {
    const transaction = {
      amount: paymentDetails?.amount,
      creditCard: {
        number: paymentDetails?.cardNumber,
        expirationMonth: paymentDetails?.expirationMonth,
        expirationYear: paymentDetails?.expirationMonth,
        cvv: paymentDetails?.ccv,
      },
    };

    gateway.transaction.sale(transaction, (error, result) => {
      if (error) {
        reject({
          message: error?.message,
          success: false,
        });
      } else if (result.success) {
        db.saveTransaction(paymentDetails);
        resolve(result);
      } else {
        reject({
          message: result?.message,
        });
      }
    });
  });
}

module.exports = {
  processPaymentPayPal,
  processPaymentBraintree,
};
