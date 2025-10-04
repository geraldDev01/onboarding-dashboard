'use client';

import Link from 'next/link';
import { Button } from '@/components/ui';
import { ArrowLeft } from 'lucide-react';

export function BackButton() {
  return (
    <Link href="/employees">
      <Button>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to list
      </Button>
    </Link>
  );
}