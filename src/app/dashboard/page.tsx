'use client';

import { Card, CardBody, CardHeader } from '@/components';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-slate-900">Appointments</h3>
            </CardHeader>
            <CardBody>
              <p className="text-4xl font-bold text-indigo-600">0</p>
              <p className="text-slate-600 text-sm mt-2">Scheduled this month</p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-slate-900">Doctors</h3>
            </CardHeader>
            <CardBody>
              <p className="text-4xl font-bold text-indigo-600">0</p>
              <p className="text-slate-600 text-sm mt-2">Available</p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-slate-900">Patients</h3>
            </CardHeader>
            <CardBody>
              <p className="text-4xl font-bold text-indigo-600">0</p>
              <p className="text-slate-600 text-sm mt-2">Registered</p>
            </CardBody>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-slate-900">Recent Activity</h2>
          </CardHeader>
          <CardBody>
            <p className="text-slate-600">No recent activity</p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
