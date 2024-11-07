"use client";
import React, { useState } from "react";
import {
  Home,
  Sun,
  Wind,
  Battery,
  PowerOff,
  Power,
  ThermometerSun,
  Lightbulb,
  WashingMachine,
  AlertTriangle,
  LineChartIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  LineChart,
  Line as RechartsLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Dashboard = () => {
  const [activeDevices, setActiveDevices] = useState({
    thermostat: true,
    lighting: true,
    washer: false,
    dryer: false,
  });

  const [temperature, setTemperature] = useState([72]);

  // Sample data
  const energyData = [
    { date: "Mon", usage: 28, predicted: 30, cost: 42, solar: 12 },
    { date: "Tue", usage: 32, predicted: 31, cost: 48, solar: 15 },
    { date: "Wed", usage: 25, predicted: 28, cost: 38, solar: 10 },
    { date: "Thu", usage: 35, predicted: 33, cost: 52, solar: 14 },
    { date: "Fri", usage: 30, predicted: 32, cost: 45, solar: 16 },
    { date: "Sat", usage: 22, predicted: 25, cost: 33, solar: 13 },
    { date: "Sun", usage: 20, predicted: 22, cost: 30, solar: 11 },
  ];

  const deviceUsage = [
    { name: "HVAC", value: 45, color: "#2563eb" },
    { name: "Appliances", value: 25, color: "#7c3aed" },
    { name: "Lighting", value: 15, color: "#ea580c" },
    { name: "Electronics", value: 15, color: "#059669" },
  ];

  const smartDevices = [
    {
      name: "Thermostat",
      icon: ThermometerSun,
      status: activeDevices.thermostat,
      type: "thermostat",
      currentValue: "72°F",
    },
    {
      name: "Smart Lighting",
      icon: Lightbulb,
      status: activeDevices.lighting,
      type: "lighting",
      currentValue: "80% Brightness",
    },
    {
      name: "Washer",
      icon: WashingMachine,
      status: activeDevices.washer,
      type: "washer",
      currentValue: "Idle",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">EnerWise Dashboard</h1>
          <p className="text-gray-500">
            Welcome back! Your home is running efficiently.
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            Efficiency Score: 92
          </div>
          <Button variant="outline" className="gap-2">
            <Power className="h-4 w-4" />
            Power Mode: Normal
          </Button>
        </div>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Peak Energy Alert</AlertTitle>
        <AlertDescription>
          High energy usage expected between 2-4 PM today. Consider shifting
          heavy appliance usage to off-peak hours.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="devices">Smart Devices</TabsTrigger>
          <TabsTrigger value="solar">Solar Production</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Real-time Usage",
                value: "3.8 kW",
                change: "-0.5 kW",
                trend: "decrease",
                icon: LineChartIcon,
              },
              {
                title: "Solar Generation",
                value: "2.1 kW",
                change: "+0.3 kW",
                trend: "increase",
                icon: Sun,
              },
              {
                title: "Grid Import",
                value: "1.7 kW",
                change: "-0.8 kW",
                trend: "decrease",
                icon: Power,
              },
              {
                title: "Battery Storage",
                value: "85%",
                change: "Charging",
                trend: "neutral",
                icon: Battery,
              },
            ].map((stat) => (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <div
                        className={`flex items-center text-sm ${
                          stat.trend === "increase"
                            ? "text-green-600"
                            : stat.trend === "decrease"
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                      >
                        {stat.change}
                      </div>
                    </div>
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <stat.icon className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Energy Usage Trends</CardTitle>
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
                      <RechartsLine
                        type="monotone"
                        dataKey="solar"
                        stroke="#059669"
                        name="Solar Generation"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Energy Distribution</CardTitle>
                <CardDescription>Current usage by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceUsage}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {deviceUsage.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {deviceUsage.map((device) => (
                      <div
                        key={device.name}
                        className="flex items-center gap-2"
                      >
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: device.color }}
                        />
                        <span className="text-sm text-gray-600">
                          {device.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {smartDevices.map((device) => (
              <Card key={device.name}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <device.icon className="h-5 w-5 text-gray-600" />
                        <p className="font-medium">{device.name}</p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {device.currentValue}
                      </p>
                    </div>
                    <Switch
                      checked={device.status}
                      onCheckedChange={(checked) =>
                        setActiveDevices((prev) => ({
                          ...prev,
                          [device.type]: checked,
                        }))
                      }
                    />
                  </div>
                  {device.type === "thermostat" && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-2">Temperature</p>
                      <Slider
                        value={temperature}
                        onValueChange={setTemperature}
                        max={85}
                        min={65}
                        step={1}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="solar" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Solar Production</CardTitle>
                <CardDescription>Today's generation pattern</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={energyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <RechartsLine
                        type="monotone"
                        dataKey="solar"
                        stroke="#059669"
                        name="Solar Generation"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Energy Flow</CardTitle>
                <CardDescription>Current power distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Sun className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">Solar Panels</p>
                        <p className="text-sm text-gray-500">Generating</p>
                      </div>
                    </div>
                    <p className="font-bold">2.1 kW</p>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Home className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Home Usage</p>
                        <p className="text-sm text-gray-500">Consuming</p>
                      </div>
                    </div>
                    <p className="font-bold">3.8 kW</p>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Battery className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-medium">Battery</p>
                        <p className="text-sm text-gray-500">Charging</p>
                      </div>
                    </div>
                    <p className="font-bold">0.5 kW</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Energy Saving Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <ThermometerSun className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">HVAC Optimization</p>
                      <p className="text-sm text-gray-500">
                        Your HVAC system is running 20% more than optimal.
                        Consider adjusting the temperature by 2°F to save up to
                        $30/month.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-yellow-100 p-2 rounded-lg">
                      <Sun className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium">Solar Peak Production</p>
                      <p className="text-sm text-gray-500">
                        Schedule high-consumption activities between 10 AM - 2
                        PM to maximize solar usage.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <WashingMachine className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Appliance Schedule</p>
                      <p className="text-sm text-gray-500">
                        Running your washer and dryer during off-peak hours (9
                        PM - 6 AM) could save up to $15/month.
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Impact Report</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-medium mb-2">Environmental Impact</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-2xl font-bold text-green-700">127</p>
                        <p className="text-sm text-gray-600">Trees Saved</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-700">842</p>
                        <p className="text-sm text-gray-600">kg CO₂ Reduced</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium mb-2">Financial Savings</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-2xl font-bold text-blue-700">
                          $124.50
                        </p>
                        <p className="text-sm text-gray-600">Monthly Savings</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-blue-700">18%</p>
                        <p className="text-sm text-gray-600">Cost Reduction</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-medium mb-2">Energy Goals</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600">Monthly Target</p>
                        <p className="text-sm font-medium">850 kWh</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-purple-600 h-2.5 rounded-full"
                          style={{ width: "75%" }}
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        75% of monthly goal reached
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
