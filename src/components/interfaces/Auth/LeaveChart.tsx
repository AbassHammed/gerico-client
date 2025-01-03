/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use client';

import * as React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui';
import { useEmployeesAll } from '@/hooks/useEmployees';
import { useUpcomingLeaveRequests } from '@/hooks/useFetchLeave';
import { ILeaveRequest, IUser } from '@/types';
import { isWithinInterval } from 'date-fns';
import { UserMinus, Users } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';

// Helper function to check if an employee is on leave today
const isOnLeaveToday = (employee: IUser, leaveRequests: ILeaveRequest[]) => {
  const today = new Date();
  return leaveRequests.some(
    request =>
      request.uid === employee.uid &&
      request.request_status === 'approved' &&
      isWithinInterval(today, {
        start: new Date(request.start_date),
        end: new Date(request.end_date),
      }),
  );
};

export function EmployeePresence() {
  const { employees: data } = useEmployeesAll();
  const { leaves } = useUpcomingLeaveRequests();

  const employees = data ?? [];
  const leaveRequests = leaves ?? [];

  const { presentCount, absentCount } = React.useMemo(() => {
    let presentCount = 0;
    let absentCount = 0;

    employees.forEach(employee => {
      if (isOnLeaveToday(employee, leaveRequests)) {
        absentCount++;
      } else {
        presentCount++;
      }
    });

    return { presentCount, absentCount };
  }, [employees, leaveRequests]);

  const presenceData = [
    { name: 'Present', value: presentCount, fill: 'var(--color-present)' },
    { name: 'Absent', value: absentCount, fill: 'var(--color-absent)' },
  ];

  const totalEmployees = presentCount + absentCount;

  const chartConfig: ChartConfig = {
    present: { label: 'Present', color: 'hsl(var(--chart-1))' },
    absent: { label: 'Absent', color: 'hsl(var(--chart-2))' },
  };

  return (
    <Card className="hidden lg:flex lg:flex-col lg:mr-4">
      <CardHeader className="items-center pb-2">
        <CardDescription>Aperçu d'aujourd'hui</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={presenceData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle">
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold">
                          {totalEmployees.toString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground">
                          Employés
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <div className="flex items-center">
          <Users className="mr-2 h-4 w-4" />
          Present: {presentCount}
        </div>
        <div className="flex items-center">
          <UserMinus className="mr-2 h-4 w-4" />
          Absent: {absentCount}
        </div>
      </CardFooter>
    </Card>
  );
}
