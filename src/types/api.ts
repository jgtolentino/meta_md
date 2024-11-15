export interface OpenAIResponse {
  id: string;
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
  }>;
}

export interface ClaudeResponse {
  id: string;
  content: Array<{
    text: string;
    type: string;
  }>;
}