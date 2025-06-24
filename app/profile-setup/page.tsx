"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { saveUserProfile } from "@/lib/user-profile"

export default function ProfileSetupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [selectedGoal, setSelectedGoal] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)
    const age = formData.get("age") as string
    const gender = formData.get("gender") as string
    const weight = formData.get("weight") as string
    const height = formData.get("height") as string
    const goal = selectedGoal

    if (!goal) {
      setError("Please select a fitness goal")
      setIsLoading(false)
      return
    }

    try {
      const success = await saveUserProfile({
        age: Number.parseInt(age),
        gender,
        weight: Number.parseFloat(weight),
        height: Number.parseFloat(height),
        goal,
      })

      if (success) {
        router.push("/dashboard")
      } else {
        setError("Failed to save profile. Please try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Complete Your Profile</CardTitle>
          <CardDescription className="text-center">
            We need some information to create your personalized fitness plan
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {error && <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">{error}</div>}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="age" className="text-sm font-medium">
                  Age
                </label>
                <Input id="age" name="age" type="number" min="16" max="100" required disabled={isLoading} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Gender</label>
                <RadioGroup name="gender" defaultValue="male" className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="weight" className="text-sm font-medium">
                  Weight (kg)
                </label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  step="0.1"
                  min="30"
                  max="300"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="height" className="text-sm font-medium">
                  Height (cm)
                </label>
                <Input
                  id="height"
                  name="height"
                  type="number"
                  step="0.1"
                  min="100"
                  max="250"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Fitness Goal</label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant={selectedGoal === "weight-loss" ? "default" : "outline"}
                  className="h-auto py-4 flex flex-col items-center justify-center"
                  onClick={() => setSelectedGoal("weight-loss")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mb-2"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                  <span>Weight Loss</span>
                </Button>
                <Button
                  type="button"
                  variant={selectedGoal === "weight-gain" ? "default" : "outline"}
                  className="h-auto py-4 flex flex-col items-center justify-center"
                  onClick={() => setSelectedGoal("weight-gain")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mb-2"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                  <span>Weight Gain</span>
                </Button>
                <Button
                  type="button"
                  variant={selectedGoal === "bodybuilding" ? "default" : "outline"}
                  className="h-auto py-4 flex flex-col items-center justify-center"
                  onClick={() => setSelectedGoal("bodybuilding")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mb-2"
                  >
                    <path d="M6.5 6.5 12 12l5.5 5.5"></path>
                    <path d="m17.5 6.5-11 11"></path>
                    <path d="M22 12c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2s10 4.5 10 10z"></path>
                  </svg>
                  <span>Bodybuilding</span>
                </Button>
                <Button
                  type="button"
                  variant={selectedGoal === "cardio" ? "default" : "outline"}
                  className="h-auto py-4 flex flex-col items-center justify-center"
                  onClick={() => setSelectedGoal("cardio")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mb-2"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                  <span>Cardio</span>
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Saving..." : "Create My Plan"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

