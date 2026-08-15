function DashboardStats({ habits }) {
  const totalHabits = habits.length;

  const completedHabits = habits.filter(
    (habit) => habit.completed
  ).length;

  const totalMinutes = habits.reduce(
    (total, habit) => total + Number(habit.targetMinutes),
    0
  );

  const completedMinutes = habits
    .filter((habit) => habit.completed)
    .reduce(
      (total, habit) => total + Number(habit.targetMinutes),
      0
    );

  const completionPercentage =
    totalHabits === 0
      ? 0
      : Math.round((completedHabits / totalHabits) * 100);

  const stats = [
    {
      title: "Total Habits",
      value: totalHabits,
    },
    {
      title: "Completed",
      value: completedHabits,
    },
    {
      title: "Target Minutes",
      value: totalMinutes,
    },
    {
      title: "Completion",
      value: `${completionPercentage}%`,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-xl border border-slate-800 bg-slate-900 p-5"
        >
          <p className="text-sm text-slate-400">
            {stat.title}
          </p>

          <p className="mt-2 text-3xl font-bold">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default DashboardStats;