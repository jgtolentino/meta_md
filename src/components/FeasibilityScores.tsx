import { type FeasibilityScores } from '@/types/analysis';
import { MetricProgress } from './MetricProgress';

interface FeasibilityScoresProps {
  scores: FeasibilityScores;
}

export function FeasibilityScores({ scores }: FeasibilityScoresProps) {
  const metrics = [
    { label: "Availability of Literature", value: scores.literature },
    { label: "Research Gap", value: scores.researchGap },
    { label: "Clinical Relevance", value: scores.clinicalRelevance },
    { label: "Feasibility", value: scores.feasibility },
    { label: "Funding Potential", value: scores.fundingPotential },
  ];

  return (
    <div className="space-y-4">
      {metrics.map((metric, index) => (
        <MetricProgress
          key={index}
          label={metric.label}
          value={(metric.value / 5) * 100}
        />
      ))}
    </div>
  );
}