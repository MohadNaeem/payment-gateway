--  Create Database; 
CREATE DATABASE payments;

-- use Database 
use payments

-- Create table transactions ; 
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  payment_method VARCHAR(50),
  payment_gateway VARCHAR(50),
  payment_gateway_response JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);