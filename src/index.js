const express = require("express");
const paymentController = require("./controller/payment-controller");
const cors = require("cors");

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

const app = express();
const port = 3005;

app.use(express.json());
app.use(cors(corsOptions));

app.post("/api/payment", paymentController.processPayment);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
