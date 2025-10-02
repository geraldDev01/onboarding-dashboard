"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Building2, Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { NavbarProps } from './types';

export const Navbar: React.FC<NavbarProps> = ({
  items,
  brandName = "Onboarding Dashboard",
  logoHref = "/",
  className = "",
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={clsx('relative bg-white dark:bg-background shadow-sm border-b border-gray-200 dark:border-border', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={logoHref} className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold">{brandName}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            {items.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={handleItemClick}
                className={clsx(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  {
                    'bg-secondary text-secondary-foreground': item.isActive,
                    'text-muted-foreground hover:text-foreground hover:bg-secondary/50': !item.isActive,
                  }
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 dark:text-foreground hover:bg-gray-100 dark:hover:bg-secondary"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-white dark:bg-background border-b border-gray-200 dark:border-border shadow-lg z-50">
            <div className="px-4 py-3 space-y-1">
              {items.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={handleItemClick}
                  className={clsx(
                    'block px-3 py-2 rounded-md text-base font-medium transition-colors',
                    {
                      'bg-secondary text-secondary-foreground': item.isActive,
                      'text-muted-foreground hover:text-foreground hover:bg-secondary/50': !item.isActive,
                    }
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;