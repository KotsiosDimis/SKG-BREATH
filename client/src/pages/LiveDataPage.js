import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import LiveGauge from "../components/LiveGauge";

const LiveDataPage = () => {
  const [data, setData] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/live-air`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) =>
        console.error("Σφάλμα κατά τη λήψη live δεδομένων:", err)
      );
  }, []);

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return isNaN(date.getTime())
      ? "Άγνωστη ώρα"
      : date.toLocaleString("el-GR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
  };

  return (
    <Layout>
      {data ? (
        <>
          <LiveGauge value={data.value} />
          <div className="px-4">
            <div className="border rounded p-4 shadow mb-6">
              <p><strong>Σταθμός:</strong> {data.station}</p>
              <p><strong>Ρύπος:</strong> {data.parameter}</p>
              <p><strong>Τιμή:</strong> {data.value} {data.unit}</p>
              {data.requestedAt && (
                <p><strong>Ώρα Λήψης:</strong> {formatDateTime(data.requestedAt)}</p>
              )}
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
          </div>
        </>
      ) : (
        <div className="p-4">
          <p>Φόρτωση δεδομένων...</p>
        </div>
      )}
    </Layout>
  );
};

export default LiveDataPage;
