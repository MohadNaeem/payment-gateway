const paymentGateway = require("../services/payment-gateway");

function processPayment(req, res) {
  const { creditCardNumber, currency } = req.body;
  const paymentDetails = {
    amount: req.body?.amount,
    currency,
    customerFullName: req.body?.cardHolderName,
    creditCardType: getCreditCardType(creditCardNumber),
    cardNumber: creditCardNumber,
    expirationMonth: req.body?.expirationMonth,
    expirationYear: req.body?.expirationYear,
    ccv: req.body?.ccv,
  };

  console.log(req.body);

  if (
    currency === "USD" ||
    currency === "EUR" ||
    currency === "AUD" ||
    creditCardNumber.startsWith("3")
  ) {
    paymentGateway
      .processPaymentPayPal(paymentDetails)
      .then((paymentResult) => {
        res.send({
          message: `Payment Succcesful using paypal`,
        });
      })
      .catch((error) => {
        res.status(500).send({
          message: `Payment failed because ${error.response?.message} using paypal`,
        });
      });
  } else {
    paymentGateway
      .processPaymentBraintree(paymentDetails)
      .then((paymentResult) => {
        res.send({
          ...paymentResult,
          message: `Payment successful with id ${paymentResult.transaction?.id} using braintree`,
        });
        console.log("Success");
      })
      .catch((error) => {
        console.log(error.message);
        res.status(500).send(error);
      });
  }
}

function getCreditCardType(number) {
  if (number.startsWith("3")) return "AMEX";
  if (number.startsWith("4")) return "VISA";
}

module.exports = { processPayment };
