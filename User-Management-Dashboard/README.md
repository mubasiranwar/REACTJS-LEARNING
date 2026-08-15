# User Management Dashboard

A multi-page React application for managing users with features like add, search, and delete. Demonstrates routing, persistent storage, and component organization across multiple pages.

## Project Overview

A practical React application built to practice:
- React Router for multi-page navigation
- localStorage for persistent data storage
- State management across pages
- Search/filter functionality
- Form handling for user creation
- Component composition with multiple pages
- Data persistence between sessions

**Why build it?**
Most real applications need multiple pages and persistent data. This project shows how to manage user data across different pages, maintain state, and provide a cohesive user experience.

**Important:** Data persists in browser localStorage, so subscriptions survive page refresh (unlike purely state-based projects).

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.8 | UI library and component framework |
| **React Router** | Latest | Client-side routing and navigation |
| **JavaScript (ES6+)** | - | Application logic |
| **Tailwind CSS** | 4.3.3 | Responsive styling |
| **localStorage API** | Native | Persistent data storage |
| **Vite** | 8.2.0 | Build tool and dev server |

## Features

✅ **Multi-Page Navigation**
- Home/Dashboard page
- Users management page
- Add user page
- Navigation bar for switching pages

✅ **User Management**
- Add new users with name, email, role, and experience
- Display all users in a list
- Delete users from the system
- Edit existing users (infrastructure ready)

✅ **Search Functionality**
- Search users by name, email, or role
- Real-time filtering as you type
- Search term displayed

✅ **Persistent Storage**
- Users saved to localStorage
- Data persists between page refreshes
- Automatic save on add/delete operations
- Loads saved users on app startup

✅ **Responsive Design**
- Mobile-first Tailwind styling
- Dashboard cards for feature overview
- Proper spacing and typography

✅ **User-Friendly Features**
- Empty state handling
- User count display
- Dashboard for navigation
- Form validation

## Project Structure

```
User-Management-Dashboard/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation between pages
│   │   ├── UserForm.jsx        # Form to add new users
│   │   ├── UserList.jsx        # List of users
│   │   ├── UserCard.jsx        # Individual user display
│   │   └── SearchBar.jsx       # Search input
│   ├── pages/
│   │   ├── Home.jsx            # Dashboard/home page
│   │   ├── Users.jsx           # Users management page
│   │   └── AddUser.jsx         # Add new user page
│   ├── App.jsx                 # Routes configuration
│   ├── App.css                 # Page styles
│   ├── main.jsx                # Entry point
│   └── index.css               # Tailwind import
├── index.html                   # HTML template
├── package.json                 # Dependencies
└── vite.config.js               # Build configuration
```

### Component Hierarchy

```
App
├── Navbar (all pages)
│   └── Links to different pages
│
└── Routes
    ├── Home page
    │   └── Dashboard with cards
    │
    ├── Users page
    │   ├── SearchBar
    │   └── UserList
    │       └── UserCard (multiple)
    │
    └── AddUser page
        └── UserForm
```

## React Router Concepts Learned

### Route Configuration

```javascript
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<Users />} />
      <Route path="/add-user" element={<AddUser />} />
    </Routes>
  )
}
```

**How it works:**
- `<Routes>` container for all routes
- `<Route>` defines path → component mapping
- Only matching route's component renders
- Other routes don't render (unlike showing/hiding with state)

### Navigation

**Using Link component:**
```javascript
import { Link } from "react-router-dom"

<Link to="/users">View Users</Link>
// Navigates to /users without page refresh
```

**Using useNavigate hook:**
```javascript
import { useNavigate } from "react-router-dom"

function AddUser() {
  const navigate = useNavigate()
  
  function handleAddUser(user) {
    // Save user...
    navigate("/users")  // Go to users page after adding
  }
}
```

## State Management Across Pages

### localStorage API

**Saving data:**
```javascript
const users = [...allUsers, newUser]
localStorage.setItem("users", JSON.stringify(users))
// Converts array to JSON string and saves
```

**Loading data:**
```javascript
useEffect(() => {
  const savedUsers = localStorage.getItem("users")
  if (savedUsers) {
    setUsers(JSON.parse(savedUsers))  // Parse JSON back to array
  }
}, [])
```

**Pattern used in Users.jsx:**
```javascript
const [users, setUsers] = useState(() => {
  const savedUsers = localStorage.getItem("users")
  return savedUsers ? JSON.parse(savedUsers) : initialUsers
})

// Loads saved users OR initial sample users
```

**Auto-save on changes:**
```javascript
useEffect(() => {
  localStorage.setItem("users", JSON.stringify(users))
}, [users])

// Every time users state changes, save to localStorage
```

### Page-Specific State

**Home.jsx**: Mostly presentational, no state
**Users.jsx**: 
- `users` state from localStorage
- `search` state for filtering

**AddUser.jsx**:
- Uses `navigate` to redirect after adding
- Reads and writes localStorage directly

## Data Model

```javascript
{
  id: 1,                              // Unique identifier
  name: "Ali Khan",                   // Full name
  email: "ali@example.com",           // Email address
  role: "Frontend Developer",         // Job title
  experience: 2                       // Years of experience
}
```

## React Concepts Learned

### useState with Initial Function

```javascript
const [users, setUsers] = useState(() => {
  const saved = localStorage.getItem("users")
  return saved ? JSON.parse(saved) : []
})
```

**Why use a function?**
- Runs once on component mount (not every render)
- Expensive initialization only happens once
- Good for reading localStorage on startup

### useEffect Dependencies

**Auto-save on state change:**
```javascript
useEffect(() => {
  localStorage.setItem("users", JSON.stringify(users))
}, [users])  // Runs whenever users changes
```

**Load on mount:**
```javascript
useEffect(() => {
  // Load data
}, [])  // Empty dependency array: runs once on mount
```

**Run on every render:**
```javascript
useEffect(() => {
  // Side effect runs after every render
})  // No dependency array
```

### Props Drilling

Data flows through multiple components:
```javascript
App
  ↓
Users page receives users state
  ↓
Passes to UserList
  ↓
Passes to UserCard
  ↓
UserCard displays data
```

**Edge case:** SearchBar in Users.jsx needs to update search state
```javascript
<SearchBar 
  search={search}
  onSearch={setSearch}  // Callback to parent
/>
```

### Conditional Rendering

Empty state:
```javascript
{users.length === 0 ? (
  <p>No users found</p>
) : (
  <div>List of users...</div>
)}
```

## JavaScript Concepts Used

### filter() for Search

```javascript
const searchTerm = search.toLowerCase()

const filteredUsers = users.filter(user => {
  return (
    user.name.toLowerCase().includes(searchTerm) ||
    user.email.toLowerCase().includes(searchTerm) ||
    user.role.toLowerCase().includes(searchTerm)
  )
})
```

**How it works:**
1. Convert search to lowercase
2. Keep only users where name/email/role includes search term
3. Case-insensitive comparison

### map() for Rendering Lists

```javascript
{users.map(user => (
  <UserCard
    key={user.id}
    user={user}
    onDelete={handleDelete}
  />
))}
```

### JSON Serialization

```javascript
// Save to localStorage
localStorage.setItem("key", JSON.stringify(data))

// Load from localStorage
const data = JSON.parse(localStorage.getItem("key"))
```

## Page Workflows

### Home Page
```
User lands on app
         ↓
Home component renders
         ↓
Shows dashboard with overview cards
         ↓
User clicks "Manage Users" button
         ↓
navigate("/users")
         ↓
Users page loads
```

### Users Page
```
Users page loads
         ↓
useEffect reads localStorage
         ↓
setUsers(savedUsers)
         ↓
Component renders with loaded users
         ↓
SearchBar updates search state
         ↓
filteredUsers calculated
         ↓
Filter re-runs on search change
         ↓
UserList renders filtered results
         ↓
User clicks delete
         ↓
handleDelete(id)
         ↓
setUsers(filtered array)
         ↓
useEffect: localStorage updated
         ↓
Component re-renders
         ↓
Deleted user gone from list
```

### AddUser Page
```
User navigates to /add-user
         ↓
AddUser page loads
         ↓
UserForm displays
         ↓
User fills form and submits
         ↓
handleAddUser(newUser)
         ↓
Read current users from localStorage
         ↓
Add new user to array
         ↓
Save updated array to localStorage
         ↓
navigate("/users")
         ↓
Users page loads
         ↓
useEffect reads localStorage
         ↓
New user appears in list
```

## Edge Cases Handled

✅ **No saved users** - Initial sample users provided
✅ **Empty search results** - Shows "No users found"
✅ **No users at all** - Empty state message displayed
✅ **Search case-insensitive** - "john" finds "John Khan"
✅ **localStorage not available** - Falls back to initial data
✅ **Invalid JSON in localStorage** - Error handling with fallback

## Persistence Benefits

**Without localStorage** (like previous projects):
- Refresh page → all data lost

**With localStorage** (this project):
- Refresh page → data persists
- Close and reopen browser → data still there
- Add user, then go to home page, then back → user still there

**Limitation:** Only persists in the same browser. Moving to different device or browser clears data.

## What I Learned

✅ React Router for multi-page navigation
✅ Client-side routing without page refreshes
✅ localStorage API for persistent storage
✅ Passing state through multiple components
✅ Search/filter functionality with array methods
✅ useEffect for side effects (load/save data)
✅ useState initialization patterns
✅ Component organization across pages
✅ User navigation and redirect flows

## What I Can Build Now

- Multi-page applications with React Router
- Applications with persistent data
- Search and filter features
- Form submission with redirects
- Dashboard-style applications
- Real applications (not just prototypes)

## Next Learning Steps

1. **User Details Page** - Click user to see full profile
2. **Edit User** - Update existing user information
3. **Validation Improvements** - Better error messages
4. **Sorting** - Sort users by name, role, etc.
5. **Backend Integration** - Save to actual database instead of localStorage
6. **API Calls** - Use fetch() to communicate with server
7. **useContext** - Avoid prop drilling for global state

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Check code quality
```

## Comparison with Previous Projects

| Feature | Counter | Subscription | User Dashboard |
|---------|---------|--------------|-----------------|
| State Management | Simple | Multiple variables | Multiple pages |
| Routing | None | Single page | Multi-page Router |
| Persistence | Lost on refresh | Lost on refresh | localStorage |
| Complexity | Beginner | Intermediate | Advanced |
| Real-world similarity | Toy example | Practical app | Production pattern |

## Mental Model

```
User navigates to /users
         ↓
Routes component matches path
         ↓
Users page component renders
         ↓
useEffect: Read localStorage
         ↓
setUsers() with saved data
         ↓
Component re-renders with users
         ↓
User searches or deletes
         ↓
State updates
         ↓
useEffect: Save to localStorage
         ↓
Component re-renders
         ↓
Browser DOM updates
         ↓
User sees changes
         ↓
localStorage persisted data
         ↓
On page refresh: useEffect reads from storage
         ↓
Data is restored!
```

## Production-Ready Improvements

To turn this into a real application:

**1. Backend API**
```javascript
// Instead of localStorage
const response = await fetch('/api/users', {
  method: 'POST',
  body: JSON.stringify(newUser)
})
const savedUser = await response.json()
setUsers([...users, savedUser])
```

**2. Error Handling**
```javascript
try {
  const response = await fetch('/api/users')
  if (!response.ok) throw new Error('Failed to load users')
  const users = await response.json()
  setUsers(users)
} catch (error) {
  setError(error.message)
}
```

**3. Loading States**
```javascript
const [loading, setLoading] = useState(false)

async function loadUsers() {
  setLoading(true)
  try {
    // fetch users...
  } finally {
    setLoading(false)
  }
}

if (loading) return <p>Loading...</p>
```

**4. Authentication**
```javascript
// Only show users if logged in
if (!user) return <LoginPage />
```

**5. Form Validation**
```javascript
function validateUser(user) {
  const errors = []
  if (!user.name?.trim()) errors.push("Name required")
  if (!user.email?.includes("@")) errors.push("Valid email required")
  // ...
  return { isValid: errors.length === 0, errors }
}
```

---

**Created**: August 16, 2026  
**Type**: React Learning Project - Routing + Persistence  
**Status**: Complete Multi-Page Application
