import { BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2 font-headline text-lg font-semibold', className)}>
      <BrainCircuit className="h-6 w-6" />
      <span>MentorAI</span>
    </div>
  );
}
