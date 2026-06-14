'use client';

import { Card, CardBody, CardHeader, Button } from '@/components';
import { useState } from 'react';

export default function Booking() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [doctor, setDoctor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ date, time, doctor });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Book an Appointment</h1>

        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-slate-900">Appointment Details</h2>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="doctor" className="block text-sm font-medium text-slate-700 mb-2">
                  Select Doctor
                </label>
                <select
                  id="doctor"
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                >
                  <option value="">Choose a doctor...</option>
                  <option value="dr-smith">Dr. Smith</option>
                  <option value="dr-johnson">Dr. Johnson</option>
                </select>
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-2">
                  Appointment Date
                </label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-slate-700 mb-2">
                  Appointment Time
                </label>
                <input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>

              <Button type="submit" size="lg" fullWidth>
                Book Appointment
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
