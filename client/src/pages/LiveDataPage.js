import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";

const LiveDataPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://skg-breath.onrender.com/api/live-air")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Σφάλμα κατά τη λήψη live δεδομένων:", err));
  }, []);

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("el-GR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-xl font-semibold mb-4">
          Ζωντανά Δεδομένα Ρύπανσης - Θεσσαλονίκη
        </h1>
        {data ? (
          <div className="border rounded p-4 shadow">
            <p><strong>Σταθμός:</strong> {data.station}</p>
            <p><strong>Ρύπος:</strong> {data.parameter}</p>
            <p><strong>Τιμή:</strong> {data.value} {data.unit}</p>
            <p><strong>Από:</strong> {formatDateTime(data.from)}</p>
            <p><strong>Έως:</strong> {formatDateTime(data.to)}</p>
            <p><strong>Ώρα Λήψης:</strong> {formatDateTime(data.requestedAt)}</p>
            <p className="text-sm text-gray-500 mt-2">
              Πηγή δεδομένων:{" "}
              <a
                href="https://openaq.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                OpenAQ
              </a>
            </p>
          </div>
        ) : (
          <p>Φόρτωση δεδομένων...</p>
        )}
      </div>
    </Layout>
  );
};

export default LiveDataPage;
