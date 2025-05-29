const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await fetch("https://api.openaq.org/v2/latest?city=Thessaloniki&country=GR");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Σφάλμα κατά την ανάκτηση live δεδομένων:", error);
    res.status(500).json({ error: "Αποτυχία λήψης ζωντανών δεδομένων" });
  }
});

module.exports = router;
