"use client";
import clsx from 'clsx';
import { DateTime } from 'luxon';

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  const currentYear = DateTime.now().year;

  return (
    <footer className={clsx('bg-white dark:bg-background border-t border-gray-200 dark:border-border', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} RebuHR. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
