# Personal Subscription Tracker

A practical React application for managing and tracking monthly subscription costs. Track spending across different services, calculate total monthly expenditure, and maintain organized subscription records.

## Project Overview

A frontend-only React application built to practice:
- CRUD operations (Create, Read, Update, Delete)
- Form handling with validation
- State management with multiple pieces of data
- Displaying and filtering dynamic lists
- Calculating aggregate data (total monthly spend)
- Edit workflows with temporary state

**Why build it?** 
In the digital age, many people subscribe to multiple services (Netflix, Spotify, Cloud storage, etc.). This tracker provides a simple way to see exactly how much you spend monthly across all subscriptions.

**Important:** Frontend-only application. All data is stored in React state and lost on page refresh (consider adding localStorage as next step).

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.8 | UI library for component-based architecture |
| **JavaScript (ES6+)** | - | Application logic |
| **Tailwind CSS** | 4.3.3 | Responsive utility-first styling |
| **Vite** | 8.2.0 | Fast build tool and dev server |

## Features

✅ **Add Subscriptions**
- Form with name, amount, and category fields
- Input validation prevents invalid data
- Form resets after successful submission

✅ **View Dashboard Summary**
- Total monthly spend calculation
- Count of total subscriptions
- Updates dynamically as subscriptions change

✅ **Display Subscription List**
- Each subscription shown in a card
- Displays name, amount, and category
- Empty state when no subscriptions exist

✅ **Edit Subscriptions**
- Click to enter edit mode on any subscription
- Modify name and amount
- Save or cancel changes
- Validation on save prevents invalid edits

✅ **Delete Subscriptions**
- Remove subscriptions with delete button
- Automatic cost recalculation
- Immediate UI update

✅ **Calculate Total Monthly Spend**
- Uses `reduce()` to sum all amounts
- Updates instantly when subscriptions change
- Formatted to two decimal places ($X.XX)

✅ **Responsive Design**
- Mobile-first approach with Tailwind
- Readable on all screen sizes

## Project Structure

```
subscription-tracker/
├── src/
│   ├── components/
│   │   ├── HeaderSummary.jsx       # Total spend display
│   │   ├── SubscriptionForm.jsx    # Add new subscriptions
│   │   ├── SubscriptionList.jsx    # Container for subscriptions
│   │   └── SubscriptionCard.jsx    # Individual subscription card
│   ├── App.jsx                     # Main state management
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Tailwind import
├── index.html                       # HTML template
├── package.json                     # Dependencies
└── vite.config.js                   # Build configuration
```

### Component Responsibilities

**App.jsx** (Container)
- Owns `subscriptions` state (single source of truth)
- Implements CRUD handlers: `handleAddSubscription`, `handleDeleteSubscription`, `handleEditSubscription`
- Passes data and callbacks to child components

**HeaderSummary.jsx** (Presentational)
- Receives subscriptions array
- Calculates total monthly spend using `reduce()`
- Displays formatted currency and subscription count
- No state, pure presentation

**SubscriptionForm.jsx** (Form Handler)
- Manages local form state (name, amount, category)
- Validates all inputs before submission
- Calls `onAddSubscription` callback
- Resets form after successful submission

**SubscriptionList.jsx** (Container)
- Renders empty state or list of subscriptions
- Maps subscriptions to SubscriptionCard components
- Passes callbacks to each card

**SubscriptionCard.jsx** (Individual Item)
- Manages local edit mode state
- Displays subscription details in view mode
- Shows edit form in edit mode
- Validates before saving edits
- Calls callbacks to parent for actual updates

## Data Model

```javascript
{
  id: 1692129600000,           // Unique ID (Date.now())
  name: "Netflix",             // Service name
  amount: 15.99,               // Monthly cost
  category: "Entertainment"    // Category for organization
}
```

**Why Each Property:**
- **id**: Required for React keys and CRUD operations
- **name**: User-friendly identifier
- **amount**: Used for total spend calculation
- **category**: Helps organize and filter subscriptions

## React Concepts Learned

### useState Multiple State Variables

```javascript
const [subscriptions, setSubscriptions] = useState([])
```

**Application State**: Subscriptions array lives in App component because multiple children need it.

**Local UI State** in SubscriptionCard:
```javascript
const [isEditing, setIsEditing] = useState(false)
const [editName, setEditName] = useState(subscription.name)
const [editAmount, setEditAmount] = useState(subscription.amount)
```

These live locally because only one card manages its own edit mode.

### Props and Callbacks

```javascript
// App passes data and functions DOWN
<SubscriptionCard 
  subscription={subscription}              // Data down
  onEditSubscription={handleEditSubscription}  // Callback down
/>

// Child calls callback UP
<button onClick={() => onEditSubscription(id, updates)}>
```

### CRUD Operations

**CREATE**: Spread operator adds to array
```javascript
handleAddSubscription = (newSubscription) => {
  setSubscriptions(current => [...current, newSubscription])
}
```

**READ**: Filter and display
```javascript
{subscriptions.length === 0 
  ? <EmptyState /> 
  : subscriptions.map(sub => <Card key={sub.id} />)
}
```

**UPDATE**: Map and spread to update one item
```javascript
handleEditSubscription = (id, updatedData) => {
  setSubscriptions(current =>
    current.map(sub =>
      sub.id === id ? {...sub, ...updatedData} : sub
    )
  )
}
```

**DELETE**: Filter to exclude one item
```javascript
handleDeleteSubscription = (id) => {
  setSubscriptions(current =>
    current.filter(sub => sub.id !== id)
  )
}
```

### Derived Data - Total Monthly Spend

Source state: `subscriptions` array

Derived data calculated on render:
```javascript
const totalMonthlySpend = subscriptions.reduce(
  (total, subscription) => total + subscription.amount,
  0
)
```

**Why derived, not stored:**
- Always accurate
- Updates automatically when subscriptions change
- Single source of truth

### Form Handling with Validation

```javascript
const handleSubmit = (e) => {
  e.preventDefault()
  
  // Validation
  if (!name.trim()) {
    setError("Please enter a subscription name.")
    return
  }
  
  if (!amount || Number(amount) <= 0) {
    setError("Please enter a valid amount.")
    return
  }
  
  // Only submit if valid
  onAddSubscription({ id: Date.now(), name: name.trim(), amount: Number(amount), category })
  
  // Reset form
  setName("")
  setAmount("")
  setCategory("")
  setError("")
}
```

**Key techniques:**
- `e.preventDefault()` stops page refresh
- Validation returns early if invalid
- Form resets after successful submission
- Error messages display to user

### Controlled Inputs

```javascript
<input
  value={name}
  onChange={(e) => setName(e.target.value)}
  placeholder="Netflix"
/>
```

Value comes from state, changes update state, React re-renders. Component is "controlled" by React.

### Conditional Rendering

View mode vs. edit mode:
```javascript
{isEditing ? (
  <div>
    <input value={editName} onChange={...} />
    <input value={editAmount} onChange={...} />
    <button onClick={handleSave}>Save</button>
  </div>
) : (
  <div>
    <h3>{subscription.name}</h3>
    <p>${subscription.amount}</p>
    <button onClick={() => setIsEditing(true)}>Edit</button>
  </div>
)}
```

Empty state vs. filled state:
```javascript
{subscriptions.length === 0 ? (
  <div>No subscriptions yet</div>
) : (
  <div>List of subscriptions...</div>
)}
```

### List Rendering with Keys

```javascript
{subscriptions.map((subscription) => (
  <SubscriptionCard
    key={subscription.id}          // Stable, unique key
    subscription={subscription}
    onEdit={handleEditSubscription}
  />
))}
```

Why keys matter: React matches old and new elements by key. If you delete subscription 1, React knows subscription 2 should stay in the same card.

## JavaScript Concepts Learned

### reduce() - Aggregating Values

Calculate total monthly spend:
```javascript
const total = subscriptions.reduce(
  (accumulator, current) => accumulator + current.amount,
  0  // Starting value
)

// Step by step:
// Start: 0
// Netflix: 0 + 15.99 = 15.99
// Spotify: 15.99 + 9.99 = 25.98
// Result: 25.98
```

### filter() - Removing Items

Delete a subscription:
```javascript
subscriptions.filter(sub => sub.id !== idToDelete)
// Returns new array without the deleted item
```

### map() - Updating Items

Edit a subscription:
```javascript
subscriptions.map(sub =>
  sub.id === targetId
    ? {...sub, name: "New Name"}  // Update this one
    : sub                          // Keep others
)
```

### Spread Operator

Adding to array:
```javascript
[...subscriptions, newSubscription]
```

Updating object:
```javascript
{...subscription, amount: 19.99}  // New amount, keep everything else
```

### Destructuring

```javascript
const { name, amount, category } = subscription
```

### Template Literals and Number Formatting

```javascript
`${subscriptions.length} subscription${subscriptions.length !== 1 ? "s" : ""}`
totalMonthlySpend.toFixed(2)  // Format to 2 decimal places
```

## CRUD Workflow Examples

### Creating a Subscription

```
User fills form: Netflix, 15.99, Entertainment
        ↓
User clicks "Add Subscription"
        ↓
handleSubmit() validates input
        ↓
onAddSubscription({name, amount, category}) called
        ↓
App.jsx handleAddSubscription()
        ↓
setSubscriptions([...current, newSub])
        ↓
React re-renders
        ↓
HeaderSummary recalculates total
        ↓
SubscriptionList renders new card
        ↓
Form resets
        ↓
User sees new subscription and updated total
```

### Editing a Subscription

```
User clicks Edit on Netflix card
        ↓
SubscriptionCard: setIsEditing(true)
        ↓
Edit form appears with current values
        ↓
User changes amount to 19.99
        ↓
User clicks Save
        ↓
handleSave() validates: amount > 0 ✓
        ↓
onEditSubscription(id, {amount: 19.99}) called
        ↓
App.jsx: map() finds and updates Netflix
        ↓
setSubscriptions() with updated array
        ↓
React re-renders
        ↓
Card receives updated subscription prop
        ↓
setIsEditing(false)
        ↓
Display mode shows $19.99
        ↓
HeaderSummary recalculates total
```

### Deleting a Subscription

```
User clicks Delete on Netflix
        ↓
handleDeleteSubscription(id) called
        ↓
onDeleteSubscription(id) called up to App
        ↓
App.jsx: filter() removes Netflix
        ↓
setSubscriptions() with filtered array
        ↓
React re-renders
        ↓
Netflix card unmounts
        ↓
SubscriptionList count decreases
        ↓
HeaderSummary recalculates total
        ↓
User sees updated list and total
```

## Edge Cases Handled

✅ **Empty List** - Shows message: "No subscriptions yet"
✅ **Zero or Negative Amount** - Form validation prevents submission
✅ **Empty Name** - Form validation checks `name.trim()`
✅ **Decimal Amounts** - Formatted to 2 decimal places ($X.XX)
✅ **Edit Validation** - Can't save with invalid data
✅ **Cancel Edit** - Reverts to original values

## Tailwind CSS Patterns Used

**Responsive Grid:**
```javascript
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
// Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns
```

**Cards:**
```javascript
className="rounded-xl bg-white p-5 shadow-sm"
// Rounded corners, white background, padding, subtle shadow
```

**Conditional Styling:**
```javascript
className={`... ${isEditing ? "ring-2 ring-blue-500" : ""}`}
// Add ring when editing
```

## What I Learned

✅ CRUD operations in React
✅ Managing form state and validation
✅ Edit workflows with local state
✅ Calculating derived data with reduce()
✅ Immutable state updates with map() and filter()
✅ Component composition and separation
✅ Tailwind for responsive design
✅ Empty states and user guidance

## What I Can Build Now

- Forms with validation and submission
- Add/edit/delete functionality
- Data aggregation and reporting
- Responsive layouts
- Multi-component applications

## Next Learning Steps

1. **localStorage** - Save subscriptions between sessions
2. **useEffect** - Load saved data on component mount
3. **Categories filter** - Show only subscriptions in selected category
4. **Sorting** - Sort by amount, name, or date added
5. **Notifications** - Show success/error messages

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Test production build
npm run lint     # Check code quality
```

## Mental Model

```
User Action (Add/Edit/Delete)
      ↓
Event fires in component
      ↓
Callback called to parent
      ↓
App.jsx updates subscriptions state
      ↓
Component re-renders
      ↓
All children receive new props
      ↓
HeaderSummary recalculates (reduce)
      ↓
SubscriptionList re-renders cards
      ↓
Browser DOM updates
      ↓
User sees new totals and list
```

---

**Created**: August 16, 2026  
**Type**: React Learning Project - CRUD + State Management  
**Status**: Complete Frontend Application
