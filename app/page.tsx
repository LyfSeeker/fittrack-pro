import Link from "next/link"
import Image from "next/image" // Added this import
import { Button } from "@/components/ui/button"
import { supabase } from '@/lib/supabase';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="FitTrack Pro Logo" 
              width={40} 
              height={40} 
              className="mr-2"
            />
            <h1 className="text-2xl font-bold text-primary-foreground">FitTrack Pro</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Your Personal Fitness Journey Starts Here</h2>
          <p className="text-xl mb-8">
            Get customized workout and diet plans based on your goals and track your progress over time.
          </p>

          <div className="grid gap-4 md:grid-cols-2 max-w-md mx-auto">
            <Link href="/login" className="w-full">
              <Button size="lg" className="w-full">
                Login
              </Button>
            </Link>
            <Link href="/register" className="w-full">
              <Button size="lg" variant="outline" className="w-full">
                Register
              </Button>
            </Link>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="mb-4 text-primary">
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
                  className="mx-auto h-10 w-10"
                >
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                  <line x1="6" x2="6" y1="1" y2="4"></line>
                  <line x1="10" x2="10" y1="1" y2="4"></line>
                  <line x1="14" x2="14" y1="1" y2="4"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Plans</h3>
              <p className="text-muted-foreground">
                Custom workout and diet plans based on your specific goals and body metrics.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="mb-4 text-primary">
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
                  className="mx-auto h-10 w-10"
                >
                  <path d="M12 2v20"></path>
                  <path d="m17 5-5-3-5 3"></path>
                  <path d="m17 19-5 3-5-3"></path>
                  <path d="M2 12h20"></path>
                  <path d="m5 17 3-5-3-5"></path>
                  <path d="m19 17-3-5 3-5"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">15-Day Programs</h3>
              <p className="text-muted-foreground">
                Structured 15-day programs with progressive difficulty to maximize your results.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="mb-4 text-primary">
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
                  className="mx-auto h-10 w-10"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-muted-foreground">
                Track your progress and receive updated plans based on your performance.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FitTrack Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}