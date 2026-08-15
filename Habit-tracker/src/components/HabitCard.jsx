import { useState } from "react";

function HabitCard({
  habit,
  onToggle,
  onUpdate,
  onDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const [editTitle, setEditTitle] = useState(habit.title);
  const [editMinutes, setEditMinutes] = useState(
    habit.targetMinutes
  );

  function handleSave() {
    if (!editTitle.trim() || !editMinutes) {
      return;
    }

    onUpdate(habit.id, {
      title: editTitle.trim(),
      targetMinutes: Number(editMinutes),
    });

    setIsEditing(false);
  }

  function handleCancel() {
    setEditTitle(habit.title);
    setEditMinutes(habit.targetMinutes);
    setIsEditing(false);
  }

  return (
    <article
      className={`rounded-xl border p-5 transition ${
        habit.completed
          ? "border-green-700 bg-green-950/30"
          : "border-slate-800 bg-slate-900"
      }`}
    >
      {/* TOP */}
      <div className="flex items-start justify-between gap-4">

        <div className="flex-1">

          {isEditing ? (
            <div className="space-y-3">

              <input
                type="text"
                value={editTitle}
                onChange={(e) =>
                  setEditTitle(e.target.value)
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 outline-none"
              />

              <input
                type="number"
                min="1"
                value={editMinutes}
                onChange={(e) =>
                  setEditMinutes(e.target.value)
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 outline-none"
              />

            </div>
          ) : (
            <>
              <h3 className="text-xl font-semibold">
                {habit.title}
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                {habit.category}
              </p>
            </>
          )}

        </div>

        {/* COMPLETION */}
        <button
          onClick={() => onToggle(habit.id)}
          className={`rounded-full px-3 py-1 text-sm ${
            habit.completed
              ? "bg-green-600"
              : "bg-slate-700"
          }`}
        >
          {habit.completed ? "Done" : "Pending"}
        </button>

      </div>

      {/* DETAILS */}
      <div className="mt-6 flex justify-between text-sm text-slate-400">
        <span>
          {habit.targetMinutes} minutes
        </span>

        <span>
          Streak: {habit.streak}
        </span>
      </div>

      {/* ACTIONS */}
      <div className="mt-5 flex gap-2">

        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium hover:bg-green-500"
            >
              Save
            </button>

            <button
              onClick={handleCancel}
              className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium hover:bg-slate-600"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-500"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => onDelete(habit.id)}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium hover:bg-red-500"
        >
          Delete
        </button>

      </div>
    </article>
  );
}

export default HabitCard;