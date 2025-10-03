import React from 'react';
import { ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

interface CardProps {
  title: string;
  description: string;
  actionText: string;
  href: string;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  actionText,
  href,
  className = '',
}) => {
  return (
    <div className={clsx(
      'bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200',
      className
    )}>
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {title}
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            {description}
          </p>
        </div>
        <a
          href={href}
          className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-sm transition-colors duration-200"
        >
          {actionText}
          <ArrowRight className="w-4 h-4 ml-1" />
        </a>
      </div>
    </div>
  );
};
