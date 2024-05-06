module.exports = {
  environment: "Sandbox",
  logging: {
    enabled: true,
    level: "info",
  },
  paymentGateways: {
    braintree: {
      merchantId: "bs8ndwjx5mjndsc8",
      publicKey: "jsj3fnjw6563p7tn",
      privateKey: "613d3cb6733523b59605094316cb39cc",
    },
    paypal: {
      // Add configuration for PayPal if you integrate it
      client_id: "Add_Id",
      client_secret: "Add_secret",
    },
  },
  db: {
    user: "me",
    host: "localhost",
    database: "payments",
    password: "12345678A@",
    port: 5432,
  },
};
