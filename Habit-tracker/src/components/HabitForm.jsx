import { useState } from "react";

function HabitForm({ onAddHabit }) {
  const [title, setTitle] = useState("");
  const [targetMinutes, setTargetMinutes] = useState("");
  const [category, setCategory] = useState("Frontend");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !targetMinutes) {
      return;
    }

    onAddHabit({
      title: title.trim(),
      targetMinutes: Number(targetMinutes),
      category,
    });

    setTitle("");
    setTargetMinutes("");
    setCategory("Frontend");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-800 bg-slate-900 p-6"
    >
      <h2 className="mb-5 text-xl font-semibold">
        Add New Habit
      </h2>

      <div className="grid gap-4 md:grid-cols-3">

        {/* TITLE */}
        <input
          type="text"
          placeholder="Habit title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
        />

        {/* MINUTES */}
        <input
          type="number"
          min="1"
          placeholder="Target minutes"
          value={targetMinutes}
          onChange={(e) => setTargetMinutes(e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
        />

        {/* CATEGORY */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
        >
          <option>Frontend</option>
          <option>Backend</option>
          <option>Programming</option>
          <option>Learning</option>
          <option>DSA</option>
          <option>DevOps</option>
        </select>
      </div>

      <button
        type="submit"
        className="mt-4 rounded-lg bg-blue-600 px-5 py-3 font-medium hover:bg-blue-500"
      >
        Add Habit
      </button>
    </form>
  );
}

export default HabitForm;