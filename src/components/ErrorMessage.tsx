import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center space-x-2">
    <AlertCircle className="w-5 h-5" />
    <span>{message}</span>
  </div>
);