const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express(); 

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

//   app.get('/', (req, res) => {
//     res.send('SoleVault Backend is running!');
//   });


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));