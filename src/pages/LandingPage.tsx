import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/SearchBar';
import { ErrorMessage } from '@/components/ErrorMessage';
import { ResultsDialog } from '@/components/ResultsDialog';
import { HeroSection } from '@/components/HeroSection';
import { DatabaseSection } from '@/components/DatabaseSection';
import { SubscriptionPlans } from '@/components/SubscriptionPlans';
import { Footer } from '@/components/Footer';
import { AcademicIntegrityModal } from '@/components/AcademicIntegrityModal';
import { Loader2 } from 'lucide-react';
import { analyzeResearchTopic } from '@/lib/api-client';
import type { AnalysisResults } from '@/types/analysis';

export default function LandingPage() {
  const [searchTopic, setSearchTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showIntegrityModal, setShowIntegrityModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

  const handleAnalyze = async () => {
    if (!searchTopic.trim()) {
      setError('Please enter a valid research topic');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const results = await analyzeResearchTopic(searchTopic);
      setResults(results);
      setShowResults(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribe = (plan: string) => {
    setSelectedPlan(plan);
    if (!hasAcceptedTerms) {
      setShowIntegrityModal(true);
    } else {
      initiateSubscription(plan);
    }
  };

  const handleIntegrityAccept = () => {
    setHasAcceptedTerms(true);
    if (selectedPlan) {
      initiateSubscription(selectedPlan);
    }
  };

  const initiateSubscription = (plan: string) => {
    console.log(`Initiating subscription for ${plan} plan`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="relative">
        <div className="container mx-auto px-4 py-16">
          <HeroSection />

          <div id="search-section" className="max-w-xl mx-auto mt-16 space-y-4">
            <SearchBar 
              value={searchTopic}
              onChange={(e) => setSearchTopic(e.target.value)}
              onSubmit={handleAnalyze}
            />

            {error && <ErrorMessage message={error} />}

            <Button
              className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white transform transition-all duration-300 hover:scale-105"
              onClick={handleAnalyze}
              disabled={!searchTopic.trim() || isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center space-x-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Analyzing...</span>
                </span>
              ) : (
                'Analyze My Topic'
              )}
            </Button>
          </div>
        </div>
      </div>

      <ResultsDialog
        open={showResults}
        onOpenChange={setShowResults}
        searchTopic={searchTopic}
        error={error}
        results={results}
      />

      <AcademicIntegrityModal
        open={showIntegrityModal}
        onOpenChange={setShowIntegrityModal}
        onAccept={handleIntegrityAccept}
      />

      <DatabaseSection />

      <SubscriptionPlans
        onSubscribe={handleSubscribe}
        recommendedPlan={results?.recommendedPlan}
        hasAcceptedTerms={hasAcceptedTerms}
      />

      <Footer />
    </div>
  );
}