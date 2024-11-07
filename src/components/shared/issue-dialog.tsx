'use client';

import React from 'react';

import { IIssue } from '@/types';
import {
  Badge,
  Button_Shadcn as Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui';
import { AlertCircle, FileText, Key, User } from 'lucide-react';

import '../ui-patterns/shadcn/ui/dialog';

function IssueIcon({ type }: { type: IIssue['type'] }) {
  switch (type) {
    case 'auth':
      return <Key className="h-4 w-4" />;
    case 'leave':
      return <User className="h-4 w-4" />;
    case 'payslip':
      return <FileText className="h-4 w-4" />;
    default:
      return <AlertCircle className="h-4 w-4" />;
  }
}

function IssueBadge({ priority }: { priority: IIssue['priority'] }) {
  const colorMap = {
    high: 'bg-red-500',
    average: 'bg-yellow-500',
    normal: 'bg-blue-500',
  };

  return (
    <Badge variant="outline" className={`${colorMap[priority]} text-white rounded-md`}>
      {priority}
    </Badge>
  );
}

export function IssueDialog({ issue }: { issue: IIssue }) {
  const [isSolved, setIsSolved] = React.useState(issue.solved);

  const handleSolveIssue = () => {
    setIsSolved(true);
    // Here you would typically update the issue status in your backend
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`w-full justify-start gap-2 px-2 py-1 text-left ${
            issue.priority === 'normal'
              ? 'bg-[#00ff0040] ring-1 ring-[#00ff0080]'
              : issue.priority === 'high'
                ? 'bg-[#ff000040] ring-1 ring-[#ff000080]'
                : 'bg-[#ffff0040] ring-1 ring-[#ffff0080]'
          }`}>
          <IssueIcon type={issue.type} />
          <span className="flex-1 truncate">{issue.subject}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IssueIcon type={issue.type} />
            {issue.subject}
          </DialogTitle>
          <DialogDescription>Issue Details</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium">Type:</span>
            <span className="col-span-3 flex items-center gap-2">
              <IssueIcon type={issue.type} />
              {issue.type}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium">Priority:</span>
            <span className="col-span-3">
              <IssueBadge priority={issue.priority} />
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium">Status:</span>
            <span className="col-span-3">
              {isSolved ? (
                <Badge variant="outline" className="bg-green-500 text-white rounded">
                  Solved
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-red-500 text-white rounded">
                  Unsolved
                </Badge>
              )}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium">Date:</span>
            <span className="col-span-3">{new Date(issue.issue_date).toLocaleDateString()}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium">Description:</span>
            <span className="col-span-3">{issue.description}</span>
          </div>
        </div>
        {!isSolved && (
          <Button onClick={handleSolveIssue} className="w-full">
            Solve Issue
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
