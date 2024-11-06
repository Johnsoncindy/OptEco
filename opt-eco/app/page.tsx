"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line as RechartsLine, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LineChartIcon } from 'lucide-react';

const Dashboard = () => {
  // Sample data - in production this would come from your API
  const energyData = [
    { date: 'Mon', usage: 28, predicted: 30, cost: 42 },
    { date: 'Tue', usage: 32, predicted: 31, cost: 48 },
    { date: 'Wed', usage: 25, predicted: 28, cost: 38 },
    { date: 'Thu', usage: 35, predicted: 33, cost: 52 },
    { date: 'Fri', usage: 30, predicted: 32, cost: 45 },
    { date: 'Sat', usage: 22, predicted: 25, cost: 33 },
    { date: 'Sun', usage: 20, predicted: 22, cost: 30 },
  ];

  const stats = [
    {
      title: "Today's Usage",
      value: "28.5 kWh",
      change: "-12%",
      trend: "decrease"
    },
    {
      title: "Predicted Peak",
      value: "4.2 kW",
      change: "3:00 PM",
      trend: "neutral"
    },
    {
      title: "Monthly Savings",
      value: "$124.50",
      change: "+18%",
      trend: "increase"
    },
    {
      title: "Carbon Footprint",
      value: "342 kg",
      change: "-8%",
      trend: "decrease"
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">EnerWise Dashboard</h1>
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
          Efficiency Score: 92
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <div className={`flex items-center text-sm ${
                  stat.trend === 'increase' ? 'text-green-600' :
                  stat.trend === 'decrease' ? 'text-red-600' :
                  'text-gray-600'
                }`}>
                  {stat.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Energy Usage vs. Prediction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={energyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <RechartsLine
                  type="monotone"
                  dataKey="usage"
                  stroke="#2563eb"
                  name="Actual Usage"
                />
                <RechartsLine
                  type="monotone"
                  dataKey="predicted"
                  stroke="#9333ea"
                  strokeDasharray="5 5"
                  name="Predicted Usage"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Optimization Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <LineChartIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Shift Laundry Time</p>
                  <p className="text-sm text-gray-500">Running your washer during off-peak hours (9 PM - 6 AM) could save $12/month</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <LineChartIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">HVAC Optimization</p>
                  <p className="text-sm text-gray-500">Adjusting your thermostat by 2°F could reduce energy usage by 14%</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <LineChartIcon className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium">Peak Usage Alert</p>
                  <p className="text-sm text-gray-500">Expected peak between 2-4 PM due to high temperatures</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <LineChartIcon className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Solar Production Peak</p>
                  <p className="text-sm text-gray-500">Optimal solar generation expected 11 AM - 2 PM</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
