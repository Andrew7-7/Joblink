import React from 'react';

const DummyCompanies = [
  { name: "Tech Innovators", email: "contact@techinnovators.com" },
  { name: "Green Solutions", email: "info@greensolutions.com" },
  { name: "Future Enterprises", email: "hello@futureenterprises.com" },
  { name: "NextGen Corp", email: "support@nextgencorp.com" },
  { name: "Eco Ventures", email: "team@ecoventures.com" },
];

const CompanyCard = () => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {DummyCompanies.map((company, index) => (
      <div
        key={index}
        className="border-infinite/20 hover:border-infinite/40 transform rounded-xl border bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
      >
        <div className="mb-4 flex items-center">
          <span className="bg-infinite/10 mr-4 rounded-full p-3 text-4xl">🏢</span>
          <span className="text-xl font-bold tracking-tight text-black">{company.name}</span>
        </div>
        <div className="text-infinite text-lg font-medium">
          <span className="block">Email: {company.email}</span>
        </div>
      </div>
    ))}
  </div>
);

export default CompanyCard;
