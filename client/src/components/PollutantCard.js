const PollutantCard = ({ title, unit, source, safeLevel, qualityLevels, sourceLink }) => {
  return (
    <div className="card h-100 d-flex flex-column">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">
          <strong>Μονάδα:</strong> {unit}<br />
          <strong>Πηγή:</strong> {source}<br />
          <strong>Ασφαλή επίπεδα:</strong><br />
          {safeLevel}
        </p>
      </div>

      <ul className="list-group list-group-flush mt-auto">
        {qualityLevels.map((level, index) => (
          <li className="list-group-item" key={index}>
            <strong>{level.label}:</strong> {level.range}
          </li>
        ))}
        <li className="list-group-item">
          Πηγή: <a href={sourceLink.url} target="_blank" rel="noopener noreferrer">
            {sourceLink.text}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default PollutantCard;


