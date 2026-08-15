# Counter Project

A foundational React learning project demonstrating the core concepts of state management and event handling through a simple counter application.

## Project Overview

This is an introductory React project focused on understanding:
- How React state works and triggers re-renders
- Event handling with button clicks
- Functional component structure
- Basic state updates with callbacks

The project provides a hands-on way to experiment with `useState` before moving to more complex applications.

**Frontend-only application**: All state is stored in React, no backend or database.

## Tech Stack

- **React** 19.2.8 - UI library
- **JavaScript (ES6+)** - Application logic
- **Vite** 8.2.0 - Build tool
- **ESLint** 10.8.0 - Code quality

## Features

✅ **Increment Buttons** - Add 1, 3, 5, or 10 to the counter
✅ **Decrement Button** - Decrease counter (with floor protection)
✅ **Reset Button** - Set counter back to zero
✅ **Real-time Display** - Counter value updates instantly
✅ **Console Logging** - See when components re-render

## Project Structure

```
counter-project/
├── src/
│   ├── App.jsx         # Counter component with state
│   ├── main.jsx        # Entry point
│   ├── index.css       # Tailwind import
│   └── App.css         # Component styles
├── index.html          # HTML template
├── package.json        # Dependencies
├── vite.config.js      # Vite configuration
└── eslint.config.js    # ESLint rules
```

## React Concepts Learned

### useState Hook

```javascript
const [count, setCount] = useState(0)
```

**What it does:**
- Creates a state variable `count` with initial value `0`
- `setCount()` is the function to update the state
- When state changes, React re-renders the component automatically

**Why it matters:**
- State allows components to "remember" data between renders
- Each button click triggers a state update and re-render
- React efficiently updates only the parts of the DOM that changed

### Event Handling

```javascript
<button onClick={() => setCount(prev => prev + 3)}>
  Increment +3
</button>
```

**How it works:**
1. User clicks button
2. `onClick` handler fires
3. Arrow function calls `setCount()`
4. State updates
5. Component re-renders with new value

### Functional Updates

```javascript
setCount(prev => prev + 3)  // Recommended
// vs
setCount(count + 3)         // Avoid - stale closure issues
```

**Why functional updates are better:**
- Ensures you always get the latest state value
- Prevents bugs from stale closures
- Recommended pattern in React documentation

## How It Works

```
User clicks "Increment +3" button
         ↓
  onClick handler fires
         ↓
  setCount(prev => prev + 3)
         ↓
  React updates state (count = 3)
         ↓
  Component function runs again
         ↓
  JSX evaluated with new count value
         ↓
  Browser DOM updates to show "3"
         ↓
  User sees updated counter
```

## Code Example

```javascript
import { useState } from "react"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Value: {count}</h1>

      <button onClick={() => setCount(prev => prev + 3)}>
        Increment +3
      </button>

      <button onClick={() => setCount(prev => Math.max(0, prev - 1))}>
        Decrement (min: 0)
      </button>

      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </>
  )
}

export default App
```

**Key Points:**
- `useState(0)` - Initial count is zero
- `prev => prev + 3` - Functional update adds 3
- `Math.max(0, prev - 1)` - Prevents negative counter
- JSX uses `{count}` to display current value

## JavaScript Concepts Used

### Arrow Functions
```javascript
() => setCount(prev => prev + 1)  // Arrow function syntax
prev => prev + 1                   // Single expression
```

### Ternary Operator (in edge case handling)
```javascript
Math.max(0, count - 1)  // Returns max of 0 or (count - 1)
```

### Callback Functions
```javascript
onClick={() => setCount(...)}  // Callback passed to click handler
```

## Edge Cases Handled

✅ **Negative Counter**: `Math.max(0, prev - 1)` prevents going below zero
✅ **Reset**: Button sets counter directly to 0
✅ **Multiple Updates**: Each button has its own increment amount

## Important Lessons

### Single Responsibility
This project shows that even a simple component can demonstrate React's core concepts without being cluttered with extra features.

### Immutability Matters
Although this simple project doesn't show mutation problems clearly, the pattern `prev => prev + 3` establishes the practice of functional state updates that becomes critical in larger projects.

### Console Logging for Understanding
The original code includes `console.log("App rendered")` comments to help visualize when React re-renders. This is a useful debugging technique.

### State Lives in Component
The counter state lives in the App component because that's the only component that needs it. No need for complex state management here.

## What I Learned

✅ How `useState` works and triggers re-renders
✅ Event handlers connect user actions to state updates
✅ Functional updates (`prev => ...`) are the safe pattern
✅ React efficiently batches and applies updates
✅ Component functions run every time state changes
✅ Props and state are different (this example only has state)

## What I Can Build Now

After this project, you can:
- Create components with local state
- Handle button clicks and user interactions
- Understand React's render cycle
- Build simple interactive UIs
- Debug using console logs

## Next Steps (Learning Progression)

1. **Props** - Pass data between components
2. **Conditional Rendering** - Show/hide UI based on state
3. **Lists and Loops** - Render multiple items with `map()`
4. **Forms** - Controlled inputs and form submission
5. **useEffect** - Side effects and cleanup

## Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## Mental Model

```
Initial Render:
App() → useState(0) → count = 0 → Render UI

User Clicks Button:
onClick fires → setCount(prev => prev + 3)
     ↓
React detects state changed
     ↓
App() runs again
     ↓
count = 3 (new value)
     ↓
Re-render UI with new value
     ↓
User sees updated counter
```

---

**Created**: August 16, 2026  
**Type**: React Learning Project - Foundational  
**Status**: Complete - Intentionally simple for learning
