"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const mockJobs = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Tech Co",
    location: "Remote",
    salary: "$100,000 - $150,000",
    skills: ["JavaScript", "React", "Node.js"],
  },
  {
    id: 2,
    title: "Data Scientist",
    company: "AI Corp",
    location: "New York, NY",
    salary: "$120,000 - $180,000",
    skills: ["Python", "Machine Learning", "SQL"],
  },
  {
    id: 3,
    title: "Product Manager",
    company: "Startup Inc",
    location: "San Francisco, CA",
    salary: "$110,000 - $160,000",
    skills: ["Agile", "User Research", "Strategy"],
  },
]

export default function Jobs() {
  const [jobs, setJobs] = useState(mockJobs)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase()
    const filteredJobs = mockJobs.filter(
      (job) => job.title.toLowerCase().includes(searchTerm) || job.company.toLowerCase().includes(searchTerm),
    )
    setJobs(filteredJobs)
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Job Recommendations</h1>
        <div className="mb-8 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input type="search" placeholder="Search jobs..." onChange={handleSearch} className="pl-10 rounded-xl" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="card">
                <CardHeader>
                  <CardTitle className="text-primary-blue">{job.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold">{job.company}</p>
                  <p>{job.location}</p>
                  <p className="text-secondary-green">{job.salary}</p>
                  <div className="mt-4">
                    {job.skills.map((skill) => (
                      <Badge key={skill} className="mr-2 mb-2 bg-secondary-green text-white">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <Button className="btn-primary mt-4 w-full">Apply Now</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

