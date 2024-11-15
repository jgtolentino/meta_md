import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ErrorMessage } from './ErrorMessage';
import { MetricProgress } from './MetricProgress';
import { FeasibilityScores } from './FeasibilityScores';
import type { AnalysisResults } from '@/types/analysis';

export function ResultsDialog({ 
  open, 
  onOpenChange, 
  searchTopic, 
  error, 
  results 
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  searchTopic: string;
  error: string | null;
  results: AnalysisResults | null;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Research Feasibility Analysis</DialogTitle>
          <p className="text-gray-600 mt-2">Analysis for: <strong>{searchTopic}</strong></p>
        </DialogHeader>

        {error && <ErrorMessage message={error} />}

        {results && (
          <div className="space-y-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">{results.feasibilityScore}%</div>
              <div className="text-sm text-gray-600">Overall Research Viability Score</div>
            </div>

            <div className="space-y-4">
              <MetricProgress label="Data Availability" value={results.dataAvailability} />
              <MetricProgress label="Time Requirement" value={results.timeRequirement} />
              <MetricProgress label="Resource Access" value={results.resourceAccess} />
              <MetricProgress label="Methodology Clarity" value={results.methodologyClarity} />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <h4 className="font-semibold">Detailed Research Analysis</h4>
              <FeasibilityScores scores={results.detailedScores} />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Recommended Research Plan</h4>
              <p className="text-sm text-gray-600">
                Based on your analysis, we recommend the <span className="font-semibold">{results.recommendedPlan}</span>.
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            onClick={() => onOpenChange(false)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}