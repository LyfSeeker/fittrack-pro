"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { getUserProfile, getUserPlan, markDayAsComplete } from "@/lib/user-profile"
import { useRouter } from "next/navigation"

interface UserProfile {
  name: string
  age: number
  gender: string
  weight: number
  height: number
  goal: string
}

interface WorkoutDay {
  day: number
  exercises: {
    name: string
    sets: number
    reps: number
    rest: string
  }[]
}

interface MealPlan {
  day: number
  meals: {
    type: string
    description: string
    calories: number
  }[]
}

interface FitnessPlan {
  workoutPlan: WorkoutDay[]
  dietPlan: MealPlan[]
  daysCompleted: number
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [plan, setPlan] = useState<FitnessPlan | null>(null)
  const [loading, setLoading] = useState(true)
  const [markingComplete, setMarkingComplete] = useState(false)
  const [activeDay, setActiveDay] = useState(1)
  const router = useRouter()

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      setLoading(true)
      const userProfile = await getUserProfile()
      const userPlan = await getUserPlan()

      setProfile(userProfile)
      setPlan(userPlan)

      // Set active day to current progress day + 1
      if (userPlan && userPlan.daysCompleted < 15) {
        setActiveDay(userPlan.daysCompleted + 1)
      }
    } catch (error) {
      console.error("Failed to load data:", error)
    } finally {
      setLoading(false)
    }
  }

  // Add a function to handle marking a day as complete
  async function handleMarkDayComplete() {
    if (!plan) return

    setMarkingComplete(true)
    try {
      const success = await markDayAsComplete(activeDay)

      if (success) {
        try {
          // Refresh the plan data
          const userPlan = await getUserPlan()
          setPlan(userPlan)

          // Update active day to the next day
          if (userPlan && userPlan.daysCompleted < 15) {
            setActiveDay(userPlan.daysCompleted + 1)
          }

          // Show success message
          window.alert(`Day ${activeDay} completed successfully!`)

          // If all 15 days are complete, prompt to update progress
          if (userPlan && userPlan.daysCompleted >= 15) {
            const shouldUpdate = window.confirm(
              "Congratulations on completing your 15-day plan! Would you like to update your progress now?",
            )
            if (shouldUpdate) {
              router.push("/update-progress")
            }
          }
        } catch (refreshError) {
          console.error("Error refreshing plan data:", refreshError)
          window.alert("Day marked as complete, but there was an error refreshing the plan. Please refresh the page.")
        }
      } else {
        window.alert("Failed to mark day as complete. Please try again.")
      }
    } catch (error) {
      console.error("Error marking day as complete:", error)
      window.alert("An error occurred. Please try again.")
    } finally {
      setMarkingComplete(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading your fitness plan...</p>
        </div>
      </div>
    )
  }

  if (!profile || !plan) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Profile Not Found</CardTitle>
            <CardDescription>We couldn't find your profile or fitness plan.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/profile-setup" className="w-full">
              <Button className="w-full">Complete Your Profile</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  const progressPercentage = (plan.daysCompleted / 15) * 100
  const currentWorkout = plan.workoutPlan.find((day) => day.day === activeDay)
  const currentDiet = plan.dietPlan.find((day) => day.day === activeDay)

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="bg-primary py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-foreground">FitTrack Pro</h1>
          <Link href="/profile">
            <Button variant="outline" className="bg-primary-foreground">
              My Profile
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {profile.name}!</h2>
          <p className="text-muted-foreground">Your 15-day {profile.goal.replace("-", " ")} plan</p>

          <div className="mt-4">
            <div className="flex justify-between mb-2">
              <span>Progress</span>
              <span>{plan.daysCompleted} of 15 days completed</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>

        <div className="mb-6 flex overflow-x-auto pb-2 gap-2">
          {Array.from({ length: 15 }, (_, i) => i + 1).map((day) => (
            <Button
              key={day}
              variant={activeDay === day ? "default" : day <= plan.daysCompleted ? "outline" : "ghost"}
              className={`min-w-[60px] ${day <= plan.daysCompleted ? "bg-muted/50" : ""}`}
              onClick={() => setActiveDay(day)}
            >
              Day {day}
            </Button>
          ))}
        </div>

        <Tabs defaultValue="workout" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="workout">Workout Plan</TabsTrigger>
            <TabsTrigger value="diet">Diet Plan</TabsTrigger>
          </TabsList>

          <TabsContent value="workout" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Day {activeDay} - Workout Plan</CardTitle>
                <CardDescription>
                  {profile.goal === "weight-loss" && "Focus on burning calories and increasing metabolism"}
                  {profile.goal === "weight-gain" && "Focus on progressive overload and muscle building"}
                  {profile.goal === "bodybuilding" && "Focus on muscle hypertrophy and definition"}
                  {profile.goal === "cardio" && "Focus on cardiovascular endurance and stamina"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentWorkout &&
                  currentWorkout.exercises.map((exercise, index) => (
                    <div key={index} className="mb-4 pb-4 border-b last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{exercise.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {exercise.sets} sets × {exercise.reps} reps • {exercise.rest} rest
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="16" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12.01" y2="8"></line>
                          </svg>
                          <span className="ml-1">Info</span>
                        </Button>
                      </div>
                    </div>
                  ))}
              </CardContent>
              <CardFooter>
                {activeDay <= plan.daysCompleted ? (
                  <Button variant="outline" className="w-full" disabled>
                    Already Completed
                  </Button>
                ) : activeDay === plan.daysCompleted + 1 ? (
                  <Button className="w-full" onClick={handleMarkDayComplete} disabled={markingComplete}>
                    {markingComplete ? "Updating..." : `Mark Day ${activeDay} as Complete`}
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" disabled>
                    Complete Previous Days First
                  </Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="diet" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Day {activeDay} - Diet Plan</CardTitle>
                <CardDescription>
                  {profile.goal === "weight-loss" && "Calorie deficit with high protein to preserve muscle"}
                  {profile.goal === "weight-gain" && "Calorie surplus with balanced macros for muscle growth"}
                  {profile.goal === "bodybuilding" && "High protein diet with strategic carb timing"}
                  {profile.goal === "cardio" && "Balanced nutrition with focus on sustained energy"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentDiet &&
                  currentDiet.meals.map((meal, index) => (
                    <div key={index} className="mb-4 pb-4 border-b last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{meal.type}</h4>
                          <p className="text-sm">{meal.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{meal.calories} calories</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="w-full p-3 bg-muted rounded-md">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Daily Calorie Target</span>
                    <span className="text-sm font-medium">
                      {profile.goal === "weight-loss" && "1,800 calories"}
                      {profile.goal === "weight-gain" && "2,800 calories"}
                      {profile.goal === "bodybuilding" && "2,500 calories"}
                      {profile.goal === "cardio" && "2,200 calories"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Water Intake Target</span>
                    <span className="text-sm text-muted-foreground">2.5 - 3 liters</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Download Shopping List
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Update Your Progress</CardTitle>
              <CardDescription>
                After completing your 15-day plan, update your progress to get a new customized plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                You can update your progress after completing your current 15-day plan. This helps us adjust your next
                plan based on your results.
              </p>
              <Link href="/update-progress">
                <Button variant="outline" className="w-full" disabled={plan.daysCompleted < 15}>
                  Update Progress
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

