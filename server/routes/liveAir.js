const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const apiKey = process.env.OPENAQ_API_KEY;
    const sensorId = "7773691"; // AGIA SOFIA – PM2.5

    const response = await fetch(`https://api.openaq.org/v3/sensors/${sensorId}/measurements?limit=1`, {
      headers: {
        "X-API-Key": apiKey,
      },
    });

    const status = response.status;
    const body = await response.text();

    console.log("OpenAQ Response Status:", status);
    console.log("OpenAQ Response Body:", body);

    if (!response.ok) {
      return res.status(status).json({ error: "OpenAQ API Error", details: body });
    }

    const data = JSON.parse(body);
    res.json({
      station: "AGIA SOFIA",
      parameter: "PM2.5",
      value: data.results[0].value,
      unit: data.results[0].parameter.units,
      from: data.results[0].period.datetimeFrom.local,
      to: data.results[0].period.datetimeTo.local,
    });
  } catch (error) {
    console.error("Σφάλμα κατά την ανάκτηση ζωντανών δεδομένων:", error);
    res.status(500).json({ error: "Σφάλμα διακομιστή" });
  }
});

module.exports = router;
