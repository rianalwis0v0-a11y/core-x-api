const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Allow frontend to call this API

function getCoreXReply(text) {
  text = text.toLowerCase();

  if (text.includes("hello")) return "Hello! I'm Core X.";
  if (text.includes("your name")) return "I'm Core X, your assistant!";
  if (text.includes("how are you")) return "Feeling smart and ready to help!";
  if (text.includes("time")) return "It's currently " + new Date().toLocaleTimeString();
  if (text.includes("joke")) return "Why was the robot bad at soccer? Because it kept kicking up sparks!";
  if (text.match(/\d+ \+ \d+/)) {
    const parts = text.match(/(\d+) \+ (\d+)/);
    const sum = parseInt(parts[1]) + parseInt(parts[2]);
    return `That equals ${sum}.`;
  }

  return "I'm not sure how to answer that yet!";
}

app.get('/ask', (req, res) => {
  const question = req.query.q || "";
  const reply = getCoreXReply(question);
  res.json({ reply });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Core X API is running on port ${port}`);
});
