const users: {
  id: string
  name: string
  email: string
  password: string
}[] = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@example.com",
    password: "password123",
  },
]

// Simulate current logged in user
let currentUser: string | null = null

export async function loginUser(email: string, password: string): Promise<boolean> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user = users.find((u) => u.email === email && u.password === password)

  if (user) {
    currentUser = user.id
    // In a real app, you would set a cookie or token here
    localStorage.setItem("userId", user.id)
    return true
  }

  return false
}

export async function registerUser(name: string, email: string, password: string): Promise<boolean> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Check if user already exists
  if (users.some((u) => u.email === email)) {
    return false
  }

  const newUser = {
    id: String(users.length + 1),
    name,
    email,
    password,
  }

  users.push(newUser)
  currentUser = newUser.id

  // In a real app, you would set a cookie or token here
  localStorage.setItem("userId", newUser.id)

  return true
}

export async function logoutUser(): Promise<void> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  currentUser = null
  localStorage.removeItem("userId")
}

export async function getCurrentUser(): Promise<{ id: string; name: string; email: string } | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Try to get from localStorage first (for page refreshes)
  const storedId = typeof window !== "undefined" ? localStorage.getItem("userId") : null
  const userId = currentUser || storedId

  if (!userId) return null

  const user = users.find((u) => u.id === userId)

  if (!user) return null

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return user !== null
}

