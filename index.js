const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

if (!module.parent) {
  const server = app.listen(9000, function () {
    const port = server.address().port;
    console.log('Example app listening at http://localhost:%s', port);
  });
}

module.exports = app;
