const request = require("supertest");
const app = require("../index");

describe("Express Server", () => {
  describe("POST /api/payment", () => {
    test("should process payment with PayPal for USD currency", async () => {
      const paymentData = {
        creditCardNumber: "4111111111111111",
        currency: "USD",
        amount: 100,
        cardHolderName: "John Doe",
        expirationMonth: "12",
        expirationYear: "2023",
        ccv: "123",
      };

      const response = await request(app)
        .post("/api/payment")
        .send(paymentData);

      expect(response.status).toBe(200);
      expect(response.body.message).toContain(
        "Payment Succcesful using paypal"
      );
    });

    test("should process payment with Braintree for non-USD currency", async () => {
      const paymentData = {
        creditCardNumber: "4111111111111111",
        currency: "EUR",
        amount: 100,
        cardHolderName: "John Doe",
        expirationMonth: "12",
        expirationYear: "2023",
        ccv: "123",
      };

      const response = await request(app)
        .post("/api/payment")
        .send(paymentData);

      expect(response.status).toBe(200);
      expect(response.body.message).toContain("Payment successful with id");
    });
  });
});
