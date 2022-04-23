const express = require("express");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

// Set static ../api response
// app.get("/api", (req, res) => {
//   res.json({ success: true });
// });

// Enable cors
app.use(cors());

// Set static folder
app.use(express.static("public"));

// Routes
app.use("/api", require("./routes"));

app.listen(PORT, () => console.log(`Server on Port ${PORT}`));
