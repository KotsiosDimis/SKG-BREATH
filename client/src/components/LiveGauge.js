import React from "react";

const LiveGauge = ({ value }) => {
  const max = 50;
  const percent = Math.min((value / max) * 100, 100);
  const strokeDasharray = 440;
  const strokeDashoffset = strokeDasharray - (percent / 100) * strokeDasharray;

  const getColor = (val) => {
    if (val <= 15) return "#22c55e"; // green
    if (val <= 25) return "#f97316"; // orange
    return "#ef4444"; // red
  };

  const getQualityText = (val) => {
    if (val <= 15) return "Καλή ποιότητα";
    if (val <= 25) return "Μέτρια ποιότητα";
    return "Κακή ποιότητα";
  };

  const color = getColor(value);
  const quality = getQualityText(value);

  return (
    <div className="flex items-center justify-center h-[50vh]">
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
  <div
    className="position-relative"
    style={{
      width: 'min(80vw, 300px)',
      height: 'min(80vw, 300px)',
    }}
  >
    <svg
      className="w-100 h-100"
      viewBox="0 0 180 180"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="90"
        cy="90"
        r="70"
        stroke="#e5e7eb"
        strokeWidth="15"
        fill="none"
      />
      <circle
        cx="90"
        cy="90"
        r="70"
        stroke={color}
        strokeWidth="15"
        fill="none"
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform="rotate(-90 90 90)"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#1f2937"
        fontSize="14"
        fontWeight="bold"
      >
        {value} μg/m³
      </text>
      <text
        x="50%"
        y="60%"
        textAnchor="middle"
        dominantBaseline="central"
        fill={color}
        fontSize="12"
      >
        {quality}
      </text>
    </svg>
  </div>
</div>

  </div>

  );
};

export default LiveGauge;
