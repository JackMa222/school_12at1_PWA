const express = require("express");
const path = require("path");
const app = express();

// Introduce sqlite3 and database
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(".database/main_data.db")

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
app.listen(8000, () => console.log("Server is running on Port 8000, visit http://localhost:8000/ or http://127.0.0.1:8000 to access your website") );
