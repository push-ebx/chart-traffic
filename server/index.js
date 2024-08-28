import dotenv from 'dotenv';
import express from 'express';
import cors from "cors";
import fetch from "node-fetch";
import https from 'https';

dotenv.config();

const app = express();
const port = process.env.PORT;


const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

app.use(cors())

app.get('/traffic', async (req, res) => {
  const traffic_res = await fetch(process.env.TRAFFIC_URL, {
    method: 'GET',
    agent: httpsAgent,
  });

  const traffic = await traffic_res.json();  

  const profiles_res = await fetch(process.env.PROFILES_URL, {
    method: 'GET',
    agent: httpsAgent,
  });
  
  const raw_profiles = await profiles_res.json();
  const data = raw_profiles.accessKeys.map(key => ([ 
    key.name,
    Math.round(traffic.bytesTransferredByUserId[key.id] / 10_000_000) / 100,
  ]));
  
  res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})