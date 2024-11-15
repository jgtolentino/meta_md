import { ArrowDown } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="text-center max-w-4xl mx-auto space-y-8 animate-fade-in">
      <h1 className="text-6xl font-bold text-gray-900 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
        Project Meta: Advanced Research Intelligence Platform
      </h1>
      <p className="text-2xl text-gray-600">
        Empowering your research with precision and trusted analytics
      </p>
      <div className="flex justify-center space-x-6">
        <button
          onClick={() => {
            document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105"
        >
          <span>Start Your Research Today</span>
          <ArrowDown className="w-5 h-5 group-hover:animate-bounce" />
        </button>
      </div>
    </div>
  );
}