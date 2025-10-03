import React from 'react';
import { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface InfoCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  className?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  icon: Icon,
  label,
  value,
  className = '',
}) => {
  return (
    <div className={clsx(
      'flex items-center p-4 bg-primary/5 rounded-lg border border-primary/10',
      className
    )}>
      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-3">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-sm font-medium text-primary">{label}</p>
        <p className="text-lg font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
};
