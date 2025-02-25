"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const mockSkills = [
  { name: "JavaScript", userLevel: 70, requiredLevel: 80 },
  { name: "Python", userLevel: 60, requiredLevel: 75 },
  { name: "Machine Learning", userLevel: 40, requiredLevel: 70 },
  { name: "Data Visualization", userLevel: 55, requiredLevel: 65 },
]

export default function Skills() {
  const getColorForSkillGap = (userLevel: number, requiredLevel: number) => {
    const gap = requiredLevel - userLevel
    if (gap <= 10) return "bg-secondary-green"
    if (gap <= 20) return "bg-secondary-amber"
    return "bg-alert-red"
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Skill Gap Analysis</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="card">
                <CardHeader>
                  <CardTitle>{skill.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="mb-2">Your Level</p>
                      <Progress
                        value={skill.userLevel}
                        className="h-2"
                        indicatorClassName={getColorForSkillGap(skill.userLevel, skill.requiredLevel)}
                      />
                    </div>
                    <div>
                      <p className="mb-2">Required Level</p>
                      <Progress
                        value={skill.requiredLevel}
                        className="h-2 bg-gray-200"
                        indicatorClassName="bg-primary-blue"
                      />
                    </div>
                  </div>
                  <p className="mt-4">Gap: {Math.max(skill.requiredLevel - skill.userLevel, 0)}%</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

