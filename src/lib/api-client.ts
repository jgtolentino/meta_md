import { analyzeTopicWithHybridApproach } from './api/analysis';
import type { AnalysisResults } from '@/types/analysis';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const MAX_RETRIES = 3;
const INITIAL_DELAY = 1000;

async function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  retries: number = MAX_RETRIES,
  delay: number = INITIAL_DELAY
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (retries === 0) throw error;
    
    console.warn(`Operation failed, retrying in ${delay}ms...`, error);
    await wait(delay);
    
    return retryWithBackoff(
      operation,
      retries - 1,
      delay * 2
    );
  }
}

export async function analyzeResearchTopic(topic: string): Promise<AnalysisResults> {
  if (!topic.trim()) {
    throw new ApiError(400, 'Please enter a valid research topic');
  }

  const startTime = Date.now();
  console.log(`Starting analysis for topic: ${topic}`);

  try {
    const [feasibility, titles, databases] = await Promise.all([
      retryWithBackoff(() => analyzeTopicWithHybridApproach(topic, 'feasibility')),
      retryWithBackoff(() => analyzeTopicWithHybridApproach(topic, 'title')),
      retryWithBackoff(() => analyzeTopicWithHybridApproach(topic, 'database'))
    ]);

    console.log(`Analysis completed in ${Date.now() - startTime}ms`);

    return {
      ...feasibility,
      suggestedTitles: titles.suggestedTitles,
      recommendedDatabases: databases.recommendedDatabases
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Analysis failed:', error);
    
    if (error instanceof ApiError) {
      throw error;
    }

    if (errorMessage.includes('rate limit')) {
      throw new ApiError(429, 'Too many requests. Please try again in a few moments.', 'RATE_LIMIT');
    }
    
    if (errorMessage.includes('timeout')) {
      throw new ApiError(408, 'The analysis is taking longer than expected. Please try again.', 'TIMEOUT');
    }

    throw new ApiError(
      500,
      'We encountered an issue analyzing your topic. Please try again in a few moments.',
      'ANALYSIS_FAILED'
    );
  }
}