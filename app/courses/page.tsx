"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const mockCourses = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    platform: "Coursera",
    duration: "8 weeks",
    level: "Intermediate",
    price: "Free",
    progress: 75,
    category: "Data Science",
  },
  {
    id: 2,
    title: "Web Development Bootcamp",
    platform: "Udemy",
    duration: "12 weeks",
    level: "Beginner",
    price: "$59.99",
    progress: 30,
    category: "Web Development",
  },
  {
    id: 3,
    title: "Data Science Specialization",
    platform: "edX",
    duration: "24 weeks",
    level: "Advanced",
    price: "$399",
    progress: 0,
    category: "Data Science",
  },
]

export default function Courses() {
  const [courses, setCourses] = useState(mockCourses)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase()
    const filteredCourses = mockCourses.filter(
      (course) => course.title.toLowerCase().includes(searchTerm) || course.platform.toLowerCase().includes(searchTerm),
    )
    setCourses(filteredCourses)
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Course Recommendations</h1>
        <div className="mb-8 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input type="search" placeholder="Search courses..." onChange={handleSearch} className="pl-10 rounded-xl" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="card hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-primary-purple">{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold">{course.platform}</p>
                  <p>Duration: {course.duration}</p>
                  <div className="flex justify-between items-center mt-4">
                    <Badge className="bg-primary-blue text-white">{course.level}</Badge>
                    <span className="text-secondary-amber">{course.price}</span>
                  </div>
                  <Badge className="mt-2 bg-secondary-green text-white">{course.category}</Badge>
                  <div className="mt-4">
                    <p className="text-sm mb-1">Progress: {course.progress}%</p>
                    <Progress
                      value={course.progress}
                      className="h-2 bg-gray-200"
                      indicatorClassName="bg-secondary-green"
                    />
                  </div>
                  <Button className="btn-primary mt-4 w-full">Enroll Now</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

