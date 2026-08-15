import { useState } from "react";
import DashboardStats from "./components/DashboardStats";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";

function App() {
  const [habits, setHabits] = useState([
    {
      id: 1,
      title: "React Practice",
      targetMinutes: 60,
      category: "Frontend",
      completed: true,
      streak: 5,
    },
    {
      id: 2,
      title: "DSA Practice",
      targetMinutes: 45,
      category: "Programming",
      completed: false,
      streak: 3,
    },
    {
      id: 3,
      title: "Read Documentation",
      targetMinutes: 30,
      category: "Learning",
      completed: false,
      streak: 2,
    },
  ]);

  // CREATE
  function addHabit(newHabit) {
    const habit = {
      id: Date.now(),
      ...newHabit,
      completed: false,
      streak: 0,
    };

    setHabits((prevHabits) => [...prevHabits, habit]);
  }

  // TOGGLE COMPLETION
  function toggleHabit(id) {
    setHabits((prevHabits) =>
      prevHabits.map((habit) => {
        if (habit.id !== id) {
          return habit;
        }

        const completed = !habit.completed;

        return {
          ...habit,
          completed,
          streak: completed
            ? habit.streak + 1
            : Math.max(0, habit.streak - 1),
        };
      })
    );
  }

  // UPDATE
  function updateHabit(id, updates) {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              ...updates,
            }
          : habit
      )
    );
  }

  // DELETE
  function deleteHabit(id) {
    setHabits((prevHabits) =>
      prevHabits.filter((habit) => habit.id !== id)
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">

        {/* HEADER */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold">
            Smart Dev Habit Tracker
          </h1>

          <p className="mt-2 text-slate-400">
            Build consistent engineering habits and track your progress.
          </p>
        </header>

        {/* DASHBOARD */}
        <DashboardStats habits={habits} />

        {/* CREATE FORM */}
        <section className="mt-8">
          <HabitForm onAddHabit={addHabit} />
        </section>

        {/* HABIT LIST */}
        <section className="mt-8">
          <HabitList
            habits={habits}
            onToggle={toggleHabit}
            onUpdate={updateHabit}
            onDelete={deleteHabit}
          />
        </section>

      </div>
    </div>
  );
}

export default App;