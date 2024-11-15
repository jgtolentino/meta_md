import { analyzeWithOpenAI } from './openai';
import { analyzeWithClaude } from './anthropic';
import type { AnalysisResults, TaskType } from '@/types/analysis';
import { ApiError } from '../api-client';

export async function analyzeTopicWithHybridApproach(
  topic: string,
  taskType: TaskType
): Promise<AnalysisResults> {
  try {
    switch (taskType) {
      case 'feasibility':
      case 'title':
        return await analyzeWithOpenAI(topic);
      
      case 'database':
        return await analyzeWithClaude(topic);
      
      default:
        throw new ApiError(
          400,
          'Invalid analysis type specified',
          'INVALID_TASK_TYPE'
        );
    }
  } catch (error) {
    // If primary analysis fails, try fallback
    console.warn(`Primary analysis failed for ${taskType}, attempting fallback:`, error);
    
    try {
      return await (taskType === 'database' 
        ? analyzeWithOpenAI(topic) 
        : analyzeWithClaude(topic));
    } catch (fallbackError) {
      console.error('Fallback analysis also failed:', fallbackError);
      throw new ApiError(
        500,
        'Analysis failed with both primary and fallback systems',
        'ANALYSIS_FAILED'
      );
    }
  }
}