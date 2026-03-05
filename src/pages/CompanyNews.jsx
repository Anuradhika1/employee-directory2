import React from "react";

const CompanyNews = () => {
  const newsList = [
    { id: 1, title: "Quarterly Meeting", date: "2026-03-01" },
    { id: 2, title: "New HR Policy", date: "2026-03-02" },
  ];

  return (
    <div className="center-page">
      <div className="company-title">ABC Company</div>
      <h2>Company News</h2>

      <div className="card">
        <h3>About ABC Company</h3>
        <p style={{ color: "#555" }}>
          ABC Company is committed to excellence, innovation, and employee growth.
          We believe in teamwork, transparency, and creating a positive work
          environment for everyone.
        </p>

        <hr style={{ margin: "20px 0" }} />

        <h3>Latest Updates</h3>
        <ul style={{ textAlign: "left" }}>
          {newsList.map(news => (
            <li key={news.id}>
              <strong>{news.title}</strong> - {news.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CompanyNews;