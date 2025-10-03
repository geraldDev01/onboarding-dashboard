import { Card } from '@/components/ui';

export default function Dashboard() {
  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome to your HR management dashboard</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            title="Employees"
            description="Manage your team members and employee data"
            actionText="View Employees"
            href="/employees"
          />
          <Card
            title="Reports"
            description="Generate and view HR reports"
            actionText="View Reports"
            href="/reports"
          />
        </div>
      </div>
 
  );
}
