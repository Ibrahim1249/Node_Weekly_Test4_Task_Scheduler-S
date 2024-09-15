
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, XCircle, Edit, Search, Filter, Plus, Download } from 'lucide-react'

export function Dashboard() {
  const [jobs, setJobs] = useState([
    { id: 1, name: "10-min-shell-success", schedule: "0 */10 * * *", successCount: 558, errorCount: 0, status: "success", next: "2023-05-20T01:00:00" },
    { id: 2, name: "child-concurrency-forbid-shell-success", schedule: "", successCount: 9692, errorCount: 4, status: "success", next: "1970-01-01T01:00:00" },
    { id: 3, name: "child-shell-fail", schedule: "@every 10m", successCount: 0, errorCount: 13293, status: "error", next: "2023-05-19T10:07:28" },
    { id: 4, name: "child-shell-success", schedule: "", successCount: 4428, errorCount: 0, status: "success", next: "1970-01-01T01:00:00" },
    { id: 5, name: "disabled-shell", schedule: "0 */10 * * *", successCount: 0, errorCount: 0, status: "disabled", next: "2023-05-19T01:00:00" },
  ])

  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const newJob = {
      id: jobs.length + 1,
      name: formData.get('name'),
      description: formData.get('description'),
      schedule: formData.get('schedule'),
      successCount: 0,
      errorCount: 0,
      status: 'success',
      next: new Date().toISOString(),
    }
    setJobs([...jobs, newJob])
    setIsOpen(false)
  }

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
                  <DialogContent>
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
                        <Label htmlFor="schedule">Schedule</Label>
                        <Input id="schedule" name="schedule" placeholder="e.g., 0 */10 * * *" required />
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
                    <TableCell>{job.successCount}</TableCell>
                    <TableCell>{job.errorCount}</TableCell>
                    <TableCell>
                      {job.status === 'success' && <CheckCircle2 className="text-green-500" />}
                      {job.status === 'error' && <XCircle className="text-red-500" />}
                      {/* {job.status === 'disabled' && <span className="text-gray-500">✓</span>} */}
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

            {/* <div className="mt-4 flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-700">Rows per page: </span>
                <select className="border rounded p-1 text-sm">
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">1-5 of 12</span>
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div> */}
          </div>
        </div>
      </main>
    </div>)
  );
}