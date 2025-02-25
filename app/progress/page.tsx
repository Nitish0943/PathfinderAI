"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const mockProgress = [
  { id: 1, title: "Completed Python Basics Course", date: "2023-05-15", type: "course" },
  { id: 2, title: "Applied for Software Engineer position at Tech Co", date: "2023-06-01", type: "job" },
  { id: 3, title: "Earned Data Science Certification", date: "2023-06-15", type: "certification" },
  { id: 4, title: "Attended AI and Machine Learning Workshop", date: "2023-07-01", type: "workshop" },
]

export default function Progress() {
  return (
    <div className="min-h-screen bg-background dark:bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Progress Tracker</h1>
        <div className="space-y-4">
          {mockProgress.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="card relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary-blue to-primary-purple"></div>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{item.title}</span>
                    <Badge
                      className={`
                      ${item.type === "course" ? "bg-secondary-green" : ""}
                      ${item.type === "job" ? "bg-primary-blue" : ""}
                      ${item.type === "certification" ? "bg-secondary-amber" : ""}
                      ${item.type === "workshop" ? "bg-primary-purple" : ""}
                      text-white
                    `}
                    >
                      {item.type}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Date: {item.date}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

