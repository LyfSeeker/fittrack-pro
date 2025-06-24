"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { getUserProfile, updateProgress } from "@/lib/user-profile"

export default function UpdateProgressPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [currentWeight, setCurrentWeight] = useState<number | null>(null)
  const [newWeight, setNewWeight] = useState<string>("")
  const [goalAchieved, setGoalAchieved] = useState<string>("partial")
  const [goal, setGoal] = useState<string>("")

  useEffect(() => {
    async function loadProfile() {
      try {
        const profile = await getUserProfile()
        if (profile) {
          setCurrentWeight(profile.weight)
          setNewWeight(profile.weight.toString())
          setGoal(profile.goal)
        } else {
          setError("Profile not found. Please complete your profile setup first.")
        }
      } catch (err) {
        setError("Failed to load profile data.")
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [])

  // Update the handleSubmit function to provide better feedback
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      if (!newWeight || isNaN(Number.parseFloat(newWeight))) {
        setError("Please enter a valid weight")
        setIsLoading(false)
        return
      }

      const success = await updateProgress(
        Number.parseFloat(newWeight),
        goalAchieved === "yes" || goalAchieved === "partial",
      )

      if (success) {
        alert("Progress updated successfully! A new, more challenging plan has been created for you.")
        router.push("/dashboard")
      } else {
        setError("Failed to update progress. Please try again.")
      }
    } catch (err) {
      console.error("Error updating progress:", err)
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading && currentWeight === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Update Your Progress</CardTitle>
          <CardDescription className="text-center">Let us know how you did with your 15-day plan</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {error && <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">{error}</div>}

            <div className="space-y-2">
              <label htmlFor="currentWeight" className="text-sm font-medium">
                Current Weight
              </label>
              <div className="flex items-center space-x-2">
                <Input
                  id="currentWeight"
                  value={currentWeight !== null ? `${currentWeight} kg` : ""}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="newWeight" className="text-sm font-medium">
                New Weight (kg)
              </label>
              <Input
                id="newWeight"
                type="number"
                step="0.1"
                min="30"
                max="300"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Did you achieve your goal?</label>
              <RadioGroup value={goalAchieved} onValueChange={setGoalAchieved} className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="goal-yes" />
                  <Label htmlFor="goal-yes">Yes, I achieved my goal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="partial" id="goal-partial" />
                  <Label htmlFor="goal-partial">Partially, I made some progress</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="goal-no" />
                  <Label htmlFor="goal-no">No, I need a different approach</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Add more detailed information about the new plan */}
            <div className="p-4 bg-muted rounded-md">
              <h4 className="font-medium mb-2">Your Current Goal: {goal.replace("-", " ")}</h4>
              <p className="text-sm text-muted-foreground mb-2">
                {goal === "weight-loss" &&
                  "Based on your progress, we'll adjust your calorie deficit and exercise intensity for better results."}
                {goal === "weight-gain" &&
                  "Based on your progress, we'll adjust your calorie surplus and resistance training for optimal muscle growth."}
                {goal === "bodybuilding" &&
                  "Based on your progress, we'll adjust your training split and volume for better muscle development."}
                {goal === "cardio" &&
                  "Based on your progress, we'll adjust your cardio intensity and duration for improved endurance."}
              </p>
              <p className="text-sm font-medium">Your new plan will include:</p>
              <ul className="text-sm text-muted-foreground mt-1 list-disc list-inside">
                <li>More challenging workout routines</li>
                <li>Stricter Indian diet plan tailored to your goal</li>
                <li>Adjusted calorie targets based on your new weight</li>
                <li>Progressive overload to ensure continued progress</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update and Generate New Plan"}
            </Button>
            <Link href="/dashboard" className="w-full">
              <Button variant="outline" className="w-full" type="button">
                Cancel
              </Button>
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

