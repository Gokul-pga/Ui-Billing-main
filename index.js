const express = require("express");
const http = require("http"); // Import http to create the server
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require('body-parser');

// WebSocket setup
const WebSocket = require("ws");
const server = http.createServer(app); // Create HTTP server with Express
const wss = new WebSocket.Server({ server }); // Attach WebSocket server to the HTTP server

wss.on('connection', (ws) => {
  console.log('New WebSocket connection');
});

// Function to broadcast data to all connected clients
const broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

// Make broadcast function accessible globally
app.set('broadcast', broadcast);

// Your existing routes
const UserRegister = require("./routes/UserRegister");
const UserLogin = require("./routes/UserLogin");
const GetProduct = require("./routes/Product");
const ProductBill = require("./routes/ShopaddreddbillSchema");
const CustomerDetails = require("./routes/CustomerDetails");
const GenerateInvoice = require("./routes/GenerateInvoice");
const stockUpdate = require("./routes/stockUpdate");
const CashFlow = require("./routes/CashFlow");
const BankAccount = require("./routes/BankAccount");

const AddExpence = require("./routes/AddExpence");
const AddIncome = require("./routes/AddIncome");
const initializeCashFlow = require("./Utils/initializeCashFlow");

server.listen(5000, () => {
  console.log("Server connected on port 5000");
});

const MONGOURL = process.env.MONGODB;
mongoose
  .connect(MONGOURL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

initializeCashFlow();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use("/auth", UserRegister);
app.use("/auth", UserLogin);
app.use("/auth/product", GetProduct);
app.use("/api/bill", ProductBill);
app.use("/api/customer", CustomerDetails);
app.use("/api/invoice", GenerateInvoice);
app.use("/stock", stockUpdate);
app.use("/api/cashflow", CashFlow);
app.use("/api/bank", BankAccount);
app.use('/api/addexpence', AddExpence);
app.use('/api/addincome', AddIncome);
