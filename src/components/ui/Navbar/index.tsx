"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Building2, Menu, X, LogOut } from 'lucide-react';
import clsx from 'clsx';
import { NavbarProps } from './types';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui';

export const Navbar: React.FC<NavbarProps> = ({
  brandName = "Onboarding Dashboard",
  logoHref = "/",
  className = "",
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
    setIsMobileMenuOpen(false);
  };


  return (
    <nav className={clsx('bg-white dark:bg-background border-b border-border', className)}>
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
          <div className="hidden md:flex items-center space-x-4">
            {!isLoading && user ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
                <span className="text-sm text-muted-foreground">
                  {user.email}
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-1"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <Link
                href="/login"
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-2">
            {!isLoading && user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground"
                >
                  Dashboard
                </Link>
                <div className="pt-2 border-t border-border">
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    {user.email}
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;