const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const API_KEY = process.env.OPENAQ_API_KEY;
const SENSOR_ID = "7773691"; // AGIA SOFIA - PM2.5

router.get("/", async (req, res) => {
  try {
    const url = `https://api.openaq.org/v3/sensors/${SENSOR_ID}/measurements?limit=1&sort=desc`;

    const response = await fetch(url, {
      headers: {
        "X-API-Key": API_KEY,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAQ API Error", errorText);
      return res.status(response.status).json({
        error: "OpenAQ API Error",
        details: errorText,
      });
    }

    const data = await response.json();
    const m = data.results[0];

    res.json({
      station: "AGIA SOFIA",
      parameter: m.parameter.name.toUpperCase(),
      value: m.value,
      unit: m.parameter.units,
      from: m.period.datetimeFrom.local,
      to: m.period.datetimeTo.local,
      requestedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Σφάλμα:", error);
    res.status(500).json({ error: "Αποτυχία λήψης ζωντανών δεδομένων" });
  }
});

module.exports = router;
