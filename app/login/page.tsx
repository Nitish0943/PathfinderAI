"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FcGoogle } from "react-icons/fc"
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6"

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login data:", credentials)
    // Here you would typically send this data to your backend
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={credentials.email} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" value={credentials.password} onChange={handleChange} />
            </div>
            <Button type="submit" className="w-full">Login</Button>
          </form>
          <div className="mt-4 flex justify-center space-x-4">
            <Button variant="outline" size="icon"><FcGoogle className="h-6 w-6" /></Button>
            <Button variant="outline" size="icon"><FaGithub className="h-6 w-6" /></Button>
            <Button variant="outline" size="icon"><FaLinkedin className="h-6 w-6" /></Button>
            <Button variant="outline" size="icon"><FaXTwitter className="h-6 w-6" /></Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
