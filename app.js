const express = require("express");
const app = express();

const quotes = ["Be happy", "Be humble", "Be kind", "Learn to learn", "Be friendly"];
app.get("/", (req, res) => res.send("It works!"));
app.get("/greeting", (req, res) => res.send("Hello, friend! It's a simple and useful api for learning."));
app.get("/wisdom", (req, res) => {
  var randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.status(200);
  res.send(randomQuote);
});

app.listen(80, () => {
  console.log("listening port 80");
});
