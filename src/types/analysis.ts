export type TaskType = 'feasibility' | 'title' | 'database';

export interface FeasibilityScores {
  literature: number;
  researchGap: number;
  clinicalRelevance: number;
  feasibility: number;
  fundingPotential: number;
}

export interface AnalysisResults {
  feasibilityScore: number;
  dataAvailability: number;
  timeRequirement: number;
  resourceAccess: number;
  methodologyClarity: number;
  detailedScores: FeasibilityScores;
  recommendedPlan: string;
  suggestedTitles?: string[];
  recommendedDatabases?: string[];
}