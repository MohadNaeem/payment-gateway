const {
  processPaymentPayPal,
  processPaymentBraintree,
} = require("../services/payment-gateway");
const { expect } = require("chai");

// Mock payment details
const paymentDetails = {
  amount: 100,
  creditCardType: "visa",
  cardNumber: "4111111111111111",
  expirationMonth: "12",
  expirationYear: "2027",
  ccv: "123",
  customerFullName: "John Doe",
};

describe("Payment Processor", () => {
  describe("processPaymentPayPal", () => {
    it("should process payment using PayPal", async () => {
      const paymentResult = await processPaymentPayPal(paymentDetails);
      expect(paymentResult).to.be.an("object");
      expect(paymentResult.state).to.equal("approved");
    });
  });

  describe("processPaymentBraintree", () => {
    it("should process payment using Braintree", async () => {
      const paymentResult = await processPaymentBraintree(paymentDetails);
      expect(paymentResult).to.be.an("object");
      expect(paymentResult.success).to.be.true;
    });
  });
});
