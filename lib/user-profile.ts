import { getCurrentUser } from "./auth"

// Store profiles in memory for demo (would be a database in production)
const userProfiles: Record<
  string,
  {
    userId: string
    name: string
    age: number
    gender: string
    weight: number
    height: number
    goal: string
  }
> = {}

// Store fitness plans in memory for demo
const userPlans: Record<
  string,
  {
    userId: string
    workoutPlan: {
      day: number
      exercises: {
        name: string
        sets: number
        reps: number
        rest: string
      }[]
    }[]
    dietPlan: {
      day: number
      meals: {
        type: string
        description: string
        calories: number
      }[]
    }[]
    daysCompleted: number
  }
> = {}

export async function saveUserProfile(profileData: {
  age: number
  gender: string
  weight: number
  height: number
  goal: string
}): Promise<boolean> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const currentUser = await getCurrentUser()
  if (!currentUser) return false

  userProfiles[currentUser.id] = {
    userId: currentUser.id,
    name: currentUser.name,
    ...profileData,
  }

  // Generate a fitness plan based on the profile
  generateFitnessPlan(currentUser.id, profileData.goal)

  return true
}

export async function getUserProfile() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const currentUser = await getCurrentUser()
  if (!currentUser) return null

  return userProfiles[currentUser.id] || null
}

export async function getUserPlan() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const currentUser = await getCurrentUser()
  if (!currentUser) return null

  return userPlans[currentUser.id] || null
}

// Generate a fitness plan based on user profile and goal
function generateFitnessPlan(userId: string, goal: string) {
  const workoutPlan = []
  const dietPlan = []

  // Generate 15 days of workout and diet plans
  for (let day = 1; day <= 15; day++) {
    // Generate workout based on goal
    const exercises = generateExercisesForGoal(goal, day)
    workoutPlan.push({
      day,
      exercises,
    })

    // Generate diet plan based on goal
    const meals = generateMealsForGoal(goal, day)
    dietPlan.push({
      day,
      meals,
    })
  }

  userPlans[userId] = {
    userId,
    workoutPlan,
    dietPlan,
    daysCompleted: 0,
  }
}

function generateExercisesForGoal(goal: string, day: number) {
  // Different exercise templates based on fitness goals
  const exercises = []

  if (goal === "weight-loss") {
    // Weight loss focuses on cardio and HIIT
    if (day % 3 === 1) {
      // Cardio day
      exercises.push(
        { name: "Treadmill Running", sets: 1, reps: 1, rest: "1 min" },
        { name: "Jumping Jacks", sets: 3, reps: 30, rest: "30 sec" },
        { name: "Mountain Climbers", sets: 3, reps: 20, rest: "30 sec" },
        { name: "Burpees", sets: 3, reps: 15, rest: "45 sec" },
        { name: "Jump Rope", sets: 3, reps: 50, rest: "1 min" },
      )
    } else if (day % 3 === 2) {
      // Full body circuit
      exercises.push(
        { name: "Bodyweight Squats", sets: 3, reps: 15, rest: "45 sec" },
        { name: "Push-ups", sets: 3, reps: 12, rest: "45 sec" },
        { name: "Lunges", sets: 3, reps: 10, rest: "45 sec" },
        { name: "Plank", sets: 3, reps: 1, rest: "45 sec" },
        { name: "Bicycle Crunches", sets: 3, reps: 20, rest: "45 sec" },
      )
    } else {
      // HIIT day
      exercises.push(
        { name: "High Knees", sets: 4, reps: 30, rest: "20 sec" },
        { name: "Squat Jumps", sets: 4, reps: 15, rest: "20 sec" },
        { name: "Push-up to Side Plank", sets: 4, reps: 10, rest: "20 sec" },
        { name: "Kettlebell Swings", sets: 4, reps: 15, rest: "20 sec" },
        { name: "Box Jumps", sets: 4, reps: 12, rest: "20 sec" },
      )
    }
  } else if (goal === "weight-gain") {
    // Weight gain focuses on heavy compound lifts
    if (day % 3 === 1) {
      // Push day
      exercises.push(
        { name: "Bench Press", sets: 4, reps: 8, rest: "2 min" },
        { name: "Overhead Press", sets: 4, reps: 8, rest: "2 min" },
        { name: "Incline Dumbbell Press", sets: 3, reps: 10, rest: "90 sec" },
        { name: "Tricep Dips", sets: 3, reps: 12, rest: "90 sec" },
        { name: "Lateral Raises", sets: 3, reps: 15, rest: "60 sec" },
      )
    } else if (day % 3 === 2) {
      // Pull day
      exercises.push(
        { name: "Deadlifts", sets: 4, reps: 6, rest: "2 min" },
        { name: "Barbell Rows", sets: 4, reps: 8, rest: "2 min" },
        { name: "Pull-ups", sets: 3, reps: 8, rest: "90 sec" },
        { name: "Bicep Curls", sets: 3, reps: 12, rest: "60 sec" },
        { name: "Face Pulls", sets: 3, reps: 15, rest: "60 sec" },
      )
    } else {
      // Leg day
      exercises.push(
        { name: "Squats", sets: 4, reps: 8, rest: "2 min" },
        { name: "Romanian Deadlifts", sets: 4, reps: 8, rest: "2 min" },
        { name: "Leg Press", sets: 3, reps: 10, rest: "90 sec" },
        { name: "Leg Extensions", sets: 3, reps: 12, rest: "60 sec" },
        { name: "Calf Raises", sets: 3, reps: 15, rest: "60 sec" },
      )
    }
  } else if (goal === "bodybuilding") {
    // Bodybuilding focuses on hypertrophy
    if (day % 4 === 1) {
      // Chest and triceps
      exercises.push(
        { name: "Incline Bench Press", sets: 4, reps: 10, rest: "90 sec" },
        { name: "Flat Dumbbell Press", sets: 4, reps: 10, rest: "90 sec" },
        { name: "Cable Flyes", sets: 3, reps: 12, rest: "60 sec" },
        { name: "Skull Crushers", sets: 3, reps: 12, rest: "60 sec" },
        { name: "Tricep Pushdowns", sets: 3, reps: 15, rest: "60 sec" },
      )
    } else if (day % 4 === 2) {
      // Back and biceps
      exercises.push(
        { name: "Lat Pulldowns", sets: 4, reps: 10, rest: "90 sec" },
        { name: "Seated Cable Rows", sets: 4, reps: 10, rest: "90 sec" },
        { name: "Dumbbell Rows", sets: 3, reps: 12, rest: "60 sec" },
        { name: "Barbell Curls", sets: 3, reps: 12, rest: "60 sec" },
        { name: "Hammer Curls", sets: 3, reps: 15, rest: "60 sec" },
      )
    } else if (day % 4 === 3) {
      // Legs
      exercises.push(
        { name: "Leg Press", sets: 4, reps: 12, rest: "90 sec" },
        { name: "Hack Squats", sets: 4, reps: 10, rest: "90 sec" },
        { name: "Leg Extensions", sets: 3, reps: 15, rest: "60 sec" },
        { name: "Leg Curls", sets: 3, reps: 15, rest: "60 sec" },
        { name: "Standing Calf Raises", sets: 4, reps: 20, rest: "60 sec" },
      )
    } else {
      // Shoulders and abs
      exercises.push(
        { name: "Seated Dumbbell Press", sets: 4, reps: 10, rest: "90 sec" },
        { name: "Upright Rows", sets: 4, reps: 10, rest: "90 sec" },
        { name: "Lateral Raises", sets: 3, reps: 15, rest: "60 sec" },
        { name: "Cable Crunches", sets: 3, reps: 15, rest: "60 sec" },
        { name: "Hanging Leg Raises", sets: 3, reps: 15, rest: "60 sec" },
      )
    }
  } else if (goal === "cardio") {
    // Cardio focuses on endurance
    if (day % 3 === 1) {
      // Steady state cardio
      exercises.push(
        { name: "Jogging", sets: 1, reps: 1, rest: "N/A" },
        { name: "Cycling", sets: 1, reps: 1, rest: "N/A" },
        { name: "Rowing", sets: 1, reps: 1, rest: "N/A" },
      )
    } else if (day % 3 === 2) {
      // Interval training
      exercises.push(
        { name: "Sprint Intervals", sets: 8, reps: 1, rest: "1 min" },
        { name: "Jump Rope Intervals", sets: 6, reps: 1, rest: "30 sec" },
        { name: "Stair Climber", sets: 5, reps: 1, rest: "45 sec" },
      )
    } else {
      // Cross training
      exercises.push(
        { name: "Swimming", sets: 1, reps: 1, rest: "N/A" },
        { name: "Elliptical Trainer", sets: 1, reps: 1, rest: "N/A" },
        { name: "Bodyweight Circuit", sets: 3, reps: 1, rest: "1 min" },
      )
    }
  }

  return exercises
}

// Update the generateMealsForGoal function to include different Indian foods for each day
function generateMealsForGoal(goal: string, day: number) {
  // Different meal templates based on fitness goals and day
  const meals = []

  // Weight Loss Diet Plans - Different for each day
  const weightLossDiets = [
    // Day 1
    [
      { type: "Breakfast", description: "Vegetable poha with sprouts and a small cup of curd", calories: 300 },
      { type: "Snack", description: "Roasted chana with a cup of green tea", calories: 150 },
      { type: "Lunch", description: "Roti with dal, palak paneer, and cucumber raita", calories: 450 },
      { type: "Snack", description: "Buttermilk with roasted cumin", calories: 120 },
      { type: "Dinner", description: "Grilled fish with steamed vegetables and moong dal", calories: 500 },
    ],
    // Day 2
    [
      { type: "Breakfast", description: "Moong dal cheela with mint chutney", calories: 280 },
      { type: "Snack", description: "Apple with a handful of almonds", calories: 150 },
      { type: "Lunch", description: "Brown rice with rajma curry and cucumber salad", calories: 450 },
      { type: "Snack", description: "Roasted makhana (fox nuts)", calories: 120 },
      { type: "Dinner", description: "Grilled chicken tikka with cucumber salad", calories: 450 },
    ],
    // Day 3
    [
      { type: "Breakfast", description: "Vegetable upma with a small cup of curd", calories: 300 },
      { type: "Snack", description: "Guava with a sprinkle of chaat masala", calories: 120 },
      { type: "Lunch", description: "Multigrain roti with lauki (bottle gourd) curry and dal", calories: 420 },
      { type: "Snack", description: "Vegetable soup", calories: 100 },
      { type: "Dinner", description: "Baked fish with spinach and lentil soup", calories: 480 },
    ],
    // Day 4
    [
      { type: "Breakfast", description: "Oats idli with coconut chutney", calories: 280 },
      { type: "Snack", description: "Orange and a few walnuts", calories: 140 },
      { type: "Lunch", description: "Vegetable khichdi with low-fat curd", calories: 400 },
      { type: "Snack", description: "Cucumber and carrot sticks with hung curd dip", calories: 100 },
      { type: "Dinner", description: "Tandoori chicken with mixed vegetable salad", calories: 450 },
    ],
    // Day 5
    [
      { type: "Breakfast", description: "Ragi dosa with tomato chutney", calories: 300 },
      { type: "Snack", description: "Pear with cinnamon", calories: 120 },
      { type: "Lunch", description: "Quinoa pulao with mixed vegetables and raita", calories: 420 },
      { type: "Snack", description: "Lemon water with chia seeds", calories: 80 },
      { type: "Dinner", description: "Masala-baked tofu with sautéed vegetables", calories: 420 },
    ],
    // Day 6
    [
      { type: "Breakfast", description: "Besan chilla with mint-coriander chutney", calories: 280 },
      { type: "Snack", description: "Watermelon cubes", calories: 100 },
      { type: "Lunch", description: "Roti with bhindi (okra) masala and dal", calories: 430 },
      { type: "Snack", description: "Sprouts salad with lemon dressing", calories: 150 },
      { type: "Dinner", description: "Steamed fish curry with cauliflower rice", calories: 400 },
    ],
    // Day 7
    [
      { type: "Breakfast", description: "Daliya (broken wheat) porridge with mixed nuts", calories: 320 },
      { type: "Snack", description: "Cucumber raita", calories: 100 },
      { type: "Lunch", description: "Multigrain roti with mixed vegetable curry", calories: 420 },
      { type: "Snack", description: "Roasted peanuts (small portion)", calories: 150 },
      { type: "Dinner", description: "Egg curry (2 eggs) with steamed vegetables", calories: 450 },
    ],
    // Day 8
    [
      { type: "Breakfast", description: "Vegetable uttapam with coconut chutney", calories: 320 },
      { type: "Snack", description: "Pomegranate seeds", calories: 120 },
      { type: "Lunch", description: "Brown rice with chana masala and cucumber salad", calories: 450 },
      { type: "Snack", description: "Masala chaas (spiced buttermilk)", calories: 80 },
      { type: "Dinner", description: "Grilled paneer tikka with mint chutney and salad", calories: 420 },
    ],
    // Day 9
    [
      { type: "Breakfast", description: "Egg white bhurji with multigrain toast", calories: 280 },
      { type: "Snack", description: "Kiwi fruit", calories: 100 },
      { type: "Lunch", description: "Roti with methi (fenugreek) aloo and dal", calories: 430 },
      { type: "Snack", description: "Roasted chana", calories: 150 },
      { type: "Dinner", description: "Baked fish with tomato curry and steamed vegetables", calories: 450 },
    ],
    // Day 10
    [
      { type: "Breakfast", description: "Jowar (sorghum) roti with vegetable sabzi", calories: 300 },
      { type: "Snack", description: "Mixed berries", calories: 100 },
      { type: "Lunch", description: "Quinoa with mixed vegetables and curd", calories: 420 },
      { type: "Snack", description: "Green tea with lemon", calories: 10 },
      { type: "Dinner", description: "Chicken soup with vegetables", calories: 350 },
    ],
    // Day 11
    [
      { type: "Breakfast", description: "Steamed idli with sambar (no coconut chutney)", calories: 300 },
      { type: "Snack", description: "Papaya cubes", calories: 120 },
      { type: "Lunch", description: "Roti with tinda (apple gourd) sabzi and dal", calories: 420 },
      { type: "Snack", description: "Roasted flax seeds with buttermilk", calories: 120 },
      { type: "Dinner", description: "Grilled fish with mint-coriander chutney and salad", calories: 420 },
    ],
    // Day 12
    [
      { type: "Breakfast", description: "Vegetable dalia upma", calories: 280 },
      { type: "Snack", description: "Cucumber and tomato slices with black salt", calories: 80 },
      { type: "Lunch", description: "Brown rice pulao with mixed vegetables and raita", calories: 420 },
      { type: "Snack", description: "Roasted makhana", calories: 150 },
      { type: "Dinner", description: "Egg white omelette with vegetables and multigrain toast", calories: 350 },
    ],
    // Day 13
    [
      { type: "Breakfast", description: "Ragi porridge with skimmed milk", calories: 300 },
      { type: "Snack", description: "Amla (Indian gooseberry) juice", calories: 80 },
      { type: "Lunch", description: "Multigrain roti with palak (spinach) curry and dal", calories: 430 },
      { type: "Snack", description: "Steamed sprouts with lemon and spices", calories: 150 },
      { type: "Dinner", description: "Grilled chicken with mint chutney and salad", calories: 420 },
    ],
    // Day 14
    [
      { type: "Breakfast", description: "Vegetable sevai (rice noodles) with minimal oil", calories: 300 },
      { type: "Snack", description: "Coconut water", calories: 100 },
      { type: "Lunch", description: "Roti with lauki kofta curry (steamed, not fried)", calories: 420 },
      { type: "Snack", description: "Roasted chana", calories: 150 },
      { type: "Dinner", description: "Fish curry with cauliflower rice", calories: 420 },
    ],
    // Day 15
    [
      { type: "Breakfast", description: "Mixed vegetable cheela with mint chutney", calories: 280 },
      { type: "Snack", description: "Apple slices with cinnamon", calories: 120 },
      { type: "Lunch", description: "Brown rice with rajma and cucumber raita", calories: 450 },
      { type: "Snack", description: "Buttermilk with roasted cumin", calories: 80 },
      { type: "Dinner", description: "Tandoori chicken (2 pieces) with green salad", calories: 420 },
    ],
  ]

  // Weight Gain Diet Plans - Different for each day
  const weightGainDiets = [
    // Day 1
    [
      { type: "Breakfast", description: "Paneer paratha with ghee and a glass of full-fat milk", calories: 650 },
      { type: "Snack", description: "Dry fruit milkshake with almonds and cashews", calories: 350 },
      { type: "Lunch", description: "Chicken biryani with raita and papad", calories: 750 },
      { type: "Snack", description: "Peanut chikki and a banana", calories: 400 },
      { type: "Dinner", description: "Butter chicken with naan and jeera rice", calories: 800 },
    ],
    // Day 2
    [
      { type: "Breakfast", description: "Aloo paratha with butter and lassi", calories: 680 },
      { type: "Snack", description: "Mixed dry fruits and nuts with honey", calories: 400 },
      { type: "Lunch", description: "Mutton curry with rice and papad", calories: 800 },
      { type: "Snack", description: "Banana shake with full-fat milk and ice cream", calories: 450 },
      { type: "Dinner", description: "Paneer butter masala with garlic naan", calories: 750 },
    ],
    // Day 3
    [
      { type: "Breakfast", description: "Chole bhature with pickle and a glass of milk", calories: 700 },
      { type: "Snack", description: "Mango shake with full-fat milk", calories: 400 },
      { type: "Lunch", description: "Rajma chawal with ghee and papad", calories: 750 },
      { type: "Snack", description: "Samosa with mint chutney", calories: 350 },
      { type: "Dinner", description: "Chicken tikka masala with butter naan", calories: 800 },
    ],
    // Day 4
    [
      { type: "Breakfast", description: "Stuffed masala dosa with coconut chutney and sambar", calories: 650 },
      { type: "Snack", description: "Almond and date shake", calories: 400 },
      { type: "Lunch", description: "Egg biryani with raita and papad", calories: 750 },
      { type: "Snack", description: "Vada pav with chutney", calories: 450 },
      { type: "Dinner", description: "Malai kofta with butter naan and pulao", calories: 800 },
    ],
    // Day 5
    [
      { type: "Breakfast", description: "Egg bhurji with cheese and buttered toast", calories: 650 },
      { type: "Snack", description: "Peanut butter banana shake", calories: 450 },
      { type: "Lunch", description: "Kadai paneer with butter roti and jeera rice", calories: 750 },
      { type: "Snack", description: "Kaju katli and milk", calories: 400 },
      { type: "Dinner", description: "Fish curry with coconut milk and ghee rice", calories: 750 },
    ],
    // Day 6
    [
      { type: "Breakfast", description: "Gobi paratha with butter and full-fat curd", calories: 650 },
      { type: "Snack", description: "Chikki and milk", calories: 400 },
      { type: "Lunch", description: "Chicken curry with ghee rice and papad", calories: 800 },
      { type: "Snack", description: "Cheese sandwich with butter", calories: 450 },
      { type: "Dinner", description: "Dal makhani with butter naan", calories: 750 },
    ],
    // Day 7
    [
      { type: "Breakfast", description: "Masala omelette with cheese and buttered toast", calories: 650 },
      { type: "Snack", description: "Cashew and raisin mixture with milk", calories: 400 },
      { type: "Lunch", description: "Mutton biryani with raita", calories: 800 },
      { type: "Snack", description: "Potato chips and milkshake", calories: 500 },
      { type: "Dinner", description: "Shahi paneer with butter naan", calories: 750 },
    ],
    // Day 8
    [
      { type: "Breakfast", description: "Methi paratha with butter and lassi", calories: 650 },
      { type: "Snack", description: "Banana shake with protein powder", calories: 400 },
      { type: "Lunch", description: "Chicken dum biryani with raita and papad", calories: 800 },
      { type: "Snack", description: "Bread pakora with chutney", calories: 450 },
      { type: "Dinner", description: "Butter chicken with garlic naan", calories: 800 },
    ],
    // Day 9
    [
      { type: "Breakfast", description: "Poori bhaji with pickle and a glass of milk", calories: 700 },
      { type: "Snack", description: "Mixed dry fruit milkshake", calories: 450 },
      { type: "Lunch", description: "Paneer biryani with raita", calories: 750 },
      { type: "Snack", description: "Aloo tikki with curd", calories: 400 },
      { type: "Dinner", description: "Mutton rogan josh with butter naan", calories: 850 },
    ],
    // Day 10
    [
      { type: "Breakfast", description: "Cheese masala dosa with coconut chutney", calories: 650 },
      { type: "Snack", description: "Pista badam milk", calories: 400 },
      { type: "Lunch", description: "Fish curry with coconut rice", calories: 750 },
      { type: "Snack", description: "Kachori with aloo sabzi", calories: 500 },
      { type: "Dinner", description: "Chicken korma with butter naan", calories: 800 },
    ],
    // Day 11
    [
      { type: "Breakfast", description: "Egg paratha with butter and lassi", calories: 700 },
      { type: "Snack", description: "Chocolate milkshake with nuts", calories: 450 },
      { type: "Lunch", description: "Chole with bhature and pickle", calories: 800 },
      { type: "Snack", description: "Paneer pakora with chutney", calories: 450 },
      { type: "Dinner", description: "Mutton keema with butter naan", calories: 800 },
    ],
    // Day 12
    [
      { type: "Breakfast", description: "Stuffed paneer paratha with butter and milk", calories: 700 },
      { type: "Snack", description: "Badam halwa", calories: 450 },
      { type: "Lunch", description: "Chicken pulao with raita", calories: 750 },
      { type: "Snack", description: "Cheese toast with butter", calories: 400 },
      { type: "Dinner", description: "Paneer tikka masala with butter naan", calories: 800 },
    ],
    // Day 13
    [
      { type: "Breakfast", description: "Masala uttapam with coconut chutney and sambar", calories: 650 },
      { type: "Snack", description: "Banana shake with ice cream", calories: 500 },
      { type: "Lunch", description: "Mutton curry with ghee rice", calories: 850 },
      { type: "Snack", description: "Mathri with pickle", calories: 400 },
      { type: "Dinner", description: "Butter chicken with cheese naan", calories: 850 },
    ],
    // Day 14
    [
      { type: "Breakfast", description: "Bread omelette with cheese and butter", calories: 650 },
      { type: "Snack", description: "Dry fruit ladoo with milk", calories: 450 },
      { type: "Lunch", description: "Chicken biryani with raita and papad", calories: 800 },
      { type: "Snack", description: "Samosa with chutney", calories: 400 },
      { type: "Dinner", description: "Dal makhani with butter naan and jeera rice", calories: 750 },
    ],
    // Day 15
    [
      { type: "Breakfast", description: "Aloo paratha with paneer bhurji and lassi", calories: 750 },
      { type: "Snack", description: "Mango shake with full-fat milk", calories: 450 },
      { type: "Lunch", description: "Mutton biryani with raita and papad", calories: 850 },
      { type: "Snack", description: "Bread pakora with chutney", calories: 450 },
      { type: "Dinner", description: "Chicken tikka masala with butter naan and pulao", calories: 850 },
    ],
  ]

  // Bodybuilding Diet Plans - Different for each day
  const bodybuildingDiets = [
    // Day 1
    [
      { type: "Breakfast", description: "Egg bhurji with whole wheat toast and a glass of milk", calories: 550 },
      { type: "Snack", description: "Protein shake with banana and peanut butter", calories: 250 },
      { type: "Lunch", description: "Tandoori chicken with brown rice and mixed vegetable curry", calories: 650 },
      { type: "Pre-Workout", description: "Ragi porridge with jaggery", calories: 300 },
      { type: "Post-Workout", description: "Whey protein shake with banana", calories: 300 },
      { type: "Dinner", description: "Grilled fish with quinoa pulao and dal tadka", calories: 550 },
    ],
    // Day 2
    [
      { type: "Breakfast", description: "Paneer bhurji with multigrain paratha", calories: 550 },
      { type: "Snack", description: "Greek yogurt with honey and mixed nuts", calories: 300 },
      { type: "Lunch", description: "Chicken curry with brown rice and cucumber raita", calories: 650 },
      { type: "Pre-Workout", description: "Sweet potato chaat", calories: 250 },
      { type: "Post-Workout", description: "Protein shake with almond milk", calories: 300 },
      { type: "Dinner", description: "Egg curry with multigrain roti and vegetable salad", calories: 550 },
    ],
    // Day 3
    [
      { type: "Breakfast", description: "Moong dal cheela with paneer stuffing", calories: 550 },
      { type: "Snack", description: "Sprouts salad with lemon dressing", calories: 250 },
      { type: "Lunch", description: "Mutton curry with brown rice and mixed vegetables", calories: 700 },
      { type: "Pre-Workout", description: "Banana with peanut butter", calories: 300 },
      { type: "Post-Workout", description: "Whey protein shake", calories: 250 },
      { type: "Dinner", description: "Grilled chicken with vegetable pulao", calories: 600 },
    ],
    // Day 4
    [
      { type: "Breakfast", description: "Oats with milk, banana, and mixed nuts", calories: 550 },
      { type: "Snack", description: "Paneer tikka (grilled)", calories: 300 },
      { type: "Lunch", description: "Fish curry with brown rice and vegetable salad", calories: 650 },
      { type: "Pre-Workout", description: "Multigrain toast with peanut butter", calories: 300 },
      { type: "Post-Workout", description: "Protein shake with water", calories: 250 },
      { type: "Dinner", description: "Chicken keema with multigrain roti and dal", calories: 600 },
    ],
    // Day 5
    [
      { type: "Breakfast", description: "Vegetable upma with egg whites", calories: 500 },
      { type: "Snack", description: "Roasted chickpeas with spices", calories: 250 },
      { type: "Lunch", description: "Chicken biryani (brown rice) with raita", calories: 650 },
      { type: "Pre-Workout", description: "Apple with almond butter", calories: 250 },
      { type: "Post-Workout", description: "Protein shake with banana", calories: 300 },
      { type: "Dinner", description: "Paneer tikka masala with multigrain roti", calories: 600 },
    ],
    // Day 6
    [
      { type: "Breakfast", description: "Masala omelette with multigrain toast", calories: 550 },
      { type: "Snack", description: "Buttermilk with roasted cumin", calories: 150 },
      { type: "Lunch", description: "Rajma curry with brown rice and salad", calories: 650 },
      { type: "Pre-Workout", description: "Ragi cookies with milk", calories: 300 },
      { type: "Post-Workout", description: "Protein shake with water", calories: 250 },
      { type: "Dinner", description: "Grilled fish with vegetable curry and roti", calories: 600 },
    ],
    // Day 7
    [
      { type: "Breakfast", description: "Besan chilla with paneer stuffing", calories: 550 },
      { type: "Snack", description: "Mixed fruit bowl with Greek yogurt", calories: 300 },
      { type: "Lunch", description: "Mutton keema with brown rice and dal", calories: 700 },
      { type: "Pre-Workout", description: "Sweet potato wedges", calories: 250 },
      { type: "Post-Workout", description: "Protein shake with milk", calories: 300 },
      { type: "Dinner", description: "Egg curry with multigrain roti and vegetables", calories: 550 },
    ],
    // Day 8
    [
      { type: "Breakfast", description: "Vegetable daliya with boiled eggs", calories: 550 },
      { type: "Snack", description: "Roasted peanuts and a banana", calories: 300 },
      { type: "Lunch", description: "Chicken curry with brown rice and cucumber raita", calories: 650 },
      { type: "Pre-Workout", description: "Multigrain toast with honey", calories: 250 },
      { type: "Post-Workout", description: "Protein shake with water", calories: 250 },
      { type: "Dinner", description: "Paneer bhurji with multigrain roti and dal", calories: 600 },
    ],
    // Day 9
    [
      { type: "Breakfast", description: "Egg curry with multigrain paratha", calories: 600 },
      { type: "Snack", description: "Sprouts salad with lemon dressing", calories: 250 },
      { type: "Lunch", description: "Fish curry with brown rice and mixed vegetables", calories: 650 },
      { type: "Pre-Workout", description: "Banana with peanut butter", calories: 300 },
      { type: "Post-Workout", description: "Protein shake with milk", calories: 300 },
      { type: "Dinner", description: "Chicken tikka with multigrain roti and vegetable curry", calories: 600 },
    ],
    // Day 10
    [
      { type: "Breakfast", description: "Paneer paratha with curd (made with minimal oil)", calories: 550 },
      { type: "Snack", description: "Mixed nuts and seeds", calories: 300 },
      { type: "Lunch", description: "Mutton curry with brown rice and salad", calories: 700 },
      { type: "Pre-Workout", description: "Sweet potato chaat", calories: 250 },
      { type: "Post-Workout", description: "Protein shake with water", calories: 250 },
      { type: "Dinner", description: "Egg bhurji with multigrain roti and dal", calories: 550 },
    ],
    // Day 11
    [
      { type: "Breakfast", description: "Vegetable uttapam with coconut chutney", calories: 550 },
      { type: "Snack", description: "Greek yogurt with berries", calories: 250 },
      { type: "Lunch", description: "Chicken biryani (brown rice) with raita", calories: 650 },
      { type: "Pre-Workout", description: "Apple with almond butter", calories: 300 },
      { type: "Post-Workout", description: "Protein shake with banana", calories: 300 },
      { type: "Dinner", description: "Fish curry with multigrain roti and vegetables", calories: 600 },
    ],
    // Day 12
    [
      { type: "Breakfast", description: "Egg white omelette with vegetables and multigrain toast", calories: 500 },
      { type: "Snack", description: "Roasted chickpeas", calories: 250 },
      { type: "Lunch", description: "Paneer tikka masala with brown rice", calories: 650 },
      { type: "Pre-Workout", description: "Banana with honey", calories: 250 },
      { type: "Post-Workout", description: "Protein shake with water", calories: 250 },
      { type: "Dinner", description: "Chicken curry with multigrain roti and dal", calories: 600 },
    ],
    // Day 13
    [
      { type: "Breakfast", description: "Moong dal cheela with vegetable stuffing", calories: 500 },
      { type: "Snack", description: "Paneer cubes with spices", calories: 300 },
      { type: "Lunch", description: "Fish curry with brown rice and salad", calories: 650 },
      { type: "Pre-Workout", description: "Sweet potato wedges", calories: 250 },
      { type: "Post-Workout", description: "Protein shake with milk", calories: 300 },
      { type: "Dinner", description: "Egg curry with multigrain roti and vegetables", calories: 550 },
    ],
    // Day 14
    [
      { type: "Breakfast", description: "Vegetable poha with boiled eggs", calories: 550 },
      { type: "Snack", description: "Mixed nuts and seeds", calories: 300 },
      { type: "Lunch", description: "Chicken curry with brown rice and raita", calories: 650 },
      { type: "Pre-Workout", description: "Multigrain toast with peanut butter", calories: 300 },
      { type: "Post-Workout", description: "Protein shake with water", calories: 250 },
      { type: "Dinner", description: "Paneer bhurji with multigrain roti and dal", calories: 600 },
    ],
    // Day 15
    [
      { type: "Breakfast", description: "Masala omelette with multigrain toast and a glass of milk", calories: 600 },
      { type: "Snack", description: "Greek yogurt with honey and nuts", calories: 300 },
      { type: "Lunch", description: "Mutton curry with brown rice and mixed vegetables", calories: 700 },
      { type: "Pre-Workout", description: "Banana with peanut butter", calories: 300 },
      { type: "Post-Workout", description: "Protein shake with milk", calories: 300 },
      { type: "Dinner", description: "Grilled fish with multigrain roti and vegetable curry", calories: 600 },
    ],
  ]

  // Cardio Diet Plans - Different for each day
  const cardioDiets = [
    // Day 1
    [
      { type: "Breakfast", description: "Oats idli with coconut chutney", calories: 400 },
      { type: "Snack", description: "Apple with a handful of almonds", calories: 200 },
      { type: "Lunch", description: "Multigrain roti with mixed vegetable sabzi and dal", calories: 500 },
      { type: "Snack", description: "Roasted makhana (fox nuts)", calories: 200 },
      { type: "Dinner", description: "Vegetable khichdi with low-fat curd", calories: 550 },
    ],
    // Day 2
    [
      { type: "Breakfast", description: "Vegetable upma with a small cup of curd", calories: 400 },
      { type: "Snack", description: "Orange and a few walnuts", calories: 200 },
      { type: "Lunch", description: "Brown rice with rajma curry and cucumber salad", calories: 550 },
      { type: "Snack", description: "Buttermilk with roasted cumin", calories: 150 },
      { type: "Dinner", description: "Grilled fish with steamed vegetables", calories: 500 },
    ],
    // Day 3
    [
      { type: "Breakfast", description: "Moong dal cheela with mint chutney", calories: 400 },
      { type: "Snack", description: "Pear with a few almonds", calories: 200 },
      { type: "Lunch", description: "Vegetable pulao with raita", calories: 500 },
      { type: "Snack", description: "Roasted chana", calories: 200 },
      { type: "Dinner", description: "Grilled chicken with mixed vegetable salad", calories: 550 },
    ],
    // Day 4
    [
      { type: "Breakfast", description: "Vegetable poha with sprouts", calories: 400 },
      { type: "Snack", description: "Guava with black salt", calories: 150 },
      { type: "Lunch", description: "Roti with palak paneer and dal", calories: 550 },
      { type: "Snack", description: "Cucumber and carrot sticks with hummus", calories: 200 },
      { type: "Dinner", description: "Fish curry with brown rice", calories: 550 },
    ],
    // Day 5
    [
      { type: "Breakfast", description: "Ragi dosa with tomato chutney", calories: 400 },
      { type: "Snack", description: "Mixed berries with a few nuts", calories: 200 },
      { type: "Lunch", description: "Multigrain roti with bhindi (okra) masala and dal", calories: 500 },
      { type: "Snack", description: "Roasted makhana", calories: 200 },
      { type: "Dinner", description: "Vegetable khichdi with low-fat curd", calories: 500 },
    ],
    // Day 6
    [
      { type: "Breakfast", description: "Vegetable uttapam with coconut chutney", calories: 450 },
      { type: "Snack", description: "Apple with cinnamon", calories: 150 },
      { type: "Lunch", description: "Brown rice with chana masala and cucumber salad", calories: 550 },
      { type: "Snack", description: "Sprouts salad with lemon dressing", calories: 200 },
      { type: "Dinner", description: "Grilled chicken with steamed vegetables", calories: 500 },
    ],
    // Day 7
    [
      { type: "Breakfast", description: "Vegetable daliya (broken wheat) with a small cup of curd", calories: 400 },
      { type: "Snack", description: "Pomegranate seeds", calories: 150 },
      { type: "Lunch", description: "Roti with mixed vegetable curry and dal", calories: 500 },
      { type: "Snack", description: "Roasted peanuts (small portion)", calories: 200 },
      { type: "Dinner", description: "Fish curry with brown rice", calories: 550 },
    ],
    // Day 8
    [
      { type: "Breakfast", description: "Besan chilla with mint-coriander chutney", calories: 400 },
      { type: "Snack", description: "Orange and a few almonds", calories: 200 },
      { type: "Lunch", description: "Vegetable biryani with raita", calories: 550 },
      { type: "Snack", description: "Buttermilk with roasted cumin", calories: 150 },
      { type: "Dinner", description: "Egg curry with multigrain roti", calories: 500 },
    ],
    // Day 9
    [
      { type: "Breakfast", description: "Idli with sambar (no coconut chutney)", calories: 400 },
      { type: "Snack", description: "Apple with a few walnuts", calories: 200 },
      { type: "Lunch", description: "Roti with lauki (bottle gourd) curry and dal", calories: 500 },
      { type: "Snack", description: "Roasted chana", calories: 200 },
      { type: "Dinner", description: "Grilled fish with mixed vegetable salad", calories: 500 },
    ],
    // Day 10
    [
      { type: "Breakfast", description: "Vegetable sevai (rice noodles) with minimal oil", calories: 400 },
      { type: "Snack", description: "Pear and a few almonds", calories: 200 },
      { type: "Lunch", description: "Brown rice with rajma and cucumber raita", calories: 550 },
      { type: "Snack", description: "Roasted makhana", calories: 200 },
      { type: "Dinner", description: "Chicken soup with vegetables", calories: 450 },
    ],
    // Day 11
    [
      { type: "Breakfast", description: "Vegetable upma with a small cup of curd", calories: 400 },
      { type: "Snack", description: "Mixed berries", calories: 150 },
      { type: "Lunch", description: "Multigrain roti with mixed vegetable curry and dal", calories: 550 },
      { type: "Snack", description: "Cucumber and carrot sticks with hung curd dip", calories: 150 },
      { type: "Dinner", description: "Fish curry with brown rice", calories: 550 },
    ],
    // Day 12
    [
      { type: "Breakfast", description: "Moong dal cheela with tomato chutney", calories: 400 },
      { type: "Snack", description: "Apple with cinnamon", calories: 150 },
      { type: "Lunch", description: "Vegetable pulao with raita", calories: 500 },
      { type: "Snack", description: "Roasted peanuts (small portion)", calories: 200 },
      { type: "Dinner", description: "Grilled chicken with steamed vegetables", calories: 500 },
    ],
    // Day 13
    [
      { type: "Breakfast", description: "Ragi porridge with skimmed milk", calories: 400 },
      { type: "Snack", description: "Orange and a few almonds", calories: 200 },
      { type: "Lunch", description: "Roti with palak (spinach) curry and dal", calories: 500 },
      { type: "Snack", description: "Buttermilk with roasted cumin", calories: 150 },
      { type: "Dinner", description: "Vegetable khichdi with low-fat curd", calories: 500 },
    ],
    // Day 14
    [
      { type: "Breakfast", description: "Vegetable poha with sprouts", calories: 400 },
      { type: "Snack", description: "Pear with a few walnuts", calories: 200 },
      { type: "Lunch", description: "Brown rice with chana masala and cucumber salad", calories: 550 },
      { type: "Snack", description: "Roasted makhana", calories: 200 },
      { type: "Dinner", description: "Egg curry with multigrain roti", calories: 500 },
    ],
    // Day 15
    [
      { type: "Breakfast", description: "Vegetable uttapam with tomato chutney", calories: 450 },
      { type: "Snack", description: "Apple and a few almonds", calories: 200 },
      { type: "Lunch", description: "Multigrain roti with mixed vegetable curry and dal", calories: 550 },
      { type: "Snack", description: "Sprouts salad with lemon dressing", calories: 200 },
      { type: "Dinner", description: "Grilled fish with steamed vegetables", calories: 500 },
    ],
  ]

  // Select the appropriate diet plan based on goal and day
  const dayIndex = (day - 1) % 15 // Ensure we stay within the array bounds

  if (goal === "weight-loss") {
    return weightLossDiets[dayIndex]
  } else if (goal === "weight-gain") {
    return weightGainDiets[dayIndex]
  } else if (goal === "bodybuilding") {
    return bodybuildingDiets[dayIndex]
  } else if (goal === "cardio") {
    return cardioDiets[dayIndex]
  }

  // Default fallback (should never reach here)
  return [
    { type: "Breakfast", description: "Balanced meal", calories: 400 },
    { type: "Lunch", description: "Balanced meal", calories: 500 },
    { type: "Dinner", description: "Balanced meal", calories: 500 },
  ]
}

// Add a function to mark a specific day as complete
export async function markDayAsComplete(day: number): Promise<boolean> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const currentUser = await getCurrentUser()
  if (!currentUser) return false

  const userPlan = userPlans[currentUser.id]
  if (!userPlan) return false

  // Only allow marking the next day as complete
  if (day !== userPlan.daysCompleted + 1) return false

  // Update days completed
  userPlan.daysCompleted = day

  // If all 15 days are completed, prompt for progress update
  if (userPlan.daysCompleted >= 15) {
    // In a real app, you might redirect to the progress update page
    // or show a notification
  }

  return true
}

// Update the updateProgress function to generate a more challenging plan
export async function updateProgress(newWeight: number, completed: boolean): Promise<boolean> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const currentUser = await getCurrentUser()
  if (!currentUser) return false

  const userProfile = userProfiles[currentUser.id]
  const userPlan = userPlans[currentUser.id]

  if (!userProfile || !userPlan) return false

  // Update user weight
  userProfile.weight = newWeight

  // If user completed the plan, mark all days as completed
  if (completed) {
    userPlan.daysCompleted = 15

    // Generate a new plan with increased difficulty
    generateNewPlan(currentUser.id, userProfile.goal)
  }

  return true
}

// Update the generateNewPlan function to create a more challenging plan
function generateNewPlan(userId: string, goal: string) {
  // Get the current user profile
  const userProfile = userProfiles[userId]
  if (!userProfile) return

  // Create a new plan with increased difficulty
  const workoutPlan = []
  const dietPlan = []

  // Generate 15 days of more challenging workout and diet plans
  for (let day = 1; day <= 15; day++) {
    // Generate more challenging workout based on goal
    const exercises = generateAdvancedExercisesForGoal(goal, day)
    workoutPlan.push({
      day,
      exercises,
    })

    // Generate stricter diet plan based on goal
    const meals = generateMealsForGoal(goal, day)
    dietPlan.push({
      day,
      meals,
    })
  }

  // Update the user's plan
  userPlans[userId] = {
    userId,
    workoutPlan,
    dietPlan,
    daysCompleted: 0,
  }
}

// Function to generate more challenging exercises
function generateAdvancedExercisesForGoal(goal: string, day: number) {
  const exercises = []

  if (goal === "weight-loss") {
    // More intense weight loss workouts
    if (day % 3 === 1) {
      // HIIT day
      exercises.push(
        { name: "Burpee Intervals", sets: 5, reps: 15, rest: "30 sec" },
        { name: "Mountain Climbers", sets: 4, reps: 30, rest: "30 sec" },
        { name: "Jump Squats", sets: 4, reps: 20, rest: "30 sec" },
        { name: "Plank to Push-up", sets: 4, reps: 12, rest: "30 sec" },
        { name: "Kettlebell Swings", sets: 4, reps: 20, rest: "30 sec" },
      )
    } else if (day % 3 === 2) {
      // Circuit training
      exercises.push(
        { name: "Dumbbell Thrusters", sets: 4, reps: 15, rest: "45 sec" },
        { name: "Renegade Rows", sets: 4, reps: 12, rest: "45 sec" },
        { name: "Box Jumps", sets: 4, reps: 15, rest: "45 sec" },
        { name: "Battle Ropes", sets: 4, reps: 30, rest: "45 sec" },
        { name: "Medicine Ball Slams", sets: 4, reps: 15, rest: "45 sec" },
      )
    } else {
      // Cardio and core
      exercises.push(
        { name: "Treadmill Sprints", sets: 6, reps: 1, rest: "60 sec" },
        { name: "Hanging Leg Raises", sets: 3, reps: 15, rest: "45 sec" },
        { name: "Russian Twists", sets: 3, reps: 30, rest: "45 sec" },
        { name: "Plank Variations", sets: 3, reps: 3, rest: "30 sec" },
        { name: "Rowing Machine Intervals", sets: 5, reps: 1, rest: "60 sec" },
      )
    }
  } else if (goal === "weight-gain") {
    // More intense weight gain workouts
    if (day % 3 === 1) {
      // Heavy push day
      exercises.push(
        { name: "Bench Press (Heavy)", sets: 5, reps: 5, rest: "2 min" },
        { name: "Incline Dumbbell Press", sets: 4, reps: 8, rest: "90 sec" },
        { name: "Weighted Dips", sets: 4, reps: 8, rest: "90 sec" },
        { name: "Overhead Press", sets: 4, reps: 8, rest: "90 sec" },
        { name: "Tricep Extensions", sets: 3, reps: 12, rest: "60 sec" },
      )
    } else if (day % 3 === 2) {
      // Heavy pull day
      exercises.push(
        { name: "Deadlifts (Heavy)", sets: 5, reps: 5, rest: "3 min" },
        { name: "Weighted Pull-ups", sets: 4, reps: 8, rest: "90 sec" },
        { name: "Barbell Rows", sets: 4, reps: 8, rest: "90 sec" },
        { name: "T-Bar Rows", sets: 4, reps: 8, rest: "90 sec" },
        { name: "Barbell Curls", sets: 3, reps: 12, rest: "60 sec" },
      )
    } else {
      // Heavy leg day
      exercises.push(
        { name: "Squats (Heavy)", sets: 5, reps: 5, rest: "3 min" },
        { name: "Leg Press", sets: 4, reps: 10, rest: "2 min" },
        { name: "Romanian Deadlifts", sets: 4, reps: 8, rest: "2 min" },
        { name: "Walking Lunges", sets: 3, reps: 20, rest: "90 sec" },
        { name: "Calf Raises", sets: 4, reps: 15, rest: "60 sec" },
      )
    }
  } else if (goal === "bodybuilding") {
    // More intense bodybuilding workouts
    if (day % 4 === 1) {
      // Chest and triceps
      exercises.push(
        { name: "Incline Bench Press", sets: 4, reps: 10, rest: "90 sec" },
        { name: "Flat Dumbbell Press", sets: 4, reps: 10, rest: "90 sec" },
        { name: "Cable Flyes", sets: 3, reps: 12, rest: "60 sec" },
        { name: "Skull Crushers", sets: 3, reps: 12, rest: "60 sec" },
        { name: "Tricep Pushdowns", sets: 3, reps: 15, rest: "60 sec" },
      )
    } else if (day % 4 === 2) {
      // Back and biceps
      exercises.push(
        { name: "Weighted Pull-ups", sets: 4, reps: 8, rest: "90 sec" },
        { name: "Seated Cable Rows", sets: 4, reps: 10, rest: "90 sec" },
        { name: "Dumbbell Rows", sets: 3, reps: 12, rest: "60 sec" },
        { name: "Barbell Curls", sets: 3, reps: 12, rest: "60 sec" },
        { name: "Hammer Curls", sets: 3, reps: 15, rest: "60 sec" },
      )
    } else if (day % 4 === 3) {
      // Legs
      exercises.push(
        { name: "Front Squats", sets: 4, reps: 10, rest: "90 sec" },
        { name: "Hack Squats", sets: 4, reps: 10, rest: "90 sec" },
        { name: "Leg Extensions", sets: 3, reps: 15, rest: "60 sec" },
        { name: "Leg Curls", sets: 3, reps: 15, rest: "60 sec" },
        { name: "Standing Calf Raises", sets: 4, reps: 20, rest: "60 sec" },
      )
    } else {
      // Shoulders and abs
      exercises.push(
        { name: "Seated Dumbbell Press", sets: 4, reps: 10, rest: "90 sec" },
        { name: "Upright Rows", sets: 4, reps: 10, rest: "90 sec" },
        { name: "Lateral Raises", sets: 3, reps: 15, rest: "60 sec" },
        { name: "Cable Crunches", sets: 3, reps: 15, rest: "60 sec" },
        { name: "Hanging Leg Raises", sets: 3, reps: 15, rest: "60 sec" },
      )
    }
  } else if (goal === "cardio") {
    // More intense cardio workouts
    if (day % 3 === 1) {
      // High intensity intervals
      exercises.push(
        { name: "Sprint Intervals (30s on/30s off)", sets: 10, reps: 1, rest: "30 sec" },
        { name: "Burpees", sets: 4, reps: 15, rest: "45 sec" },
        { name: "Jump Rope (Double Unders)", sets: 4, reps: 50, rest: "45 sec" },
      )
    } else if (day % 3 === 2) {
      // Endurance training
      exercises.push(
        { name: "5K Run", sets: 1, reps: 1, rest: "N/A" },
        { name: "Cycling (High Resistance)", sets: 1, reps: 1, rest: "N/A" },
        { name: "Stair Climber", sets: 1, reps: 1, rest: "N/A" },
      )
    } else {
      // Cross training
      exercises.push(
        { name: "Swimming Intervals", sets: 6, reps: 1, rest: "60 sec" },
        { name: "Battle Ropes", sets: 4, reps: 30, rest: "45 sec" },
        { name: "Box Jumps", sets: 4, reps: 15, rest: "45 sec" },
        { name: "Rowing Machine", sets: 3, reps: 500, rest: "90 sec" },
      )
    }
  }

  return exercises
}

