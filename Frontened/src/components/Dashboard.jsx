'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {  CheckCircle2, XCircle, Edit, Search, Plus,  } from 'lucide-react'

export function Dashboard() {
  const [jobs, setJobs] = useState([
    { id: 1, name: "10-min-shell-success", schedule: "0 */10 * * *", successCount: 558, errorCount: 0, status: "success", next: "2023-05-20T01:00:00", repeat: "Every 10 minutes" },
    { id: 2, name: "child-concurrency-forbid-shell-success", schedule: "", successCount: 9692, errorCount: 4, status: "success", next: "1970-01-01T01:00:00", repeat: "Once" },
    { id: 3, name: "child-shell-fail", schedule: "@every 10m", successCount: 0, errorCount: 13293, status: "error", next: "2023-05-19T10:07:28", repeat: "Every 10 minutes" },
    { id: 4, name: "child-shell-success", schedule: "", successCount: 4428, errorCount: 0, status: "success", next: "1970-01-01T01:00:00", repeat: "Once" },
    { id: 5, name: "disabled-shell", schedule: "0 */10 * * *", successCount: 0, errorCount: 0, status: "disabled", next: "2023-05-19T01:00:00", repeat: "Every 10 minutes" },
  ])

  const [isOpen, setIsOpen] = useState(false)
  const [repeatInterval, setRepeatInterval] = useState("once")

  const convertUserDataIntoCronFormat = (scheduleDate , repeatInterval)=>{
      const selectedDate = new Date(scheduleDate); // date of user
      const minutes = selectedDate.getMinutes();
      const hours = selectedDate.getHours();
      const dayOfMonth = selectedDate.getDate()
      const month = selectedDate.getMonth() + 1
      const dayOfWeek = selectedDate.getDay()

      switch (repeatInterval) {
        case "every minute":
          return `* * * * *`;  // Every minute
        case "every hour":
          return `0 * * * *`;  // At the 0th minute of every hour
        case "daily":
          return `${minutes} ${hours} * * *`; // At the specific hour and minute every day
        case "weekly":
          return `${minutes} ${hours} * * ${dayOfWeek}`; // At the specific hour and minute every week
        case "monthly":
          return `${minutes} ${hours} ${dayOfMonth} * *`; // At the specific hour and minute every month
        default:
          return `${minutes} ${hours} ${dayOfMonth} ${month} *`; // Default: At the specific date and time
      }
  }
  const calculateNextExecution = (scheduleDate, repeatInterval) => {
    const now = new Date();
    const selectedDate = new Date(scheduleDate);
  
    // Check if the selected date is valid and is not "Invalid Date"
    if (isNaN(selectedDate.getTime())) {
      console.error("Invalid schedule date provided.");
      return now.toISOString(); // Return current time as fallback
    }
  
    // If the selected date is in the future, return it as the next execution time
    if (selectedDate > now) {
      return selectedDate.toISOString();
    }
  
    // Calculate the next execution time based on repeat interval
    let nextExecution = new Date(selectedDate); // Start from the user-selected date
  
    switch (repeatInterval) {
      case "every minute":
        nextExecution.setMinutes(nextExecution.getMinutes() + 1); // Add 1 minute
        break;
      case "every hour":
        nextExecution.setHours(nextExecution.getHours() + 1); // Add 1 hour
        break;
      case "daily":
        nextExecution.setDate(nextExecution.getDate() + 1); // Add 1 day
        break;
      case "weekly":
        nextExecution.setDate(nextExecution.getDate() + 7); // Add 7 days (1 week)
        break;
      case "monthly":
        nextExecution.setMonth(nextExecution.getMonth() + 1); // Add 1 month
        break;
      default:
        // If no repeat interval is selected, or the date is invalid, return the original selected date
        return selectedDate.toISOString();
    }
  
    // Ensure the calculated next execution is in the future
    if (nextExecution <= now) {
      console.warn("Next execution time is in the past, adjusting...");
      // Add the repeat interval until the next execution time is valid
      while (nextExecution <= now) {
        switch (repeatInterval) {
          case "every minute":
            nextExecution.setMinutes(nextExecution.getMinutes() + 1);
            break;
          case "every hour":
            nextExecution.setHours(nextExecution.getHours() + 1);
            break;
          case "daily":
            nextExecution.setDate(nextExecution.getDate() + 1);
            break;
          case "weekly":
            nextExecution.setDate(nextExecution.getDate() + 7);
            break;
          case "monthly":
            nextExecution.setMonth(nextExecution.getMonth() + 1);
            break;
        }
      }
    }
  
    return nextExecution.toISOString(); // Return the next execution time in ISO format
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData)
  
    const scheduleDate = formData.get("scheduleDate"); // User-selected date
    const repeatInterval = formData.get("repeatInterval"); // User-selected repeat interval (e.g., daily, weekly)
  
    // Validate schedule date before processing
    if (!scheduleDate) {
      console.error("Schedule date is required!");
      return;
    }
  
    const cronSchedule = convertUserDataIntoCronFormat(scheduleDate, repeatInterval); // Generate cron expression
  
    // Calculate the next execution time based on the cron schedule and repeat interval
    const nextExecution = calculateNextExecution(scheduleDate, repeatInterval);
  
    const newJob = {
      id: jobs.length + 1,
      name: formData.get("name"),
      description: formData.get("description"),
      schedule: cronSchedule, // Store the cron expression here
      successCount: 0,
      errorCount: 0,
      status: "success",
      next: nextExecution, // Set the calculated next execution time
      repeat: repeatInterval,
    };
  
    console.log(newJob);
    setJobs([...jobs, newJob]);
    setIsOpen(false);
  };


  return (
    (<div className="flex flex-col min-h-screen">
      <header className="bg-gray-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button className="text-2xl">☰</button>
            <h1 className="text-2xl font-bold">Jobs</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-gray-700">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"><path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </button>
          </div>
        </div>
      </header>
      <main className="flex-grow bg-gray-100 p-6">
        <div className="container mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="relative">
                <Input type="text" placeholder="Search" className="pl-10 pr-4 py-2 w-64" />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <div className="flex space-x-4">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex items-center">
                      <Plus className="mr-2 h-4 w-4" />
                      CREATE
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Create New Job</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" required />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" />
                      </div>
                      <div>
                        <Label htmlFor="scheduledTime">Scheduled Time</Label>
                        <Input
                          id="scheduledTime"
                          name="scheduleDate" 
                          type="datetime-local"
                          required
                        />
                      </div>
                        <div className="space-y-4">
                          <div>
                            <Label>Repeat</Label>
                            <Select onValueChange={setRepeatInterval}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select repeat interval" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="once">Once</SelectItem>
                                <SelectItem value="minute">Every Minute</SelectItem>
                                <SelectItem value="hour">Every Hour</SelectItem>
                                <SelectItem value="day">Every Day</SelectItem>
                                <SelectItem value="month">Every Month</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      <Button type="submit">Submit</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Display name</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Repeat</TableHead>
                  <TableHead>Success count</TableHead>
                  <TableHead>Error count</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Next</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>
                      <input type="checkbox" className="rounded" />
                    </TableCell>
                    <TableCell className="font-medium">{job.name}</TableCell>
                    <TableCell>{job.schedule}</TableCell>
                    <TableCell>{job.repeat}</TableCell>
                    <TableCell>{job.successCount}</TableCell>
                    <TableCell>{job.errorCount}</TableCell>
                    <TableCell>
                      {job.status === 'success' && <CheckCircle2 className="text-green-500" />}
                      {job.status === 'error' && <XCircle className="text-red-500" />}
                      {job.status === 'disabled' && <span className="text-gray-500">✓</span>}
                    </TableCell>
                    <TableCell>{new Date(job.next).toLocaleString()}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>)
  );
}