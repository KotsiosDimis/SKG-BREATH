import React, { useEffect, useState } from "react";

const LiveDataPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/live-air")
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
      second: "2-digit",
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Ζωντανά Δεδομένα Ρύπανσης - Θεσσαλονίκη</h1>
      {data ? (
        data.results.map((station) => (
          <div key={station.location} className="mb-4 border-b pb-2">
            <h2 className="font-semibold">{station.location}</h2>
            <ul>
              {station.measurements.map((m) => (
                <li key={m.parameter}>
                  {m.parameter.toUpperCase()}: {m.value} {m.unit}{" "}
                  <span className="text-sm text-gray-500">
                    (τελ. ενημέρωση: {formatDateTime(m.lastUpdated)})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>Φόρτωση δεδομένων...</p>
      )}
    </div>
  );
};

export default LiveDataPage;
