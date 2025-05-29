const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

const API_KEY = process.env.OPENAQ_API_KEY;
const SENSOR_ID = "7773691"; // AGIA SOFIA PM2.5

router.get("/", async (req, res) => {
  try {
    const url = `https://api.openaq.org/v3/sensors/${SENSOR_ID}/measurements?limit=1`;

    const response = await fetch(url, {
      headers: { "X-API-Key": API_KEY },
    });

    const status = response.status;
    const body = await response.text();
    console.log("OpenAQ Response Status:", status);
    console.log("OpenAQ Response Body:", body);

    if (!response.ok) {
      return res.status(status).json({ error: "OpenAQ API Error", details: body });
    }

    const data = JSON.parse(body);
    const result = data.results[0];

    const output = {
      station: "AGIA SOFIA",
      parameter: result.parameter.name.toUpperCase(),
      value: result.value,
      unit: result.parameter.units,
      from: result.period.datetimeFrom.local,
      to: result.period.datetimeTo.local,
    };

    res.json(output);
  } catch (error) {
    console.error("Σφάλμα κατά την ανάκτηση δεδομένων:", error);
    res.status(500).json({ error: "Σφάλμα backend" });
  }
});

module.exports = router;
