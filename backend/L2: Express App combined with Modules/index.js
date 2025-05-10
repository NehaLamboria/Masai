const express = require('express');
const os = require('os');
const dns = require('dns');
const readFileContent = require('./read');

const app = express();
const PORT = 3000;

// /test route
app.get('/test', (req, res) => {
  res.send('Test route is working!');
});

// /readfile route
app.get('/readfile', (req, res) => {
  try {
    const content = readFileContent();
    res.send(content);
  } catch (err) {
    res.status(500).send('Error reading the file.');
  }
});

// /systemdetails route
app.get('/systemdetails', (req, res) => {
  const systemInfo = {
    platform: os.platform(),
    totalMemory: `${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB`,
    freeMemory: `${(os.freemem() / (1024 ** 3)).toFixed(2)} GB`,
    cpuModel: os.cpus()[0].model
  };
  res.json(systemInfo);
});

// /getip route
app.get('/getip', (req, res) => {
  dns.lookup('masaischool.com', (err, address) => {
    if (err) return res.status(500).send('Error resolving DNS.');
    res.json({ hostname: 'masaischool.com', ipAddress: address });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
