const { Pool } = require("pg");
const config = require("../../config");

const pool = new Pool({
  ...config.db,
});

async function saveTransaction(data) {
  const client = await pool.connect();
  try {
    await client.query(
      "INSERT INTO transactions (amount, currency, customer_name, payment_method, payment_gateway, payment_gateway_response) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        data.amount || 0,
        data.currency || "",
        data.cardHolderName || "",
        data.paymentMethod || "",
        data.paymentGatewayUsed || "",
        data.paymentMethodNonce || data.paymentGatewayResponse || {}, // Adjust based on your payment gateway
      ]
    );
    const rows = await client.query("SELECT * FROM transactions");
    console.log("Row - Added");
  } catch (error) {
    console.error("Error saving transaction:", error);
    throw error; // Re-throw the error to stop processing
  } finally {
    client.release();
  }
}

module.exports = { saveTransaction };
