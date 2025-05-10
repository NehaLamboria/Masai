const express = require('express');
const app = express();
const PORT = 3000;

// Route: /home
app.get('/home', (req, res) => {
  res.send('This is home page');
});

// Route: /contactus
app.get('/contactus', (req, res) => {
  res.send('Contact us at contact@contact.com');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
