import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

interface AcademicIntegrityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
}

export function AcademicIntegrityModal({ open, onOpenChange, onAccept }: AcademicIntegrityModalProps) {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    if (accepted) {
      onAccept();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Academic Integrity Statement</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-gray-600">
            This platform supports ethical research practices. By using this service, you agree to comply with institutional guidelines and avoid compromising academic integrity.
          </p>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={accepted}
              onCheckedChange={(checked) => setAccepted(checked as boolean)}
            />
            <label 
              htmlFor="terms" 
              className="text-sm text-gray-700 cursor-pointer"
            >
              I understand and agree to uphold academic integrity guidelines
            </label>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button
            onClick={handleAccept}
            disabled={!accepted}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400"
          >
            Accept and Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}