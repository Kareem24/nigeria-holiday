"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NigeriaHolidays from "@/components/google-calendar";

export interface PublicHoliday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number | null;
  types: string[];
}

export type PublicHolidaysResponse = PublicHoliday[];

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [holidays, setHolidays] = useState<PublicHolidaysResponse>([]);

  useEffect(() => {
    const year = new Date().getFullYear();
    fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/NG`)
      .then((res) => res.json())
      .then((data) => setHolidays(data));
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              Welcome, {user.name}!
            </h1>
            <p className="text-muted-foreground mt-2">{user.email}</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="gap-2 bg-transparent"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Nigeria Public Holidays
          </h2>
          <NigeriaHolidays />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Google Calendar */}
          {/* <Card className="lg:col-span-2 shadow-md">
            <CardHeader>
              <CardTitle>Google Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <iframe
                src="https://calendar.google.com/calendar/embed?src=en.nigeria%23holiday%40group.v.calendar.google.com"
                style={{ border: 0 }}
                width="100%"
                height="600"
                frameBorder="0"
                scrolling="no"
              ></iframe>
            </CardContent>
          </Card> */}

          {/* Holiday List */}
          {/* <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Nigeria Public Holidays</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
              {holidays.map((h) => (
                <div
                  key={h.date}
                  className="p-3 border rounded-lg bg-gray-50 shadow-sm"
                >
                  <p className="font-semibold">{h.localName}</p>
                  <p className="text-sm text-gray-600">{h.date}</p>
                </div>
              ))}
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  );
}
