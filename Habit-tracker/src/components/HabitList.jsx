import HabitCard from "./HabitCard";

function HabitList({
  habits,
  onToggle,
  onUpdate,
  onDelete,
}) {
  if (habits.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-700 p-10 text-center text-slate-400">
        No habits yet. Add your first developer habit.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default HabitList;