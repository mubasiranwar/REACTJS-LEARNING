# Smart Dev Habit & Task Tracker

A modern, interactive React application for tracking developer habits and daily learning goals. Built with React, Tailwind CSS, and Vite to practice frontend development concepts while building a practical productivity tool.

## 1. Project Overview

### What the Application Does
The Smart Dev Habit Tracker is a frontend-only React application that helps developers track and maintain consistent learning and coding habits. Users can create habits with specific time commitments, track completion status, maintain streak counts, and visualize progress through a dashboard.

### Why I Built It
This project was created as a hands-on learning exercise to practice:
- React state management and component architecture
- Building interactive UIs with user feedback
- Working with complex data transformations
- Implementing CRUD operations in a React application
- Using Tailwind CSS for responsive, modern design

### What Problem It Solves
Developers often struggle with maintaining consistent habits across multiple areas (Frontend, Backend, DSA, etc.). This tracker provides:
- A centralized view of all development habits
- Visual progress indicators and streaks for motivation
- Quick statistics on daily focus allocation and completion rates
- A simple interface to manage habits throughout the day

### Important Technical Context
- **Frontend-only application**: All data is stored in React state (useState), not a database
- **No backend**: No API calls or server-side persistence
- **Session-based data**: Habits are lost on page refresh (this is intentional for this learning project)
- **Client-side rendering**: All computation happens in the browser

## 2. Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.8 | UI library for component-based architecture |
| **JavaScript (ES6+)** | - | Application logic with modern syntax |
| **Tailwind CSS** | 4.3.3 | Utility-first CSS framework for styling |
| **Vite** | 8.2.0 | Fast build tool and dev server |
| **ESLint** | 10.8.0 | Code quality and linting |

**Why This Stack?**
- React: Industry-standard for building interactive UIs
- Tailwind: Enables rapid UI development with consistent design patterns
- Vite: Fast development experience with minimal configuration
- No external state management (Redux, Zustand): App is simple enough for built-in useState

## 3. Features

### Implemented Features

✅ **Add Habits**
- Create new habits with custom title, target minutes, and category
- Form validation prevents empty titles or missing minutes
- Form resets after successful submission

✅ **View Dashboard Statistics**
- Total number of habits
- Number of completed habits
- Total planned minutes across all habits
- Overall completion percentage (with edge case handling for zero habits)

✅ **Display Habits in Grid**
- Habits displayed in responsive grid (1 column on mobile, 2 on tablet, 3 on desktop)
- Visual distinction between completed (green) and pending (slate) habits
- Category labels for each habit

✅ **Toggle Completion Status**
- Click "Done"/"Pending" button to mark habit as complete
- Automatic streak increment when marking complete
- Streak decrements (with protection against negative values) when unchecking

✅ **Edit Habit Details**
- Click "Edit" to enter edit mode with form inputs
- Modify habit title and target minutes
- Save changes or cancel to revert
- Edit mode validation prevents invalid data

✅ **Delete Habits**
- Remove habit from list with delete button
- Immediate UI update after deletion

✅ **Empty State Handling**
- Clear message when no habits exist
- Encourages user to add first habit

✅ **Responsive Design**
- Mobile-first approach with Tailwind breakpoints
- Proper spacing and readability on all screen sizes

## 4. Project Structure

```
Habit-tracker/
├── src/
│   ├── components/
│   │   ├── DashboardStats.jsx      # Displays derived statistics
│   │   ├── HabitCard.jsx           # Individual habit with edit/delete/toggle
│   │   ├── HabitForm.jsx           # Form to create new habits
│   │   └── HabitList.jsx           # Container for habit cards
│   ├── App.jsx                     # Main component, state management
│   ├── main.jsx                    # React entry point
│   ├── index.css                   # Tailwind CSS import
│   └── App.css                     # Legacy/unused styles
├── public/                          # Static assets
├── index.html                       # HTML template
├── package.json                     # Dependencies and scripts
├── vite.config.js                   # Vite configuration
└── eslint.config.js                 # ESLint rules
```

### Component Responsibilities

**App.jsx** (Parent/Container Component)
- Owns the `habits` state - single source of truth
- Implements CRUD operations: `addHabit()`, `toggleHabit()`, `updateHabit()`, `deleteHabit()`
- Passes callbacks and data to child components via props
- Renders header, dashboard, form, and habit list

**DashboardStats.jsx** (Presentational Component)
- Receives `habits` array as prop
- Calculates derived data: total, completed, minutes, percentage
- Displays four stat cards in a responsive grid
- No state, no side effects - pure presentation

**HabitForm.jsx** (Presentational Component)
- Manages local form state (title, targetMinutes, category)
- Receives `onAddHabit` callback function
- Handles form submission with validation
- Resets form after successful submission

**HabitList.jsx** (Presentational Component)
- Receives habits array and callback functions
- Renders empty state or grid of HabitCards
- Maps over habits array with proper keys
- Spreads callbacks to HabitCard children

**HabitCard.jsx** (Presentational Component)
- Manages local edit mode state
- Receives individual habit and callback functions
- Toggles between view and edit modes
- Validates data before saving
- Renders completion button, edit/delete buttons, and streak display

### Data Flow Architecture

```
App.jsx (habits state)
│
├─→ DashboardStats
│   └─ reads habits
│
├─→ HabitForm
│   └─ calls onAddHabit()
│
└─→ HabitList
    ├─ maps habits
    └─→ HabitCard (multiple)
        ├─ calls onToggle()
        ├─ calls onUpdate()
        └─ calls onDelete()
```

**Key Principle**: "State lives at the lowest common parent that needs to coordinate it."
- Habits state must live in App because it's needed by multiple child branches (Dashboard, Form, List)
- Edit mode state lives in HabitCard because only that card needs to know if it's editing
- Form state lives in HabitForm because only the form needs those input values

## 5. Data Model

```javascript
{
  id: 1,                           // Unique identifier (Date.now())
  title: "React Practice",         // User-defined habit name
  targetMinutes: 60,               // Daily focus time goal
  category: "Frontend",            // Category for organization
  completed: true,                 // Is today's goal met?
  streak: 5                        // Consecutive daily completions
}
```

### Why Each Property Exists

| Property | Purpose | Why Important |
|----------|---------|---------------|
| **id** | Unique identifier for React keys and operations | React needs stable identifiers to match elements across renders |
| **title** | Human-readable name | Users need to understand what each habit is |
| **targetMinutes** | Time commitment goal | Enables tracking focus allocation and calculating total minutes |
| **category** | Organizational grouping | Helps filter/organize habits by area of focus |
| **completed** | Today's status | Determines UI styling and enables completion tracking |
| **streak** | Consecutive days completed | Provides motivation through visible progress |

## 6. React Concepts Learned

### useState Hook

**What is State?**
State is React's mechanism for storing data that can change over time. When state changes, React re-renders the component to reflect the new data.

**Why Habits are Stored in State**
```javascript
const [habits, setHabits] = useState([...])
```
- Habits must be stored in state because they change when user adds, edits, or deletes habits
- Every state change triggers a re-render, updating the UI automatically
- State is the "single source of truth" for all habits in the application

**Why State Change Causes Re-render**
React's mental model:
1. User action triggers event
2. Event handler calls setState()
3. React compares old state with new state
4. React re-renders the component
5. React updates the DOM with new JSX

```javascript
// When this is called:
setHabits([...habits, newHabit])

// React:
// 1. Updates the habits variable with new array
// 2. Runs the component function again
// 3. Returns new JSX
// 4. Updates browser DOM
```

**Application State vs. Local UI State**
- **Application State**: Habits array - data that defines the app's core functionality
- **Local UI State**: `isEditing` in HabitCard - temporary state for UI interaction, doesn't affect other components

**useState Usage in This Project**
- `App.jsx`: `habits` state (application data)
- `HabitForm.jsx`: `title`, `targetMinutes`, `category` (form inputs)
- `HabitCard.jsx`: `isEditing`, `editTitle`, `editMinutes` (UI interaction state)

### Props

**How Data Flows from Parent to Child**
```javascript
// App.jsx passes data DOWN to children
<DashboardStats habits={habits} />

// DashboardStats receives and uses it
function DashboardStats({ habits }) {
  const totalHabits = habits.length
}
```



**Project Type**: React Learning Project  
**Status**: Feature-complete Frontend Application
