import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-20">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Star className="w-4 h-4 mr-2" />
              Trusted by 200+ companies
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Streamline your
              <span className="text-primary block">employee onboarding</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Automate the entire onboarding process from paperwork to training. 
              Create seamless experiences for new hires while reducing administrative burden.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <Link 
                href="/login"
                className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link 
                href="/dashboard"
                className="w-full sm:w-auto border border-border px-8 py-4 rounded-lg font-semibold hover:bg-secondary/50 transition-colors"
              >
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}