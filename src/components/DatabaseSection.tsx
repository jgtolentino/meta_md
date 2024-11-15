export function DatabaseSection() {
  const databases = [
    {
      name: 'PubMed',
      icon: '🔬',
      description: 'Access to over 30 million citations for biomedical literature',
      features: ['Comprehensive indexing', 'Citation tracking', 'Expert-curated content'],
    },
    {
      name: 'Cochrane Library',
      icon: '📚',
      description: 'High-quality systematic reviews and meta-analyses',
      features: ['Evidence-based research', 'Systematic reviews', 'Clinical trials'],
    },
    {
      name: 'Embase',
      icon: '🌐',
      description: 'Comprehensive biomedical literature database',
      features: ['Drug research', 'Clinical insights', 'International coverage'],
    },
    {
      name: 'ClinicalTrials.gov',
      icon: '📊',
      description: 'Database of privately and publicly funded clinical studies',
      features: ['Trial registration', 'Results reporting', 'Study protocols'],
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Access Trusted Research Databases
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Leverage comprehensive data from world-renowned research databases for precise, evidence-based analysis
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {databases.map((db) => (
            <div
              key={db.name}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{db.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{db.name}</h3>
              <p className="text-gray-600 mb-4">{db.description}</p>
              <ul className="space-y-2">
                {db.features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-500 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}