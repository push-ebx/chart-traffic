const dotenv = require('dotenv');
const express = require('express')
const cors = require("cors");
const { exec } = require('child_process');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors())

app.get('/', async (req, res) => {
  //   const result = await fetch(process.env.URL);
  exec(`curl -k ${process.env.URL}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
      }
      console.log(`Stdout: ${stdout}`);
    });
  res.send('result');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})