import { Progress } from '@/components/ui/progress';

export const MetricProgress = ({ label, value }: { label: string; value: number }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <Progress value={value} className="h-2" />
  </div>
);